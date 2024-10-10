import styled from "styled-components";

export const MainWrap = styled.div`
  display: flex;
  width: 98%;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

export const WrapperLeft = styled.div`
  width: 470px;
  padding-left: 40px;
  font-family: Poppins;
  text-align: left;
  box-sizing: border-box;
`;

export const WrapperRight = styled.div`
  width: 470px;
  display: flex;
  padding-left: 40px;
  justify-content: center;
  align-items: center;
`;

export const WrapHeader = styled.h1`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 10px;
`;

export const WrapText = styled.p`
  color: #5e5d6d;
  font-size: 18px;
  line-height: 24px;
  font-family: Poppins;
  font-weight: 400;
  margin-bottom: 10px;
`;

export const WrapSmallHeader = styled.h4`
  color: #5e5d6d;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 10px;
`;

export const WrapPoints = styled.ul`
  padding-left: 0;
  margin-left: 0;
  list-style: none;
`;

export const WrapPoint = styled.li`
  padding-left: 0;
  margin-left: 0;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  margin-bottom: 5px;
`;

export const WrapImage = styled.img`
  max-height: 300px;
  max-width: 460px;
  width: 100%;
  height: auto;
  object-fit: cover;
`;

// Media queries for responsiveness
export const SmallWrapperLeft = styled(WrapperLeft)`
  width: 100%;
`;

export const SmallWrapperRight = styled(WrapperRight)`
  width: 100%;
`;

export const SmallWrapHeader = styled(WrapHeader)`
  font-size: 20px;
`;

export const SmallWrapText = styled(WrapText)`
  font-size: 16px;
`;

export const SmallWrapSmallHeader = styled(WrapSmallHeader)`
  font-size: 18px;
`;

export const SmallWrapImage = styled(WrapImage)`
  max-height: 200px;
`;

export const SmallMainHeader = styled.h1`
  flex-direction: column;
  font-size: 48px;
  font-weight: 600;
  line-height: 58px;
`;

export const ExtraSmallWrapHeader = styled(WrapHeader)`
  font-size: 18px;
`;

export const ExtraSmallWrapText = styled(WrapText)`
  font-size: 14px;
`;

export const ExtraSmallWrapSmallHeader = styled(WrapSmallHeader)`
  font-size: 16px;
`;

export const ExtraSmallWrapImage = styled(WrapImage)`
  max-height: 150px;
`;
