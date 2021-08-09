import { useState } from "react";
import styled from "styled-components";
import TimelineSvg from "../assets/timeline-background.svg";
import colors from "../theme/color";
import MovableBox, { MovableBoxProps, Position } from "./MovableBox/MovableBox";
import { isColliding } from "../utils/collisionDetection";

const TimelineWrapper = styled.div`
  padding: 32px;
`;

const Card = styled.div`
  background-color: ${colors.red};
  border-radius: 20px;
  color: ${colors.white};
  justify-content: center;
  align-items: center;
  display: flex;
`;

const TimelineBackround = styled.img.attrs({
  src: TimelineSvg,
  draggable: false,
})`
  position: absolute;
  height: 100%;
`;

const Container = styled.div`
  height: 6rem;
  position: relative;
`;

// TODO: make this more responsive
const TOTAL_WIDTH = 1067;

const SpaceWrapper = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  width: ${TOTAL_WIDTH}px;
  height: 4rem;
`;

const sum = (numbers: number[]) => numbers.reduce((a, b) => a + b, 0);
const scale = (value: number) => Math.round(value * TOTAL_WIDTH);
const scaleDown = (value: number) =>
  Math.round((value * 1000) / TOTAL_WIDTH) / 1000;

const getItems = (state: number[]) => {
  const items: Position[] = [];

  for (let i = 0; i < state.length; i++) {
    const isCard = i % 2 !== 0;

    if (!isCard) continue;

    const width = state[i];
    const left = sum(state.slice(0, i));

    items.push({ width, left });
  }

  return items;
};

const useHorizontalLayout = () => {
  const [state, setState] = useState<number[]>([0.2, 0.2, 0.2, 0.2, 0.2]);

  return {
    state,
    change: (index: number, candidateElement: Position) => {
      const newState = [...state];

      newState.splice(
        index - 1,
        3,
        state[index - 1] + state[index] + state[index + 1]
      );

      const isInvalid = getItems(newState).some((element, index) =>
        isColliding(element, candidateElement)
      );

      if (isInvalid) return;

      const replaceAt = newState.findIndex(
        (_, index) => sum(newState.slice(0, index + 1)) > candidateElement.left
      );

      const beforeSpace =
        candidateElement.left - sum(newState.slice(0, replaceAt));

      const afterSpace =
        sum(newState.slice(0, replaceAt + 1)) -
        (candidateElement.width + candidateElement.left);

      newState.splice(
        replaceAt,
        1,
        beforeSpace,
        candidateElement.width,
        afterSpace
      );

      setState(newState);
    },
  };
};

const Timeline = () => {
  const { change, state } = useHorizontalLayout();

  const itemPositions = getItems(state).map(({ left, width }, index) => ({
    index: 2 * index + 1,
    position: {
      left: scale(left),
      width: scale(width),
    },
  }));

  const onChange =
    (index: number): MovableBoxProps["onChange"] =>
    (position) => {
      change(index, {
        width: scaleDown(position.width),
        left: scaleDown(position.left),
      });
    };

  return (
    <TimelineWrapper>
      <Container>
        <TimelineBackround />

        <SpaceWrapper>
          {itemPositions.map(({ position, index }) => (
            <MovableBox position={position} onChange={onChange(index)}>
              <Card>WAYN-12312</Card>
            </MovableBox>
          ))}
        </SpaceWrapper>
      </Container>
    </TimelineWrapper>
  );
};

export default Timeline;
