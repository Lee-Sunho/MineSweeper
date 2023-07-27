import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { readyGame } from "../redux/controlSlice";

const Wrapper = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: center;
  padding: 2px;
  //border: 1px solid ${(props) => props.theme.darkgray};
  gap: 2px;
  //background-color: ${(props) => props.theme.sand};
`;

const Input = styled.input`
  width: 80px;
  margin-bottom: 4px;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.red};
  color: white;
`;

const CustomBox = () => {
  const dispatch = useDispatch();
  const [row, setRow] = useState<number>();
  const [column, setColumn] = useState<number>();
  const [mine, setMine] = useState<number>();

  const onChangeRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRow(Number(e.target.value));
  };

  const onChangeColumn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumn(Number(e.target.value));
  };

  const onChangeMine = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMine(Number(e.target.value));
  };

  const onClickBtn = () => {
    dispatch(readyGame({ row, column, mineCnt: mine }));
  };

  return (
    <Wrapper>
      <Input
        min={0}
        max={50}
        type="number"
        placeholder="행"
        value={row}
        onChange={onChangeRow}
      />
      <Input
        min={0}
        max={50}
        type="number"
        placeholder="열"
        value={column}
        onChange={onChangeColumn}
      />
      <Input
        min={0}
        max={1000}
        type="number"
        placeholder="지뢰 수"
        value={mine}
        onChange={onChangeMine}
      />
      <Button onClick={onClickBtn}>Custom</Button>
    </Wrapper>
  );
};

export default CustomBox;
