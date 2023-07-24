export enum GameState {
  READY = "READY",
  RUN = "RUN",
  WIN = "WIN",
  LOSE = "LOSE",
}

export enum CellType {
  NORMAL = 0,
  OPENED = -1,
  NORMAL_FLAG = -2,
  MINE = -3,
  MINE_FLAG = -4,
}
