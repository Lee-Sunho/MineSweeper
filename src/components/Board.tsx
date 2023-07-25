import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { readyGame, startGame } from "../redux/controlSlice";
import Cell from "./Cell";
import { RootState } from "../redux/configureStore";
import { styled } from "styled-components";

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

const Board = () => {
  const dispatch = useDispatch();
  const board = useSelector<RootState, number[][]>((state) => {
    return state.control.board;
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
    </Wrapper>
  );
};

export default Board;
