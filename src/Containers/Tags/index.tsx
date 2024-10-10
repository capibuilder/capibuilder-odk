import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAlert } from "socialwell-design";

import { PlusIcon as SimplePlusIcon } from "@/assets";
import { Empty, Loading, Search } from "@/components";
import authStore from "@/context/authStores";
import { createTags, getAllTags, updateTags } from "@/utils/useAxios";
import Head from "next/head";
import DotIcon from "./icons/DotIcon";
import EditIcon from "./icons/EditIcon";
import MinusIcon from "./icons/MinusIcon";
import PlusIcon from "./icons/PlusIcon";
import {
  TagContentWrapper,
  TagDrawerOverlay,
  TagDrawerWrapper,
  TagGridWrapper,
  TagSidebarWrapper,
  TagsContainer,
  TagsWrapper,
} from "./styles";

type KeywordIdProps = { id: string; isOpen: boolean; edit: boolean };

const TagContext = React.createContext<{
  currentKeywordId: string | null;
  setCurrentKeywordId: (keywordId: string) => void;
  keywordId: KeywordIdProps;
  setKeywordId: (keywordId: KeywordIdProps) => void;
  filteredData: KeywordProps[];
}>({
  currentKeywordId: null,
  setCurrentKeywordId: () => {},
  keywordId: { id: "", isOpen: false, edit: false },
  setKeywordId: () => {},
  filteredData: [],
});

const Tags = () => {
  const { query } = useRouter();
  const [tags, setTags] = useState(null);
  const [loading, setLoading] = useState(false);
  const [keywordId, setKeywordId] = useState({
    id: "",
    isOpen: false,
    edit: false,
  });
  const [currentKeywordId, setCurrentKeywordId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getAllTags();

      setTags(data);
      setLoading(false);
    })();
  }, []);

  const refetch = async () => {
    setLoading(true);
    const data = await getAllTags();
    setTags(data);
    setLoading(false);
  };

  const tagData = tags || [];
  const filteredData = query.q
    ? tagData.filter((item: KeywordProps) =>
        item.keywordDetails[0].keyword
          ?.toLowerCase()
          .includes(String(query.q).toLowerCase())
      )
    : tagData;

  return (
    <TagsContainer>
      <Head>
        <title>Tags</title>
      </Head>
      <TagsWrapper>
        <h1 className="page__title">Tags</h1>

        <Search />
      </TagsWrapper>
      {loading ? (
        <Loading />
      ) : (
        <TagGridWrapper>
          <TagContext.Provider
            value={{
              filteredData,
              currentKeywordId,
              setCurrentKeywordId,
              keywordId,
              setKeywordId,
            }}
          >
            {keywordId.isOpen && <TagDrawer refresh={() => refetch()} />}
            <TagSidebar />
            {filteredData.length === 0 ? (
              <Empty message="No Results Found" />
            ) : (
              <TagContent />
            )}
          </TagContext.Provider>
        </TagGridWrapper>
      )}
    </TagsContainer>
  );
};

type TagData = {
  id: string;
  tag: string;
  label: string;
  defination: string;
  children?: TagData[];
  parent?: string;
};

interface KeywordDetails {
  keywordDetailsId: string;
  keyword: string;
  defination: string;
  label: string;
}

interface KeywordProps {
  keywordId: string;
  createdAt: string;
  keywordDetails: KeywordDetails[];
  relatedKeywordId: string | null;
}

const Tag = React.memo(({ data }: { data: TagData }) => {
  const { isLoggedIn } = authStore();
  const { setCurrentKeywordId, setKeywordId } = React.useContext(TagContext);
  const [open, setOpen] = useState(false);
  const [parent] = useAutoAnimate();

  return (
    <div className="tags" ref={parent}>
      <div className="tag">
        <div
          className="tag-parent"
          onClick={() => {
            setOpen(b => !b);
            setCurrentKeywordId(data.id);
          }}
        >
          {data.children?.length ? (
            <>{open ? <MinusIcon /> : <PlusIcon />}</>
          ) : (
            <DotIcon />
          )}
          {data.label}
        </div>
        {isLoggedIn && (
          <>
            <button
              className="add-tag-btn"
              onClick={() => {
                setKeywordId({
                  id: data.id,
                  isOpen: true,
                  edit: false,
                });
                setCurrentKeywordId(data.id);
              }}
            >
              <SimplePlusIcon size="20" color="black" />
            </button>
            <button
              className="add-tag-btn"
              onClick={() => {
                setKeywordId({
                  id: data.id,
                  isOpen: true,
                  edit: true,
                });
                setCurrentKeywordId(data.id);
              }}
            >
              <EditIcon />
            </button>
          </>
        )}
      </div>
      {open && data.children?.length !== 0 && (
        <div className="tag-child">
          {data.children?.map((child, index) => (
            <Tag key={index} data={child} />
          ))}
        </div>
      )}
    </div>
  );
});

Tag.displayName = "Tag";

const convertData = (data: KeywordProps[]): TagData[] => {
  const result: TagData[] = [];
  const map: Record<string, TagData> = {};
  data.forEach(item => {
    map[item.keywordId] = {
      id: item.keywordId,
      tag: item.keywordDetails[0].keyword,
      label: item.keywordDetails[0].label,
      defination: item.keywordDetails[0].defination,
      children: [],
      parent: item.relatedKeywordId || undefined,
    };
  });
  data.forEach(item => {
    if (item.relatedKeywordId) {
      map[item.relatedKeywordId]?.children?.push(map[item.keywordId]);
    } else {
      result.push(map[item.keywordId]);
    }
  });

  return result;
};

