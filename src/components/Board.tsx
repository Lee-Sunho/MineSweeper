import { useSelector } from "react-redux";
import Cell from "./Cell";
import { RootState } from "../redux/configureStore";
import { styled } from "styled-components";
import { GameState } from "../constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Result = styled.span`
  text-align: center;
  margin-top: 10px;
`;

const Board = () => {
  const board = useSelector<RootState, number[][]>((state) => {
    return state.control.board;
  });
  const state = useSelector<RootState, GameState>((state) => {
    return state.control.gameState;
  });

  return (
    <Wrapper>
      {board.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((col, colIndex) => (
            <Cell
              key={rowIndex * row.length + colIndex}
              type={col}
              rowIndex={rowIndex}
              colIndex={colIndex}
            />
          ))}
        </Row>
      ))}
      {state === GameState.WIN ? (
        <Result> 🎉 승리하셨습니다! 🎉</Result>
      ) : state === GameState.LOSE ? (
        <Result> 😂 패배하셨습니다.. 😂 </Result>
      ) : null}
    </Wrapper>
  );
};

export default Board;
