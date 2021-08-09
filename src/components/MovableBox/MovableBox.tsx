import { FC } from "react";
import { Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";

const enableResizing = {
  top: false,
  right: true,
  bottom: true,
  left: true,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};

export type Position = { width: number; left: number };

export type MovableBoxProps = {
  position: Position;
  onChange: (position: Position) => void;
};

const MovableBox: FC<MovableBoxProps> = ({ children, onChange, position }) => {
  const onResize: RndResizeCallback = (_event, _dir, ref, _delta, position) => {
    const width = Number.parseInt(ref.style.width);
    const left = Math.round(position.x);
    onChange({ width, left });
  };
  const onDrag: RndDragCallback = (_event, data) => {
    const left = Math.round(data.x);
    onChange({ left, width: position.width });
  };

  return (
    <Rnd
      size={{ width: position.width, height: "initial" }}
      position={{ x: position.left, y: 0 }}
      onDrag={onDrag}
      onResize={onResize}
      dragAxis="x"
      bounds="parent"
      enableResizing={enableResizing}
    >
      {children}
    </Rnd>
  );
};

export default MovableBox;
