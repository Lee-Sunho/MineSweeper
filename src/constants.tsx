export enum GameState {
  READY = "READY",
  RUN = "RUN",
  WIN = "WIN",
  LOSE = "LOSE",
}

export enum CellType {
  OPENED = 0,
  NORMAL = -1,
  NORMAL_FLAG = -2,
  MINE = -3,
  MINE_FLAG = -4,
}
