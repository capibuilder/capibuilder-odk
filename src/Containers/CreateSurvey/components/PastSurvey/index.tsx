import { TemplateProps } from "@/Containers/Templates";
import { Empty, Loading, Search } from "@/components";
import { templateAxios } from "@/utils/useAxios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Switch, useAlert } from "socialwell-design";
import {
  FilterGroup,
  PastSurveyContainer,
  PastSurveyWrapper,
  SurveyCardWrapper,
  SurveyCardsContainer,
  Title,
} from "./styles";

const PastSurvey = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [filteredSurveyData, setFilteredSurveyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();
  const { query } = useRouter();

  useEffect(() => {
    if (query.q) {
      setFilteredSurveyData(surveyData);
      setFilteredSurveyData(prev => {
        return prev?.filter((v: any) =>
          v?.title?.toLowerCase()?.includes(String(query.q)?.toLowerCase())
        );
      });
    } else {
      setFilteredSurveyData(surveyData);
    }
  }, [query]);

  useEffect(() => {
    setLoading(true);
    templateAxios
      .get("/getTemplates")
      .then(response => {
        const data = response.data.map((item: TemplateProps) => ({
          id: item.templateId,
          title: item.templateTitle,
          questions: item.numberOfQuestion,
          responses: 0,
          isFavorite: false,
          createdAt: item.createdAt,
        }));

        setSurveyData(data);
      })
      .catch(error => {
        setAlert({
          title: "Error",
          text: error.message,
          state: "error",
          show: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <PastSurveyContainer>
      <PastSurveyWrapper>
        <h1 className="page__title">Copy a past survey</h1>
        <Search />
      </PastSurveyWrapper>
      <FilterGroup>
        <div className="title title--primary">all surveys</div>
        <Switch
          size="md"
          isChecked={false}
          onChange={() => console.log("log")}
        />
        <div className="title title--secondary">favorites</div>
      </FilterGroup>
      {filteredSurveyData.length === 0 && query.q ? (
        <>
          <Empty message="No Results Found" />
        </>
      ) : loading ? (
        <Loading />
      ) : (
        <>
          <SurveyCards
            title="recent"
            // filter using createdAt
            data={
              query.q
                ? filteredSurveyData.slice(0, 6)
                : [...surveyData]
                    .sort(
                      (a: any, b: any) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .slice(0, 6)
            }
          />
          <SurveyCards
            title="all"
            data={query.q ? filteredSurveyData : surveyData}
          />
        </>
      )}
    </PastSurveyContainer>
  );
};

const SurveyCards = ({ title, data }: { title: string; data: any }) => {
  return (
    <SurveyCardsContainer>
      <Title>{title}</Title>
      <div className="survey-cards">
        {data.map((item: any, index: any) => (
          <SurveyCard key={index} data={item} />
        ))}
      </div>
    </SurveyCardsContainer>
  );
};

const SurveyCard = ({ data }: { data: any }) => {
  const [favorite, setFavorite] = useState(data.isFavorite);
  const router = useRouter();

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    router.push(`/templates/${data.id}`);
  };

  return (
    <SurveyCardWrapper data-animate="opacity" onClick={handleClick}>
      <div className="title">{data.title}</div>
      <div className="light-text">{data.questions} questions</div>
      <div className="light-text">{data.responses} responses</div>
      <div
        onClick={e => {
          e.stopPropagation();
          setFavorite((v: boolean) => !v);
        }}
        className={`star star--${favorite ? "active" : "disabled"}`}
      >
        &#9733;
      </div>
    </SurveyCardWrapper>
  );
};

export default PastSurvey;
