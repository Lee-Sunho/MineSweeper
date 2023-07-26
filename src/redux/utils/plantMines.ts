import { CellType } from "../../constants";

export const plantMines = (
  mines: number[],
  board: number[][],
  column: number
) => {
  const copyBoard = JSON.parse(JSON.stringify(board));
  for (let i = 0; i < mines.length; i++) {
    const r = Math.floor(mines[i] / column);
    const c = mines[i] % column;
    copyBoard[r][c] = CellType.MINE;
  }
  return copyBoard;
};
