import React, { FC } from "react";
import {
  endOfMonth,
  getMonth,
  setMonth,
  isWithinInterval,
  startOfMonth,
  format,
  eachMonthOfInterval,
  startOfYear,
  endOfYear,
} from "date-fns";
import { useState } from "./hooks";

const SelectMonth: FC = () => {
  const {
    state: { displayDate, start, end, locale },
    setDisplayDate,
  } = useState();

  // Get all the months in the year of the current date
  const monthsInYear: Date[] = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date()),
  });

  const onChange = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    setDisplayDate(
      setMonth(displayDate, parseInt(event.currentTarget.value, 10))
    );
  };

  return (
    <select name="month" onChange={onChange} value={getMonth(displayDate)}>
      {monthsInYear.map((month) => (
        <option
          key={month.toDateString()}
          value={getMonth(month)}
          disabled={
            !isWithinInterval(month, {
              start: startOfMonth(start),
              end: endOfMonth(end),
            })
          }
        >
          {format(month, "MMMM", { locale })}
        </option>
      ))}
    </select>
  );
};

export default SelectMonth;
