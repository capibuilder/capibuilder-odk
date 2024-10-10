import {
  EditDocumentIcon,
  FolderIcon,
  ReplyMailIcon,
  TimeIcon,
} from "@/assets";
import { Loading } from "@/components";
import authStore from "@/context/authStores";
import { useToken } from "@/hooks";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  CardItem,
  CardItems,
  Content,
  DashboardCardContainer,
  Icon,
  Name,
  Number,
  Wrapper,
} from "./styles";

const cardItems = [
  { name: "open", number: 30, icon: FolderIcon },
  { name: "draft", number: 3, icon: EditDocumentIcon },
  { name: "Total Response", number: 24, icon: ReplyMailIcon },
  { name: "Typical Time Spent", number: 5, icon: TimeIcon },
];

const DashboardCard = () => {
  const [loading, setLoading] = useState(true);
  const { getProjectId } = authStore();
  const { token } = useToken();
  const [data, setData] = useState({
    published: 0,
    draft: 0,
  });

  useEffect(() => {
    setLoading(true);
    axios
      .post("/api/get-stats", {
        projectId: getProjectId(),
        token: token,
      })
      .then(res => {
        setData(res.data);
      })
      .catch(err => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <DashboardCardContainer>
      <Wrapper>
        <CardItems>
          <CardItem>
            <Icon>
              <FolderIcon />
            </Icon>
            <Content>
              <Name>Open</Name>
              {loading ? (
                <>
                  <br />
                  <Loading height="20px" />
                </>
              ) : (
                <Number>{data.published}</Number>
              )}
            </Content>
          </CardItem>
          <CardItem>
            <Icon>
              <EditDocumentIcon />
            </Icon>
            <Content>
              <Name>Drafts</Name>
              {loading ? (
                <>
                  <br />
                  <Loading height="20px" />
                </>
              ) : (
                <Number>{data.draft}</Number>
              )}
            </Content>
          </CardItem>
          <CardItem>
            <Icon>
              <ReplyMailIcon />
            </Icon>
            <Content>
              <Name>Total Response</Name>

              {loading ? (
                <>
                  <br />
                  <Loading height="20px" />
                </>
              ) : (
                <Number>{data.published * 25}</Number>
              )}
            </Content>
          </CardItem>
          <CardItem>
            <Icon>
              <TimeIcon />
            </Icon>
            <Content>
              <Name>Typical Time Spent</Name>
              {loading ? (
                <>
                  <br />
                  <Loading height="20px" />
                </>
              ) : (
                <Number>{data.published ? "5" : "-"}</Number>
              )}
            </Content>
          </CardItem>
        </CardItems>
      </Wrapper>
    </DashboardCardContainer>
  );
};

export default DashboardCard;
