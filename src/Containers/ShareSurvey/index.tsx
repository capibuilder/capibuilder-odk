import { ChatIcon, EmailIcon, FormIcon, LinkIcon, VideoIcon } from "@/assets";

import useToken from "@/hooks/useToken";
import { odkAxios } from "@/utils/useAxios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Flex } from "socialwell-design";
import Links from "./components/Links";
import { ShareContainer, Wrapper } from "./styles";

export default function Index() {
  const { push, query, isReady } = useRouter();
  const projectId = query.projectid as string;
  const [enketoOnceId, setEnketoOnceId] = useState("");
  const { token } = useToken();

  const getEnketoOnceId = () => {
    odkAxios
      .get(`/v1/projects/${projectId}/forms/${query.surveyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(v => {
        setEnketoOnceId(v.data.enketoOnceId);
      })
      .catch(() => {});
  };

  useEffect(() => {
    isReady && getEnketoOnceId();
  }, [isReady]);

  return (
    <ShareContainer>
      <Wrapper>
        <h1 className="page__title">Share the survey</h1>

        <div className="content">
          <Flex>
            <div className="l">
              <ul>
                <li className="row">
                  <p>Collect the response in</p>
                  <div className="pt">
                    <button>
                      <FormIcon />
                      <span>Form</span>
                    </button>
                    <button>
                      <VideoIcon />
                      <span>Video Call</span>
                    </button>
                    <button>
                      <ChatIcon />
                      <span>Chat</span>
                    </button>
                  </div>
                </li>
                <li className="row">
                  <p>Send via</p>
                  <div className="pt">
                    <button
                      onClick={() => {
                        delete query.tab;
                        push({
                          pathname: "",
                          query: { ...query },
                        });
                      }}
                      className={!query.tab ? "active" : ""}
                    >
                      <EmailIcon />
                      <span>Mail</span>
                    </button>
                    <button
                      onClick={() => {
                        push({
                          pathname: "",
                          query: { ...query, tab: "links" },
                        });
                      }}
                      className={query.tab === "links" ? "active" : ""}
                    >
                      <LinkIcon />
                      <span>Links</span>
                    </button>
                  </div>
                </li>
                {query?.tab === "links" ? (
                  <Links
                    getEnketoOnceId={getEnketoOnceId}
                    enketoOnceId={enketoOnceId}
                  />
                ) : (
                  <>
                    <li className="row">
                      <p> Email to</p>
                      <input placeholder="Enter email address" type="text" />
                    </li>
                    <li className="row">
                      <p> Subject</p>
                      <input placeholder="Enter subject" type="text" />
                    </li>
                    <li className="row">
                      <p> Message</p>
                      <input placeholder="Enter message here" type="text" />
                    </li>
                  </>
                )}
              </ul>
              {query?.tab !== "links" && (
                <Flex className="btns" justifyContent="flex-end">
                  <Button name="Cancel" type="button" variant="outline" />
                  <Button name="Send" type="submit" variant="outline" />
                </Flex>
              )}
            </div>
            <div className="r">
              {/* <FormIframe
                src={`${ODK_BASE_URL}/-/single/${enketoOnceId}?st=${query.st}`}
              ></FormIframe> */}
            </div>
          </Flex>
        </div>
      </Wrapper>
    </ShareContainer>
  );
}
