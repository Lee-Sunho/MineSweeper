import { styled } from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { readyGame } from "../redux/controlSlice";
import { useDispatch } from "react-redux";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 8px;
  gap: 8px;
`;

const Button = styled.button<{ clicked: boolean }>`
  flex-grow: 1;
  background-color: ${(props) =>
    props.clicked ? props.theme.darkblue : props.theme.darkgray};
`;

const DifficultyBox = () => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState("Beginner");

  useEffect(() => {
    dispatch(readyGame({ row: 8, column: 8, mineCnt: 10 }));
  }, []);
  return (
    <Wrapper>
      <Button
        onClick={(e) => {
          setClicked(e.currentTarget.value);
          dispatch(readyGame({ row: 8, column: 8, mineCnt: 10 }));
        }}
        clicked={clicked === "Beginner"}
        value={"Beginner"}
      >
        Beginner
      </Button>
      <Button
        onClick={(e) => {
          setClicked(e.currentTarget.value);
          dispatch(readyGame({ row: 16, column: 16, mineCnt: 40 }));
        }}
        clicked={clicked === "Intermediate"}
        value={"Intermediate"}
      >
        Intermediate
      </Button>
      <Button
        onClick={(e) => {
          setClicked(e.currentTarget.value);
          dispatch(readyGame({ row: 16, column: 32, mineCnt: 100 }));
        }}
        clicked={clicked === "Expert"}
        value={"Expert"}
      >
        Expert
      </Button>
    </Wrapper>
  );
};

export default DifficultyBox;
