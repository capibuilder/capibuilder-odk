import { getTokenFormLocal } from "@/utils/useAxios";
import axios from "axios";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { IconType } from "react-icons";
import styled from "styled-components";

interface CardData {
  title: string;
  value: number;
  prefix: string;
  suffix: string;
  dailyCounts: number[];
}

interface CardProps {
  component: {
    tag: string;
    isDraft: boolean;
    icon: IconType;
  };
}

const Card = ({ component }: CardProps) => {
  const [data, setData] = useState<CardData>({
    title: "",
    value: 0,
    prefix: "",
    suffix: "",
    dailyCounts: [],
  });

  const router = useRouter();
  const Icon = component.icon;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = component.isDraft
          ? "/api/get-submissions-draft-stats"
          : "/api/get-submissions-stats";

        const res = await axios.post(
          endpoint,
          {
            tag: component.tag,
            projectId: router.query.projectid,
            formId: router.query.surveyid,
          },
          {
            headers: {
              Authorization: getTokenFormLocal(),
            },
          }
        );

        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [
    component.tag,
    component.isDraft,
    router.query.projectid,
    router.query.surveyid,
  ]);

  return (
    <DashboardCard>
      <div className="title">
        <p>
          <Icon size={20} className="icon" />
          {data.title}
        </p>
        <div className="value-container">
          <h3>
            {data.prefix} {data.value}
          </h3>
          {data.suffix && <span className="suffix">{data.suffix}</span>}
        </div>
      </div>
      {data.dailyCounts && data.dailyCounts.length > 0 && (
        <div className="mini-chart">
          {data.dailyCounts.map((value, index) => (
            <div key={index} className="bar-container">
              <div
                className="bar"
                style={{
                  height: `${(value / Math.max(...data.dailyCounts)) * 100}%`,
                }}
                title={`${new Date(
                  Date.now() - (4 - index) * 86400000
                ).toLocaleDateString()}: ${value} submissions`}
              />
            </div>
          ))}
        </div>
      )}
    </DashboardCard>
  );
};

const DashboardCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .title {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .value-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  p {
    font-weight: bold;
    color: lightslategray;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 8px;
    letter-spacing: 0.5px;

    .icon {
      color: #444df7;
    }
  }

  h3 {
    font-weight: bold;
    color: #000;
    font-size: 2rem;
    margin: 0;
  }

  .suffix {
    font-weight: bold;
    color: lightslategray;
    font-size: 1.2rem;
  }

  .mini-chart {
    position: absolute;
    bottom: 10px;
    right: 20px;
    height: 40px;
    display: flex;
    gap: 4px;
    align-items: flex-end;

    .bar-container {
      width: 6px;
      height: 100%;
      display: flex;
      align-items: flex-end;

      .bar {
        width: 100%;
        background-color: #444df730;
        border-radius: 2px;
        transition: height 0.3s ease;
        cursor: pointer;

        &:hover {
          background-color: #444df7;
        }
      }
    }
  }
`;

export default memo(Card);
