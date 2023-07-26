import { CellType } from "../../constants";

export const initBoard = (row: number, column: number) => {
  const board: number[][] = [];
  for (let i = 0; i < row; i++) {
    const data = [];
    for (let j = 0; j < column; j++) {
      data.push(CellType.NORMAL);
    }
    board.push(data);
  }
  return board;
};
