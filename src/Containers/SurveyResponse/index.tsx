import useToken from "@/hooks/useToken";
import { odkAxios } from "@/utils/useAxios";
import Head from "next/head";
import { createContext, useEffect, useState } from "react";
import SurveyTable from "./components/SurveyTable";
import { SurveyResponseContainer, Wrapper } from "./styles";

export const TableContext = createContext<any>(null);

const SurveyResponse = ({ slug }: any) => {
  const [newData, setNewData] = useState(null);
  const { token } = useToken();
  useEffect(() => {
    odkAxios
      .get(
        `/v1/projects/3/forms/${slug}.svc/Submissions?%24top=250&%24skip=0&%24count=true&%24wkt=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(e => {
        setNewData(e.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  return (
    <SurveyResponseContainer>
      <Head>
        <title>Survey Responses</title>
      </Head>
      <Wrapper>
        <div className="heading">Survey Responses</div>
        <TableContext.Provider value={{ newData, slug }}>
          <SurveyTable />
        </TableContext.Provider>
      </Wrapper>
    </SurveyResponseContainer>
  );
};

export default SurveyResponse;
