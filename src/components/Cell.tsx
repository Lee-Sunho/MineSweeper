import styled from "styled-components";
import { CellType, GameState } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  openCell,
  openMine,
  startGame,
  toggleFlag,
} from "../redux/controlSlice";
import { RootState } from "../redux/configureStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faFlag } from "@fortawesome/free-solid-svg-icons";
import { defaultTheme } from "../style/theme";

const Button = styled.button<{ isOpened: boolean; isMine: boolean }>`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isOpened
      ? props.theme.lightgray
      : props.isMine
      ? props.theme.red
      : props.theme.darkgray};
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
      case CellType.MINE_CLICKED:
        return <FontAwesomeIcon icon={faBomb} />;
      case CellType.MINE_FLAG:
      case CellType.NORMAL_FLAG:
        return <FontAwesomeIcon icon={faFlag} color={defaultTheme.flag} />;
      default:
        return "";
    }
  };

  const onLeftClick = () => {
    if (gameState === GameState.LOSE) {
      return;
    }
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
        dispatch(openMine({ rowIndex, colIndex }));
        return;
      default:
        return;
    }
  };

  const onRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (gameState === GameState.LOSE) {
      return;
    }
    dispatch(toggleFlag({ rowIndex, colIndex }));
  };
  return (
    <Button
      onClick={onLeftClick}
      onContextMenu={onRightClick}
      isOpened={type === CellType.OPENED}
      isMine={type === CellType.MINE_CLICKED}
    >
      {getCellText()}
    </Button>
  );
};

export default Cell;
