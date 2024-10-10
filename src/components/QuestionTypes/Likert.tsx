import useSurveyStore from "@/context/surveyStores";
import { questionField } from "@/interfaces/questionFields";
import { ChangeEvent, useState } from "react";
import styled, { CSSProperties } from "styled-components";
import { shallow } from "zustand/shallow";

export default function Likert() {
  const [rating, setRating] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  return (
    <Wrapper style={{ "--w": `${(rating * 83) / 5}%` } as CSSProperties}>
      <label htmlFor="1">
        <input
          checked={rating >= 1 ? true : false}
          onChange={handleChange}
          type="checkbox"
          value="1"
          id="1"
        />
        <span className="checkbox"></span>
        <span>
          <img src="/assets/svg/ratings/1.svg" alt="1" />
          <span>Strongly disagree</span>
        </span>
      </label>

      <label htmlFor="2">
        <input
          checked={rating >= 2 ? true : false}
          onChange={handleChange}
          type="checkbox"
          value="2"
          id="2"
        />
        <span className="checkbox"></span>
        <span>
          <img src="/assets/svg/ratings/2.svg" alt="1" />
          <span>Disagree</span>
        </span>
      </label>

      <label htmlFor="3">
        <input
          checked={rating >= 3 ? true : false}
          onChange={handleChange}
          type="checkbox"
          value="3"
          id="3"
        />
        <span className="checkbox"></span>
        <span>
          <img src="/assets/svg/ratings/3.svg" alt="1" />
          <span>Neutral</span>
        </span>
      </label>

      <label htmlFor="4">
        <input
          checked={rating >= 4 ? true : false}
          onChange={handleChange}
          type="checkbox"
          value="4"
          id="4"
        />
        <span className="checkbox"></span>
        <span>
          <img src="/assets/svg/ratings/4.svg" alt="1" />
          <span>Agree</span>
        </span>
      </label>

      <label htmlFor="5">
        <input
          checked={rating >= 5 ? true : false}
          onChange={handleChange}
          type="checkbox"
          value="5"
          id="5"
        />
        <span className="checkbox"></span>
        <span>
          <img src="/assets/svg/ratings/5.svg" alt="1" />
          <span>Strongly Agree</span>
        </span>
      </label>
    </Wrapper>
  );
}

export const LikertWithLang = ({ lang }: { lang?: string }) => {
  const [rating, setRating] = useState(0);
  const data = useSurveyStore(state => state.data, shallow);
  const currentField = useSurveyStore(state => state.currentField)!;

  const selectedField: questionField = data.fields[currentField];

  const options =
    selectedField?.otherLangs?.find((item: any) => item.lang === lang)
      ?.selectOptions || [];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(+e.target.value);
  };

  return (
    <Wrapper style={{ "--w": `${(rating * 83) / 5}%` } as CSSProperties}>
      {options.map((option: any, index) => {
        const number = index + 1;
        return (
          <label htmlFor={`${lang}-${number}`} key={`${lang}-${number}`}>
            <input
              checked={rating >= number ? true : false}
              onChange={handleChange}
              type="checkbox"
              value={`${number}`}
              id={`${lang}-${number}`}
            />
            <span className="checkbox"></span>
            <span>
              <img
                src={`/assets/svg/ratings/${number}.svg`}
                alt={`${number}`}
              />
              <span>{option.label}</span>
            </span>
          </label>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 20px;
  align-items: baseline;
  position: relative;

  label {
    margin-bottom: 20px;
    cursor: pointer;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;

    * {
      transition: all 0.3s;
    }

    :hover {
      img {
        transform: scale(1.3);
      }
    }

    :not(:first-child):has(input:checked) {
      input + .checkbox::before {
        content: "";
        width: 850%;
        height: 2px;
        background-color: grey;
        position: absolute;
        right: 8.5%;
        top: 40%;
      }
    }

    input {
      width: 0;
      height: 0;

      + .checkbox {
        height: 18px;
        width: 18px;
        margin: 0 auto 10px auto;
        outline: 2px solid gray;
        border-radius: 50%;
        display: block;
        position: relative;
      }

      :checked {
        + .checkbox {
          background: grey;
        }
      }
    }

    span {
      display: block;
      width: 100%;
      max-width: 100px;
      text-align: center;
    }
  }
`;
