import React from "react";
import styled from "styled-components";

const SkeletonCard = () => {
  return (
    <SkeletonCardWrapper>
      <div className="card-skeleton card-skeleton__cover"></div>
      <div className="card-skeleton__content">
        <div className="card-skeleton card-skeleton__content__avatar"></div>
        <div className="card-skeleton__content__flex">
          <div className="card-skeleton card-skeleton__content__flex__title"></div>
          <div className="card-skeleton card-skeleton__content__flex__title"></div>
          <div className="card-skeleton card-skeleton__content__flex__title skeleton-name"></div>
          <div className="card-skeleton card-skeleton__content__flex__title skeleton-tags"></div>
        </div>
      </div>
    </SkeletonCardWrapper>
  );
};

const SkeletonCardWrapper = styled.div`
  background: white;
  padding: 20px;
  border: 1px solid hsl(200, 20%, 80%);
  border-radius: 16px;
  min-height: 400px;

  /* create animation */
  .card-skeleton {
    border-radius: 10px;
    animation: skeleton-loading 1s linear infinite alternate;
  }

  .card-skeleton__cover {
    height: 250px;
    margin-bottom: 10px;
  }

  .card-skeleton__content {
    display: flex;
    gap: 10px;
  }

  .card-skeleton__content__avatar {
    flex: 0.19;
    width: 48px;
    height: 48px;
    margin-bottom: 10px;
    border-radius: 100px;
  }

  .card-skeleton__content__flex {
    width: 100%;
    flex: 1;

    &__title {
      width: 100%;
      height: 15px;
      margin-bottom: 10px;
    }

    .skeleton-name {
      width: 30%;
    }

    .skeleton-tags {
      width: 50%;
    }
  }

  .card-skeleton__header {
    height: 20px;
    margin-bottom: 10px;
  }

  @keyframes skeleton-loading {
    0% {
      background-color: hsl(200, 20%, 80%);
    }
    100% {
      background-color: hsl(200, 20%, 95%);
    }
  }
`;

export default SkeletonCard;
