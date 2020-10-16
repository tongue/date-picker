import React, { useEffect } from "react";
import { Locale } from "date-fns";
import { sv } from "date-fns/locale";
import { DatePickerProvider } from "./DatePickerContext";
import { useState } from "./hooks";
import SelectMonth from "./SelectMonth";
import SelectYear from "./SelectYear";
import ButtonMonth, { Direction } from "./ButtonMonth";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

export interface DatePickerProps {
  /**
   * Change handler, fires everytime a new date
   * has been selected.
   */
  onChange: (date: Date) => void;
  /**
   * First selectable date
   */
  start: Date;
  /**
   * Last selectable date
   */
  end: Date;
  /**
   * A `date-fns` locale object, which handles all
   * the translations of date names and layout
   * of a week. Defaults to Swedish.
   */
  locale: Locale;
  /**
   * Print long weekday names in the week grid
   */
  printLongWeekdays: boolean;
  /**
   * Hide week numbers in the month grid
   */
  showWeekNumber: boolean;

  nextMonthLabel: string;
  previousMonthLabel: string;
  weekLabel: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  start = new Date(),
  end = new Date(new Date().setFullYear(new Date().getFullYear() + 5)),
  locale = sv,
  printLongWeekdays = false,
  showWeekNumber = true,
  nextMonthLabel = "Nästa månad",
  previousMonthLabel = "Föregående månad",
  weekLabel = "V.",
}) => {
  const {
    state: { activeDate },
    reset,
  } = useState();

  useEffect(() => {
    reset({
      displayDate: start,
      start,
      end,
      locale,
      showWeekNumber,
      printLongWeekdays,
    });
  }, [reset, start, end, locale, showWeekNumber, printLongWeekdays]);

  useEffect(() => {
    if (activeDate) {
      onChange(activeDate);
    }
  }, [activeDate, onChange]);

  return (
    <DatePickerProvider>
      <div>
        <div>
          <ButtonMonth direction={Direction.Previous}>
            {previousMonthLabel}
          </ButtonMonth>
          <SelectYear />
          <SelectMonth />
          <ButtonMonth direction={Direction.Next}>{nextMonthLabel}</ButtonMonth>
        </div>
        <div>
          <table>
            <TableHead weekLabel={weekLabel} />
            <TableBody />
          </table>
        </div>
      </div>
    </DatePickerProvider>
  );
};

export default DatePicker;
