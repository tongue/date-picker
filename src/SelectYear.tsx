import React, { FC } from "react";
import { getYear, setYear, eachYearOfInterval } from "date-fns";
import { useState } from "./hooks";

const SelectYear: FC = () => {
  const {
    state: { displayDate, start, end },
    setDisplayDate,
  } = useState();

  // an array of Date objects for all the available years within the
  // start and end dates. If the start and end dates year is the same, we return
  // the start date in an array
  const selectableYears =
    getYear(start) === getYear(end)
      ? [start]
      : eachYearOfInterval({
          start,
          end,
        });

  const onChange = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    setDisplayDate(
      setYear(displayDate, parseInt(event.currentTarget.value, 10))
    );
  };

  return (
    <select
      name="year"
      disabled={selectableYears.length < 2}
      onChange={onChange}
      value={getYear(displayDate)}
    >
      {selectableYears.map((year) => (
        <option key={getYear(year)} value={getYear(year)}>
          {getYear(year)}
        </option>
      ))}
    </select>
  );
};

export default SelectYear;
