import { Empty, Loading } from "@/components";
import useToken from "@/hooks/useToken";
import { Button } from "@/styles/globals";
import { odkAxios } from "@/utils/useAxios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAlert } from "socialwell-design";
import styled from "styled-components";
import LinkModal from "./LinkModal";
import Row from "./LinkRow";

export interface links {
  once?: boolean;
  id?: number;
  type?: string;
  displayName?: string;
  createdAt?: Date;
  updatedAt?: null;
  deletedAt?: null;
  token: string | null;
}

export default function Links({
  enketoOnceId,
  getEnketoOnceId,
}: {
  enketoOnceId: string;
  getEnketoOnceId: () => void;
}) {
  const { query } = useRouter();
  const projectId = query.projectid as string;
  const { setAlert } = useAlert();
  const { token } = useToken();
  const [data, setData] = useState<links[]>([]);
  const [loading, setLoading] = useState(false);
  const [showLink, setShowLink] = useState(false);

  const getPublicAccessLinks = () => {
    setLoading(true);
    odkAxios
      .get(`/v1/projects/${projectId}/forms/${query.surveyId}/public-links`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(v => {
        setData(v.data);
        !enketoOnceId && getEnketoOnceId();
      })
      .catch(() => {
        setAlert({
          show: true,
          state: "error",
          text: "Something went wrong",
          title: "Request Failed",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   setOrigin(window?.origin);
  // }, []);

  useEffect(() => {
    getPublicAccessLinks();
  }, [query.surveyId]);

  return (
    <>
      {showLink && (
        <LinkModal
          handleClose={() => {
            setShowLink(false);
          }}
          refresh={getPublicAccessLinks}
        />
      )}
      <LinksWrapper>
        <li className="head link">
          <span>Name</span>
          <span>Single</span>
          <span>Link</span>
          <span>Action</span>
        </li>
        {loading ? (
          <Loading height="250px" />
        ) : (
          <>
            {data.length === 0 && !loading ? (
              <Empty message="You don't have any Public links" />
            ) : (
              data.map((data, index) => (
                <Row
                  key={index}
                  data={data}
                  enketoOnceId={enketoOnceId}
                  refresh={getPublicAccessLinks}
                />
              ))
            )}
          </>
        )}

        <Button
          onClick={() => {
            setShowLink(true);
          }}
        >
          Create new
        </Button>
      </LinksWrapper>
    </>
  );
}

const LinksWrapper = styled.ul`
  width: 100%;
  margin-top: 30px;
  overflow-y: auto;
  max-height: 330px;

  button {
    /* margin: 0 0 0 auto; */
    position: sticky;
    bottom: 0;
  }

  li.head {
    background-color: lightgrey;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  li.link {
    font-weight: 600;
    align-items: center;
    padding: 10px;
    display: grid;
    grid-template-columns: 0.4fr 0.3fr 0.3fr 0.15fr;
    border-bottom: 1px solid #000;
    font-size: 15px;

    span:not(:first-child) {
      text-align: center;
    }

    span.url {
      user-select: all;
    }

    button {
      all: unset;
      cursor: pointer;
      padding: 5px;
      text-align: center;

      svg {
        fill: red;
      }
    }
  }

  [aria-disabled="true"] {
    cursor: not-allowed;
  }
`;
