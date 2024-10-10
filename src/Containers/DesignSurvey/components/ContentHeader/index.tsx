import { AddIcon, CloseIcon, MenuIcon, TickIcon } from "@/assets";
import { DragDropWrapper } from "@/components";
import useSurveyStore from "@/context/surveyStores";
import { questionField } from "@/interfaces/questionFields";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { shallow } from "zustand/shallow";
import { Content, ContentHeaderContainer, ContentItem, Header } from "./styles";

type ContentHeaderProps = {
  data?: any;
  title: string;
  handleClick: (currentBtn: string, group?: boolean) => void;
};

const ContentHeader = ({
  data = [],
  title,
  handleClick,
}: ContentHeaderProps) => {
  const allData = useSurveyStore(state => state.data, shallow);
  const setData = useSurveyStore(state => state.setData);

  const handleDragEnd = (result: any) => {
    if (!result.destination || result.destination.index === result.source.index)
      return;

    const { source, destination } = result;
    const sourceDroppableId = source.droppableId;
    const destinationDroppableId = destination.droppableId;

    const updateItems = (
      items: any[],
      sourceIndex: number,
      destinationIndex: number
    ) => {
      const [movedItem] = items.splice(sourceIndex, 1);
      items.splice(destinationIndex, 0, movedItem);
      return items;
    };

    const updateFields = (items: any[]) => {
      return items.reduce((acc: any, item: any, index: number) => {
        acc[`field-${item.id}`] = item.parentId
          ? item
          : { ...item, questionNumber: index + 1 };
        return acc;
      }, {});
    };

    const reduceFields = (items: any[], allItems: any[], parentId: string) => {
      let count = 1;
      const questionNumberMap = new Map<string, string>();

      allItems.forEach(item => {
        if (item.id) {
          questionNumberMap.set(`field-${item.id}`, item.questionNumber || "");
        }
      });

      const updatedFields = items.reduce(
        (acc: Record<string, any>, item: any) => {
          if (!item.parentId || item.parentId !== parentId) {
            acc[`field-${item.id}`] = item;
          } else {
            const questionNumber = questionNumberMap.get(item.parentId) || "";
            acc[`field-${item.id}`] = {
              ...item,
              questionNumber: `${questionNumber}.${count}`,
            };
            count++;
          }
          return acc;
        },
        {}
      );

      return updatedFields;
    };

    if (
      sourceDroppableId === "content-items" &&
      destinationDroppableId === "content-items"
    ) {
      const items = Object.values(allData.fields);
      const updatedItems = updateItems(items, source.index, destination.index);
      const updatedFields = updateFields(updatedItems);
      setData({ ...allData, fields: updatedFields });
    } else if (
      sourceDroppableId.includes("content-child-items") &&
      destinationDroppableId.includes("content-child-items")
    ) {
      const parentId = `field-${sourceDroppableId.split("-")[3]}`;
      const allItems: any = Object.values(allData.fields);
      const parentItems = allItems.filter(
        (item: any) => item.parentId === parentId
      );
      const otherItems = allItems.filter(
        (item: any) => item.parentId !== parentId
      );

      const updatedParentItems = updateItems(
        parentItems,
        source.index,
        destination.index
      );

      const updatedFields = reduceFields(
        [...otherItems, ...updatedParentItems],
        allItems,
        parentId
      );

      setData({ ...allData, fields: updatedFields });
    } else {
      console.log(result);
    }
  };

  return (
    <ContentHeaderContainer>
      <Header>
        <h3>{title}</h3>
        <button onClick={() => handleClick(title)}>
          <AddIcon />
        </button>
      </Header>
      <DragDropWrapper onDragEnd={handleDragEnd}>
        <DragDropWrapper.Droppable droppableId={"content-items"}>
          <Content className="c-scrollbar">
            {data.map((item: any, index: number) => (
              <DragDropWrapper.Draggable
                key={item.id}
                draggableId={`field-${item.id}`}
                index={index}
              >
                <QuestionWrapper
                  number={index + 1}
                  field={item}
                  id={item.id}
                  {...{ handleClick, title }}
                />
              </DragDropWrapper.Draggable>
            ))}
          </Content>
        </DragDropWrapper.Droppable>
      </DragDropWrapper>
    </ContentHeaderContainer>
  );
};

