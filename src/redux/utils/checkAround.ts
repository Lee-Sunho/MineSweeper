import { CellType } from "../../constants";

export interface pair {
  rowIndex: number;
  colIndex: number;
}

export const checkAround = (
  board: number[][],
  //openedCnt: number,
  rowIndex: number,
  colIndex: number,
  visited: pair[]
): number | undefined => {
  let cnt = 0;
  if (
    rowIndex < 0 ||
    rowIndex >= board.length ||
    colIndex < 0 ||
    colIndex >= board[0].length
  ) {
    return;
  }
  if (
    [CellType.OPENED, CellType.NORMAL_FLAG, CellType.MINE_FLAG].includes(
      board[rowIndex][colIndex]
    )
  ) {
    return;
  }
  if (visited.includes({ rowIndex, colIndex })) {
    return;
  }

  visited.push({ rowIndex, colIndex });
  let around: number[] = [];
  if (board[rowIndex - 1]) {
    // 자신 기준 상단 row가 있는 경우
    around.push(board[rowIndex - 1][colIndex - 1]);
    around.push(board[rowIndex - 1][colIndex]);
    around.push(board[rowIndex - 1][colIndex + 1]);
  }
  around.push(board[rowIndex][colIndex - 1]);
  around.push(board[rowIndex][colIndex + 1]);
  if (board[rowIndex + 1]) {
    // 자신 기준 하단 row가 있는 경우
    around.push(board[rowIndex + 1][colIndex - 1]);
    around.push(board[rowIndex + 1][colIndex]);
    around.push(board[rowIndex + 1][colIndex + 1]);
  }
  const count = around.filter((v) =>
    [CellType.MINE, CellType.MINE_FLAG].includes(v)
  ).length;

  if (board[rowIndex][colIndex] === CellType.NORMAL) {
    cnt++;
  }

  if (count !== undefined) {
    board[rowIndex][colIndex] = count;
  }

  if (count === 0) {
    const near: pair[] = [];
    if (rowIndex - 1 > -1) {
      near.push({ rowIndex: rowIndex - 1, colIndex: colIndex - 1 });
      near.push({ rowIndex: rowIndex - 1, colIndex: colIndex });
      near.push({ rowIndex: rowIndex - 1, colIndex: colIndex + 1 });
    }
    near.push({ rowIndex, colIndex: colIndex - 1 });
    near.push({ rowIndex, colIndex: colIndex + 1 });
    if (rowIndex + 1 < board.length) {
      near.push({ rowIndex: rowIndex + 1, colIndex: colIndex - 1 });
      near.push({ rowIndex: rowIndex + 1, colIndex: colIndex });
      near.push({ rowIndex: rowIndex + 1, colIndex: colIndex + 1 });
    }

    near.forEach((cell) => {
      if (board[cell.rowIndex][cell.colIndex] !== CellType.OPENED) {
        const result = checkAround(
          board,
          cell.rowIndex,
          cell.colIndex,
          visited
        )!;
        if (result) {
          cnt += result;
        }
      }
    });
  }
  return cnt;
};
