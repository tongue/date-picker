import React, { FC } from "react";
import Select, { SelectOption } from "./Select";
import {
  getYear,
  setYear,
  eachYearOfInterval,
  endOfMonth,
  getMonth,
  setMonth,
  isWithinInterval,
  startOfMonth,
  format,
  eachMonthOfInterval,
  startOfYear,
  endOfYear,
  addMonths,
  subMonths,
} from "date-fns";
import { useState } from "./hooks";

export enum Month {
  Increment,
  Decrement,
}

interface ControlsProps {
  nextMonthLabel: string;
  previousMonthLabel: string;
}

const Controls: FC<ControlsProps> = ({
  nextMonthLabel,
  previousMonthLabel,
}) => {
  // we use our custom hook `useState` which exposes our component state
  // and a function to update the `displayDate`
  const {
    state: { displayDate, start, end, locale },
    setDisplayDate,
  } = useState();

  // take all years within the interval of our start and end dates.
  // iterate (map) over that and describe our select options with it.
  const yearOptions: SelectOption[] = eachYearOfInterval({
    start: startOfYear(start),
    end: endOfYear(end),
  }).map((year) => ({
    value: getYear(year),
    children: getYear(year),
  }));

  const monthInterval = {
    start: startOfMonth(start),
    end: endOfMonth(end),
  };

  // take all the months in the year of the current date
  // then iterate (map) over all those months, creating a new object
  // where we describe our select options.
  const monthOptions: SelectOption[] = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date()),
  }).map((month: Date) => ({
    value: getMonth(month),
    disabled: !isWithinInterval(month, monthInterval),
    children: format(month, "MMMM", { locale }),
  }));

  const onYearChange = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    setDisplayDate(
      setYear(displayDate, parseInt(event.currentTarget.value, 10))
    );
  };

  const onMonthChange = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    setDisplayDate(
      setMonth(displayDate, parseInt(event.currentTarget.value, 10))
    );
  };

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    switch (parseInt(event.currentTarget.value, 10)) {
      case Month.Decrement:
        setDisplayDate(subMonths(displayDate, 1));
        break;
      case Month.Increment:
        setDisplayDate(addMonths(displayDate, 1));
        break;
    }
  };

  return (
    <div>
      <button
        value={Month.Decrement}
        onClick={onButtonClick}
        disabled={!isWithinInterval(subMonths(displayDate, 1), monthInterval)}
      >
        {previousMonthLabel}
      </button>
      <Select
        name="year"
        disabled={yearOptions.length < 2}
        onChange={onYearChange}
        value={getYear(displayDate)}
        options={yearOptions}
      />
      <Select
        name="month"
        onChange={onMonthChange}
        value={getMonth(displayDate)}
        options={monthOptions}
      />
      <button
        value={Month.Increment}
        onClick={onButtonClick}
        disabled={!isWithinInterval(addMonths(displayDate, 1), monthInterval)}
      >
        {nextMonthLabel}
      </button>
    </div>
  );
};

export default Controls;
