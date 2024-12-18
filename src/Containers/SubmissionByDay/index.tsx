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

        // Use dailyCounts from the response
        const dailyCounts =
          res.data.find((item: any) => item.tag === "#totalSubmissions")
            .dailyCounts || [];

        // Example logic to determine approved and rejected counts
        const chartData = dailyCounts.map((item: any) => ({
          date: item.date,
          received: item.count,
          approved: Math.floor(item.count * 0.7), // Example: 70% approved
          rejected: Math.floor(item.count * 0.3), // Example: 30% rejected
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
        backgroundColor: "#FF6B6B",
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
        stacked: false,
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        stacked: false,
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
