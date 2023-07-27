import styled from "styled-components";
import DifficultyBox from "./DifficultyBox";
import CustomBox from "./CustomBox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";
import { increaseTimer, readyGame } from "../redux/controlSlice";
import { useEffect } from "react";
import { CellType, GameState } from "../constants";
import Cell from "./Cell";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border: 2px solid ${(props) => props.theme.darkgray};
  gap: 4px;
  background-color: ${(props) => props.theme.sand};
`;

const ControlWrapper = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: center;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  font-size: 12px;
  font-weight: 700;
  flex-direction: column;
  padding: 8px 8px 8px 8px;
  gap: 4px;
`;

const Reset = styled.button`
  background-color: ${(props) => props.theme.red};
  color: white;
`;

const ControlBox = () => {
  const dispatch = useDispatch();

  const row = useSelector<RootState, number>((state) => {
    return state.control.row;
  });
  const column = useSelector<RootState, number>((state) => {
    return state.control.column;
  });
  const mineCnt = useSelector<RootState, number>((state) => {
    return state.control.mineCnt;
  });
  const currentState = useSelector<RootState, GameState>((state) => {
    return state.control.gameState;
  });
  const remain = useSelector<RootState, number>((state) => {
    return state.control.mineCnt - state.control.flagCnt;
  });

  const timer = useSelector<RootState, number>((state) => {
    return state.control.timer;
  });

  useEffect(() => {
    let t: any;
    if (currentState === GameState.RUN) {
      t = setInterval(() => {
        dispatch(increaseTimer({}));
      }, 1000);
    }
    return () => {
      clearInterval(t);
    };
  }, [currentState]);

  const handleReset = () => {
    dispatch(readyGame({ row, column, mineCnt }));
  };

  return (
    <Wrapper>
      <ControlWrapper>
        <DifficultyBox />
        <Info>
          <span>남은 지뢰 개수 : {remain}</span>
          <span>경과 시간 : {timer}</span>
        </Info>
        <Reset onClick={handleReset}>Reset</Reset>
      </ControlWrapper>
      <CustomBox />
    </Wrapper>
  );
};

export default ControlBox;
