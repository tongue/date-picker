import React, { FC } from "react";
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
import { useState } from "./state";
import { useOptions } from "./options";

export enum Month {
  Increment,
  Decrement,
}

export type SelectOption = {
  value: string | number;
  disabled?: boolean;
  children: string | number;
};

const Controls: FC = () => {
  // we use our custom hook `useState` which exposes our component state and a
  // function to update the `displayDate`
  const [{ displayDate }, { setDisplayDate }] = useState();
  const { start, end, locale } = useOptions();
  console.log(start, end);

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

  // take all the months in the year of the current date then iterate (map)
  // over all those months, creating a new object where we describe our select
  // options.
  const monthOptions: SelectOption[] = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date()),
  }).map((month: Date) => ({
    value: getMonth(month),
    disabled: !isWithinInterval(month, monthInterval),
    children: format(month, "MMMM", { locale: locale.dateFns }),
  }));

  const isWithinMonth = (date: Date): Boolean =>
    isWithinInterval(date, monthInterval);

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
        disabled={!isWithinMonth(subMonths(displayDate, 1))}
      >
        {locale.previousMonth}
      </button>
      <select
        name="year"
        onChange={onYearChange}
        value={getYear(displayDate)}
        disabled={yearOptions.length < 2}
      >
        {yearOptions.map((option) => (
          <option key={option.value} {...option} />
        ))}
      </select>
      <select
        name="month"
        onChange={onMonthChange}
        value={getMonth(displayDate)}
      >
        {monthOptions.map((option) => (
          <option key={option.value} {...option} />
        ))}
      </select>
      <button
        value={Month.Increment}
        onClick={onButtonClick}
        disabled={!isWithinMonth(addMonths(displayDate, 1))}
      >
        {locale.nextMonth}
      </button>
    </div>
  );
};

export default Controls;
