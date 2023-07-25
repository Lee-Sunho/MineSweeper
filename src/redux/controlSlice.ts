import { createSlice } from "@reduxjs/toolkit";
import { GameState, CellType } from "../constants";

export interface IControlState {
  board: number[][];
  row: number;
  column: number;
  mineCnt: number;
  gameState: GameState;
}

const initialState: IControlState = {
  board: [],
  row: 0,
  column: 0,
  mineCnt: 0,
  gameState: GameState.READY,
};

const initBoard = (row: number, column: number) => {
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

const createMines = (
  row: number,
  column: number,
  mineCnt: number,
  startPosition: number
) => {
  const candidates = Array(row * column)
    .fill(undefined)
    .map((value, i) => {
      return i; // 0부터 배열의 길이 - 1까지 채워진 배열
    });
  const shuffle = [];
  while (candidates.length > row * column - mineCnt) {
    const chosen = candidates.splice(
      Math.floor(Math.random() * candidates.length),
      1
    )[0]; // 뽑힌 숫자는 제거
    if (chosen !== startPosition) {
      // 첫 클릭 시 지뢰 아니도록
      shuffle.push(chosen);
    }
  }
  return shuffle;
};

const plantMines = (mines: number[], board: number[][], column: number) => {
  const copyBoard = JSON.parse(JSON.stringify(board));
  for (let i = 0; i < mines.length; i++) {
    const r = Math.floor(mines[i] / column);
    const c = mines[i] % column;
    copyBoard[r][c] = CellType.MINE;
  }
  return copyBoard;
};

const controlSlice = createSlice({
  name: "controlSlice",
  initialState,
  reducers: {
    readyGame: (state, action) => {
      state.board = initBoard(action.payload.row, action.payload.column);
      state.row = action.payload.row;
      state.column = action.payload.column;
      state.mineCnt = action.payload.mineCnt;
    },
    startGame: (state, action) => {
      state.board = plantMines(
        createMines(
          state.row,
          state.column,
          state.mineCnt,
          action.payload.startPosition
        ),
        state.board,
        state.column
      );
      console.log(state.board);
    },
  },
});
export const { readyGame, startGame } = controlSlice.actions;
export default controlSlice.reducer;
