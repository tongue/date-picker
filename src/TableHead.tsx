import React, { FC } from "react";
import { useState } from "./hooks";
import { getDayNames } from "./utils";

interface TableHeadProps {
  weekLabel: string;
}

const TableHead: FC<TableHeadProps> = ({ weekLabel }) => {
  const {
    state: { showWeekNumber, printLongWeekdays, locale },
  } = useState();

  return (
    <thead>
      <tr>
        {showWeekNumber && <th scope="column">{weekLabel}</th>}
        {getDayNames(printLongWeekdays, locale).map((day) => (
          <th key={day} scope="column">
            {day}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