const TagSidebar = () => {
  const { isLoggedIn } = authStore();
  const { setKeywordId, filteredData } = React.useContext(TagContext);
  return (
    <TagSidebarWrapper>
      <div className="header">
        {isLoggedIn && (
          <button
            onClick={() =>
              setKeywordId({
                id: "",
                isOpen: true,
                edit: false,
              })
            }
          >
            <SimplePlusIcon size="30" color="black" />
          </button>
        )}
      </div>
      <div className="content">
        {convertData(filteredData).map((data, index) => (
          <Tag key={index} data={data} />
        ))}
      </div>
    </TagSidebarWrapper>
  );
};

const TagContent = () => {
  const { currentKeywordId, setCurrentKeywordId, filteredData } =
    React.useContext(TagContext);
  if (!currentKeywordId) {
    return (
      <TagContentWrapper
        style={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <span className="no-tag">no tag selected</span>
      </TagContentWrapper>
    );
  }

  const keyword: KeywordProps | undefined =
    filteredData.find(item => item.keywordId === currentKeywordId) || undefined;

  if (!keyword) return null;

  const parent: KeywordProps | undefined =
    filteredData.find(item => item.keywordId === keyword.relatedKeywordId) ||
    undefined;

  return (
    <TagContentWrapper>
      <div className="tag">
        <span className="header">Label</span>{" "}
        <span>{keyword.keywordDetails.at(0)?.label}</span>
      </div>
      <div className="tag">
        <span className="header">tag</span>{" "}
        <span>{keyword.keywordDetails.at(0)?.keyword}</span>
      </div>
      <div className="tag">
        <span className="header">Definition</span>{" "}
        <span>{keyword.keywordDetails.at(0)?.defination}</span>
      </div>
      <div className="tag tag-parent">
        <span className="header">Broader Tag</span>{" "}
        <span
          className="link"
          onClick={() => {
            if (!keyword.relatedKeywordId) return;

            setCurrentKeywordId(keyword.relatedKeywordId);
          }}
        >
          {parent ? parent?.keywordDetails.at(0)?.keyword : "None"}
        </span>
      </div>
    </TagContentWrapper>
  );
};

function isValidInput(input: string): boolean {
  // Define a regular expression pattern for validation
  const validationRegex = /^[a-zA-Z][a-zA-Z0-9\-_\.]*$/;

  // Test if the input string matches the validation pattern
  return validationRegex.test(input);
}

const TagDrawer = ({ refresh }: { refresh: () => void }) => {
  const { setAlert } = useAlert();
  const { keywordId, currentKeywordId, setKeywordId, filteredData } =
    React.useContext(TagContext);
  const [errors, setErrors] = useState({
    tag: "",
    defination: "",
  });

  const keyword: KeywordProps | undefined =
    filteredData.find(item => item.keywordId === currentKeywordId) || undefined;

  const currentKeyword = keyword?.keywordDetails.at(0);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const label = (e.target as any).label.value;
    const keyword = (e.target as any).tag.value;
    const defination = (e.target as any).defination.value;

    if (keywordId.edit) {
      updateTags(
        keywordId.id,
        currentKeyword?.keywordDetailsId || "",
        label,
        keyword,
        defination
      )
        .then(() => {
          setAlert({
            show: true,
            state: "success",
            text: "Tag Updated Successfully",
            title: "Success",
          });
          refresh();
          setKeywordId({
            id: "",
            isOpen: false,
            edit: false,
          });
        })
        .catch(error => {
          setAlert({
            show: true,
            state: "error",
            text: error.message,
            title: "Error",
          });
        });
      return;
    }

    createTags(keywordId.id || null, label, keyword, defination)
      .then(() => {
        setAlert({
          show: true,
          state: "success",
          text: "Tag Added Successfully",
          title: "Success",
        });
        refresh();
        setKeywordId({
          id: "",
          isOpen: false,
          edit: false,
        });
      })
      .catch(error => {
        setAlert({
          show: true,
          state: "error",
          text: error.message,
          title: "Error",
        });
      });
  };

  return (
    <>
      <TagDrawerOverlay />
      <TagDrawerWrapper>
        <div className="header">
          {keywordId.edit ? "Edit Tag" : "Add Tag"}
          {keywordId.id && `: ${keyword?.keywordDetails.at(0)?.keyword}`}
        </div>
        <form onSubmit={onSubmit} className="content">
          <div className="input-group">
            <label htmlFor="label">
              label <div className="required">*</div>
            </label>
            <input
              type="text"
              id="label"
              defaultValue={keywordId.edit ? currentKeyword?.label : ""}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="tag">
              tag <div className="required">*</div>
            </label>
            <div className="input-error">
              <input
                type="text"
                onChange={e => {
                  if (!isValidInput(e.target.value)) {
                    setErrors({
                      ...errors,
                      tag: "Only letters, numbers, -, _, and . are allowed. The first character must be a letter.",
                    });
                  } else {
                    setErrors({
                      ...errors,
                      tag: "",
                    });
                  }
                }}
                defaultValue={keywordId.edit ? currentKeyword?.keyword : ""}
                id="tag"
                required
              />
              {errors.tag && <span className="error">{errors.tag}</span>}
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="defination">
              Definition <div className="required">*</div>
            </label>
            <textarea name="defination" id="" required rows={5}>
              {keywordId.edit ? currentKeyword?.defination : ""}
            </textarea>
          </div>
          <div className="btns">
            <button
              type="button"
              className="btn"
              onClick={() =>
                setKeywordId({
                  id: "",
                  isOpen: false,
                  edit: false,
                })
              }
            >
              cancel
            </button>
            <button className="btn primary" disabled={!!errors.tag}>
              {keywordId.edit ? "update" : "save"}
            </button>
          </div>
        </form>
      </TagDrawerWrapper>
    </>
  );
};

export default Tags;
