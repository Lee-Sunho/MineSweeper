export const createMines = (
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
