import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { readyGame, startGame } from "../redux/controlSlice";
import Cell from "./Cell";
import { RootState } from "../redux/configureStore";
import { styled } from "styled-components";
import { CellType, GameState } from "../constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  const dispatch = useDispatch();
  const board = useSelector<RootState, number[][]>((state) => {
    return state.control.board;
  });
  const state = useSelector<RootState, GameState>((state) => {
    return state.control.gameState;
  });

  useEffect(() => {
    dispatch(readyGame({ row: 8, column: 8, mineCnt: 10 }));
  }, []);

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
