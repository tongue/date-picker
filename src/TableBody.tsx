import React, { FC } from "react";
import {
  setDay,
  getDay,
  getWeek,
  isWithinInterval,
  eachWeekOfInterval,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { useState } from "./hooks";
import { getDaysOfMonthByWeek, formatDayNumber } from "./utils";

const TableBody: FC = () => {
  const {
    state: { showWeekNumber, displayDate, start, end },
  } = useState();

  // an array where that contains arrays that represents each week
  // of the the month, each week array contains all the days of that week.
  // ex: `[[Date, Date, Date, Date, Date, Date, Date], [Date, Date, Date ...], ...]`
  // First we get an array of Date objects for each week within our wanted month.
  // So it looks something like this: [`Date`, `Date`, `Date`, `Date`]
  // We then iterate (map) over that array converting the `Date` object
  // to an array of all the days within the week Date object that we get
  // for each iteration. So we get an array that looks like this
  // `[[Date, Date, ...], [Date, Date, ...], [Date, Date, ...], [Date, Date, ...]]
  const daysOfMonthByWeek = eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  }).map((week) =>
    eachDayOfInterval({ start: startOfWeek(week), end: endOfWeek(week) })
  );

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newDate = setDay(
      displayDate,
      parseInt(event.currentTarget.value, 10)
    );
  };

  return (
    <tbody>
      {getDaysOfMonthByWeek(displayDate).map((daysOfWeek) => (
        <tr key={getWeek(daysOfWeek[0])}>
          {showWeekNumber && <th scope="row">{getWeek(daysOfWeek[0])}</th>}
          {daysOfWeek.map((day) => (
            <td key={getDay(day)}>
              <button
                onClick={onClick}
                value={getDay(day)}
                disabled={
                  !isWithinInterval(day, {
                    start,
                    end,
                  })
                }
              >
                {formatDayNumber(day)}
              </button>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
