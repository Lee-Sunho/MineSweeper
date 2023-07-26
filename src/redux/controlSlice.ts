import { createSlice } from "@reduxjs/toolkit";
import { GameState, CellType } from "../constants";
import { initBoard } from "./utils/initBoard";
import { createMines } from "./utils/createMines";
import { plantMines } from "./utils/plantMines";
import { pair } from "./utils/checkAround";
import { checkAround } from "./utils/checkAround";

export interface IControlState {
  board: number[][];
  row: number;
  column: number;
  mineCnt: number;
  gameState: GameState;
  openedCnt: number;
}

const initialState: IControlState = {
  board: [],
  row: 0,
  column: 0,
  mineCnt: 0,
  gameState: GameState.READY,
  openedCnt: 0,
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
      state.gameState = GameState.READY;
      state.openedCnt = 0;
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
      state.gameState = GameState.RUN;
    },
    openCell: (state, action) => {
      const { rowIndex, colIndex } = action.payload;
      const visited: pair[] = [];

      const count = checkAround(state.board, rowIndex, colIndex, visited)!;
      state.openedCnt += count;

      if (state.openedCnt === state.row * state.column - state.mineCnt) {
        state.gameState = GameState.WIN;
      }
    },
    openMine: (state, action) => {
      state.board[action.payload.rowIndex][action.payload.colIndex] =
        CellType.MINE_CLICKED;
      state.gameState = GameState.LOSE;
    },
    toggleFlag: (state, action) => {
      const type =
        state.board[action.payload.rowIndex][action.payload.colIndex];
      if (type === CellType.MINE) {
        state.board[action.payload.rowIndex][action.payload.colIndex] =
          CellType.MINE_FLAG;
        return;
      }
      if (type === CellType.MINE_FLAG) {
        state.board[action.payload.rowIndex][action.payload.colIndex] =
          CellType.MINE;
        return;
      }
      if (type === CellType.NORMAL) {
        state.board[action.payload.rowIndex][action.payload.colIndex] =
          CellType.NORMAL_FLAG;
        return;
      }
      if (type === CellType.NORMAL_FLAG) {
        state.board[action.payload.rowIndex][action.payload.colIndex] =
          CellType.NORMAL;
        return;
      }
    },
  },
});
export const { readyGame, startGame, openCell, openMine, toggleFlag } =
  controlSlice.actions;
export default controlSlice.reducer;
