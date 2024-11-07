import { AddIcon, CloseIcon, MenuIcon, TickIcon } from "@/assets";
import { DragDropWrapper } from "@/components";
import { useSurveyStore } from "@/context/surveyStores";
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
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }

    const { source, destination } = result;
    const sourceDroppableId = source.droppableId;
    const destinationDroppableId = destination.droppableId;

    // Create a copy of the current data
    const newData = { ...allData };
    const fields = Object.values(newData.fields);

    if (sourceDroppableId === "content-items" && destinationDroppableId === "content-items") {
      // Get all parent-level questions (including group questions)
      const parentQuestions = fields.filter((item: any) => !item.parentId);
      const reorderedItems = Array.from(parentQuestions);
      
      // Perform the reorder
      const [removed] = reorderedItems.splice(source.index, 1);
      reorderedItems.splice(destination.index, 0, removed);

      // Create new fields object with updated order
      const updatedFields = reorderedItems.reduce((acc: any, item: any, index: number) => {
        // Add the parent question with updated number
        acc[`field-${item.id}`] = {
          ...item,
          questionNumber: index + 1
        };

        // If it's a group question, add all its children
        if (item.group && item.groupfields) {
          Object.values(item.groupfields).forEach((child: any, childIndex: number) => {
            acc[`field-${child.id}`] = {
              ...child,
              parentId: `field-${item.id}`,
              questionNumber: `${index + 1}.${childIndex + 1}`
            };
          });
        }

        return acc;
      }, {});

      // Update the store
      setData({
        ...allData,
        fields: updatedFields
      });
    } else if (
      sourceDroppableId.includes("content-child-items") &&
      destinationDroppableId.includes("content-child-items")
    ) {
      const parentId = `field-${sourceDroppableId.split("-")[3]}`;
      const parentField = newData.fields[parentId];
      
      if (!parentField || !parentField.groupfields) return;

      const subItems = Object.values(parentField.groupfields).filter(Boolean);
      const reorderedSubItems = Array.from(subItems);
      
      if (reorderedSubItems.length > 0) {
        const [removed] = reorderedSubItems.splice(source.index, 1);
        reorderedSubItems.splice(destination.index, 0, removed);

        // Update the parent's groupfields
        const updatedGroupFields = reorderedSubItems.reduce((acc: any, item: any, index: number) => {
          if (item && item.id) {
            acc[`field-${item.id}`] = {
              ...item,
              questionNumber: `${parentField.questionNumber}.${index + 1}`
            };
          }
          return acc;
        }, {});

        // Update the fields object
        const updatedFields = {
          ...newData.fields,
          [parentId]: {
            ...parentField,
            groupfields: updatedGroupFields
          }
        };

        setData({
          ...allData,
          fields: updatedFields
        });
      }
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
