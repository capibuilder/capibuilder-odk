import { getTokenFormLocal } from "@/utils/useAxios";
import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Wrapper } from "./styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  ChartDataLabels
);

interface SubmissionByDayProps {
  isDraft: boolean;
}

function SubmissionByDay({ isDraft }: SubmissionByDayProps) {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = isDraft
          ? "/api/get-submissions-draft-stats"
          : "/api/get-submissions-stats";

        const res = await axios.post(
          endpoint,
          {
            projectId: router.query.projectid,
            formId: router.query.surveyid,
            tag: "#totalSubmissions",
          },
          {
            headers: {
              Authorization: getTokenFormLocal(),
            },
          }
        );

        // Log the API response to check its structure
        console.log("API Response:", res.data);

        // Use dailyCounts from the response
        const dailyCounts = res.data.dailyCounts || [];
        const chartData = dailyCounts.map((item: any) => ({
          date: item.date,
          received: item.count, // Assuming all are received
          approved: 0, // Placeholder, adjust as needed
          rejected: 0, // Placeholder, adjust as needed
        }));

        setData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (router.query.projectid && router.query.surveyid) {
      fetchData();
    }
  }, [router.query.projectid, router.query.surveyid, isDraft]);

  const chartData = {
    labels: data.map((i: any) => i.date),
    datasets: [
      {
        label: "Received",
        data: data.map((item: any) => item.received),
        backgroundColor: "#7569B3",
      },
      {
        label: "Approved",
        data: data.map((item: any) => item.approved),
        backgroundColor: "#BCBBDD",
      },
      {
        label: "Rejected",
        data: data.map((item: any) => item.rejected),
        backgroundColor: "#BCBBDD",
      },
    ],
  };

  const options: any = {
    responsive: true,
    aspectRatio: 2.5,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          pointStyle: "circle",
          usePointStyle: true,
          font: {
            size: 16,
          },
        },
      },
      datalabels: {
        display: true,
        color: "white",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        stacked: true,
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <Wrapper>
      <h2>Submissions by Day</h2>
      <Bar options={options} data={chartData} />
    </Wrapper>
  );
}

export default SubmissionByDay;
