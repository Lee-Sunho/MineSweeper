import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { readyGame, startGame } from "../redux/controlSlice";

const Board = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readyGame({ row: 8, column: 8, mineCnt: 10 }));
    dispatch(startGame({ startPosition: 0 }));
  });

  return null;
};

export default Board;
