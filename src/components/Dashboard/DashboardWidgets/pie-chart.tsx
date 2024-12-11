import axios from "axios";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { memo, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ component }: { component: any }) => {
  const [data, setData] = useState({
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: "left" as const,
        },
        title: {
          display: true,
          text: "",
          align: "start" as const,
          font: {
            size: 14,
            weight: "bold" as const,
            family: "'Inter', sans-serif",
          },
          color: "lightslategray",
          padding: {
            top: 20,
            left: 20,
            bottom: 20,
          },
          textAlign: "left",
        },
      },
      maintainAspectRatio: false,
    },
  });

  useEffect(() => {
    (async () => {
      const res = await axios.post("/api/get-tag-data", {
        tag: component.tag,
      });
      const data = await res.data;
      setData(data);
    })();
  }, [component.tag]);

  return (
    <ChartContainer>
      <Pie
        data={data.data}
        options={data.options}
        style={{
          height: "100%",
        }}
      />
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
`;

export default memo(PieChart);

export { PieChart };
