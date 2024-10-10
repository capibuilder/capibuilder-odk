import { Loading } from "@/components";
import { templateAxios } from "@/utils/useAxios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAlert } from "socialwell-design";
import TemplatesContentView from "./components/TemplatesContent";
import { TemplatesContainer, TemplatesSidebar } from "./styles";

export type TemplateProps = {
  templateId: string;
  templateTitle: string;
  surveyCategory: string;
  accessType: string;
  formType: string;
  projectId: string;
  templateFile: string;
  numberOfQuestion: number;
  description: string;
  createdAt: string;
  updatedAt: string;
};

const Templates = () => {
  const [data, setData] = useState<TemplateProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [cloading, setCloading] = useState(true);
  const [categories, setCategory] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState("");
  const { setAlert } = useAlert();

  useEffect(() => {
    setLoading(true);
    templateAxios
      .get("/getSurveyCategories")
      .then(response => {
        const data = response.data.map((item: any, index: number) => ({
          id: index + 1,
          title: item.categoryName,
          value: item.categoryId,
          count: 0,
        }));

        setCategory(data);
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
        setCloading(false);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);

    templateAxios
      .get(`/getTemplates?surveyCategory=${currentTemplate}`)
      .then(response => {
        setData(response.data);
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
  }, [currentTemplate]);

  return (
    <TemplatesContainer>
      <Head>
        <title>Templates - Survey Forms</title>
      </Head>
      <TemplatesSidebar>
        <h1>Templates</h1>
        <h3>Categories</h3>
        <div className="filter-menu">
          {cloading ? (
            <Loading />
          ) : (
            <>
              <div
                onClick={() => setCurrentTemplate("")}
                className={`filter-menu__item ${
                  currentTemplate === "" && "active"
                }`}
              >
                <span>All</span>
              </div>
              {categories?.map((item: any) => (
                <div
                  onClick={() => setCurrentTemplate(item.title)}
                  className={`filter-menu__item ${
                    item.value === currentTemplate && "active"
                  }`}
                  key={item.id}
                >
                  <span>{item.title}</span>
                  {/* <span>{item.count}</span> */}
                </div>
              ))}
            </>
          )}
        </div>
      </TemplatesSidebar>
      <TemplatesContentView {...{ data, loading, currentTemplate }} />
    </TemplatesContainer>
  );
};

export default Templates;
