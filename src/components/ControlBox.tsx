import styled from "styled-components";
import DifficultyBox from "./DifficultyBox";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border: 2px solid ${(props) => props.theme.darkgray};
  gap: 8px;
  background-color: ${(props) => props.theme.sand};
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 8px 8px 8px;
  gap: 8px;
`;

const Reset = styled.button`
  background-color: ${(props) => props.theme.red};
  color: white;
`;

const ControlBox = () => {
  return (
    <Wrapper>
      <DifficultyBox />
      <Info>
        <span>남은 지뢰 개수: </span>
        <span>경과 시간: </span>
      </Info>

      <Reset>Reset</Reset>
    </Wrapper>
  );
};

export default ControlBox;
