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
  },
});
export const { readyGame } = controlSlice.actions;
export default controlSlice.reducer;
