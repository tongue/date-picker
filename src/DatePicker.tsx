import React, { useEffect, useReducer } from "react";
import { Locale } from "date-fns";
import { sv } from "date-fns/locale";
import { DatePickerContext } from "./DatePickerContext";
import { datePickerReducer } from "./state";
import Controls from "./Controls";
import Calendar from "./Calendar";
import styles from "./DatePicker.module.css";

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
  /**
   * Use transitions or not
   */
  transitions: boolean;
  /**
   * Label for next month button
   */
  nextMonthLabel: string;
  /**
   * Label for previous month button
   */
  previousMonthLabel: string;
  /**
   * Label week column in calendar
   */
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
  transitions = true,
}) => {
  const [state, dispatch] = useReducer(datePickerReducer, {
    displayDate: start,
    start,
    end,
    locale,
    printLongWeekdays,
    showWeekNumber,
    transitions,
    activeDate: undefined,
  });

  useEffect(() => {
    if (state.activeDate) {
      onChange(state.activeDate);
    }
  }, [state.activeDate, onChange]);

  return (
    <DatePickerContext.Provider value={{ state, dispatch }}>
      <div className={styles.DatePicker}>
        <Controls
          nextMonthLabel={nextMonthLabel}
          previousMonthLabel={previousMonthLabel}
        />
        <Calendar weekLabel={weekLabel} />
      </div>
    </DatePickerContext.Provider>
  );
};

export default DatePicker;