const QuestionWrapper = ({ number, field, id, handleClick, title }: any) => {
  const [open, setOpen] = useState(false);
  const data = useSurveyStore(state => state.data, shallow);
  const setData = useSurveyStore(state => state.setData);
  const deleteField = useSurveyStore(state => state.deleteField);
  const currentField = useSurveyStore(state => state.currentField);
  const setCurrentField = useSurveyStore(state => state.setCurrentField);
  const selectedField: questionField = data.fields[currentField as string];

  const hasDuplicate = useMemo(() => {
    return Object.values(data.fields)
      .filter((item: any) => item.id !== field.id)
      .map((item: any) => item.dataAttribute)
      .includes(field.dataAttribute);
  }, [data.fields]);

  useEffect(() => {
    const handleClick = () => {
      setOpen(false);
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleDuplicate = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const randomId = Math.floor(Math.random() * 1000000000);
      setData({
        ...data,
        fields: {
          ...data.fields,
          [`field-${randomId}`]: { ...field, id: randomId },
        },
      });
      setOpen(false);
    },
    [data, field, setData]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      deleteField(`field-${field.id}`);
    },
    [deleteField, field.id]
  );

  return (
    <ContentItem
      onContextMenu={e => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
      }}
      isActive={currentField === `field-${id}`}
      hasError={hasDuplicate}
    >
      <div
        className="content-wrapper"
        onClick={() => setCurrentField(`field-${id}`)}
      >
        <div className="content-wrapper-item">
          <div className="content">
            <div className="number">
              <TickIcon size="12" /> {field.questionNumber}
            </div>
            <div className="question">
              <p>
                {field.label?.length && field.label.length > 20
                  ? `${field.label.slice(0, 20)}...`
                  : field.label || "Question"}
              </p>
            </div>
          </div>
          <div className="content-menu">
            {field.group && field.questionType !== "cascadingselect" && (
              <button
                onClick={e => {
                  e.stopPropagation();
                  handleClick(title, true, `field-${id}`);
                }}
                className="options"
              >
                <AddIcon />
              </button>
            )}
            <button
              onClick={e => {
                e.stopPropagation();
                setOpen(v => !v);
              }}
              className="options"
            >
              <MenuIcon vertical />
            </button>
          </div>
          {open && (
            <div className="option-menu">
              <button onClick={handleDuplicate}>duplicate</button>
              <button onClick={handleDelete}>delete</button>
            </div>
          )}
        </div>
      </div>
      <SubQuestionWrapper {...{ field, id, handleClick, title }} />
    </ContentItem>
  );
};

const SubQuestionWrapper = ({ field, id, handleClick, title }: any) => {
  const deleteField = useSurveyStore(state => state.deleteField);
  const setCurrentField = useSurveyStore(state => state.setCurrentField);

  if (!field.group) return null;

  return (
    <DragDropWrapper.Droppable
      droppableId={`content-child-items-${id}`}
      type="sub-group"
    >
      <div
        style={{
          paddingInlineStart: "10px",
        }}
      >
        {Object.values(field.groupfields!).map((item: any, index: number) => (
          <Fragment key={item.id}>
            <DragDropWrapper.Draggable
              key={item.id}
              draggableId={`field-${item.id}`}
              index={index}
            >
              <div
                onClick={() => {
                  setCurrentField(`field-${item.id}`);
                }}
                className="group-content"
              >
                <div className="content">
                  <div className="number">
                    <TickIcon size="12" /> {item.questionNumber || index + 1}
                  </div>
                  <div className="question">
                    <p>
                      {item.label?.length > 20
                        ? `${item.label?.slice(0, 20)}...`
                        : item.label || "Question"}
                    </p>
                  </div>
                </div>
                {item.group && item.questionType !== "cascadingselect" && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleClick(title, true, `field-${item.id}`);
                    }}
                    className="options"
                  >
                    <AddIcon />
                  </button>
                )}
                <button
                  onClick={e => {
                    e.stopPropagation();

                    deleteField(`field-${item.id}`);
                  }}
                  className="options"
                >
                  <CloseIcon size="20" />
                </button>
              </div>

              {item.group && (
                <SubQuestionWrapper
                  title={item.title}
                  field={item}
                  id={item.id}
                  handleClick={handleClick}
                />
              )}
            </DragDropWrapper.Draggable>
          </Fragment>
        ))}
      </div>
    </DragDropWrapper.Droppable>
  );
};

export default ContentHeader;
