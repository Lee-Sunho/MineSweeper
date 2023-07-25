import styled from "styled-components";
import { CellType, GameState } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { openCell, openBomb, startGame } from "../redux/controlSlice";
import { RootState } from "../redux/configureStore";

const Button = styled.button<{ isOpened: boolean }>`
  width: 25px;
  height: 25px;
  background-color: ${(props) =>
    props.isOpened ? props.theme.lightgray : props.theme.darkgray};
`;

interface IProps {
  type: CellType;
  rowIndex: number;
  colIndex: number;
}

const Cell = ({ type, rowIndex, colIndex }: IProps) => {
  const dispatch = useDispatch();
  const gameState = useSelector<RootState, GameState>((state) => {
    return state.control.gameState;
  });
  const colCnt = useSelector<RootState, number>((state) => {
    return state.control.column;
  });

  const getCellText = () => {
    switch (type) {
      case CellType.MINE:
        return "X";

      default:
        return "";
    }
  };

  const onClick = () => {
    if (gameState === GameState.READY) {
      dispatch(startGame(rowIndex * colCnt + colIndex));
      return;
    }

    switch (type) {
      case CellType.NORMAL: {
        dispatch(openCell({ rowIndex, colIndex }));
        return;
      }

      case CellType.MINE:
        dispatch(openBomb({ rowIndex, colIndex }));
        return;
      default:
        return;
    }
  };
  return (
    <Button onClick={onClick} isOpened={type === CellType.OPENED}>
      {getCellText()}
    </Button>
  );
};

export default Cell;
