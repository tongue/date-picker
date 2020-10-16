import React, { FC, ReactNode } from "react";
import { addMonths, subMonths } from "date-fns";
import { useState } from "./hooks";

export enum Direction {
  Next,
  Previous,
}

interface ButtonMonthProps {
  children: ReactNode;
  direction: Direction;
}

const ButtonMonth: FC<ButtonMonthProps> = ({ children, direction }) => {
  const {
    state: { displayDate },
    setDisplayDate,
  } = useState();

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    switch (parseInt(event.currentTarget.value, 10)) {
      case Direction.Previous:
        setDisplayDate(subMonths(displayDate, 1));
        break;
      case Direction.Next:
        setDisplayDate(addMonths(displayDate, 1));
        break;
    }
  };

  return (
    <button value={direction} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonMonth;
