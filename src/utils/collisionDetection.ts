import { Position } from "../components/MovableBox/MovableBox";

type Range = {
  start: number;
  end: number;
};

const getIsNotCollidingFromRightSide = (
  firstRange: Range,
  secondRange: Range
) => firstRange.start > secondRange.end;

export const isColliding = (
  firstElement: Position,
  secondElement: Position
) => {
  const firstRange = {
    start: firstElement.left,
    end: firstElement.left + firstElement.width,
  };
  const secondRange = {
    start: secondElement.left,
    end: secondElement.left + secondElement.width,
  };

  if (getIsNotCollidingFromRightSide(firstRange, secondRange)) return false;
  if (getIsNotCollidingFromRightSide(secondRange, firstRange)) return false;
  return true;
};
