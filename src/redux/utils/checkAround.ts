import { CellType } from "../../constants";

export interface pair {
  rowIndex: number;
  colIndex: number;
}

export const checkAround = (
  board: number[][],
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
  // 주변 지뢰 개수 카운트
  const count = around.filter((v) =>
    [CellType.MINE, CellType.MINE_FLAG].includes(v)
  ).length;

  if (board[rowIndex][colIndex] === CellType.NORMAL) {
    cnt++;
  }

  // 현재 칸에 주변 지뢰 개수 표시
  if (count !== undefined) {
    board[rowIndex][colIndex] = count;
  }

  // 현재 칸 주변에 지뢰가 없을 시 주변 한 번에 여는 로직
  if (count === 0) {
    const near: pair[] = [];
    if (rowIndex - 1 > -1) {
      // 자신 기준 상단 row가 있는 경우
      near.push({ rowIndex: rowIndex - 1, colIndex: colIndex - 1 });
      near.push({ rowIndex: rowIndex - 1, colIndex: colIndex });
      near.push({ rowIndex: rowIndex - 1, colIndex: colIndex + 1 });
    }
    near.push({ rowIndex, colIndex: colIndex - 1 });
    near.push({ rowIndex, colIndex: colIndex + 1 });
    if (rowIndex + 1 < board.length) {
      // 자신 기준 하단 row가 있는 경우
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
  // 재귀 함수를 통해 연쇄적으로 오픈한 칸의 개수를 리턴하여 openedCnt에 더한다
  return cnt;
};
