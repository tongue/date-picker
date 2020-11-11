import React, { useEffect, useReducer } from "react";
import { Locale } from "./locale";
import {
  DatePickerStateContext,
  DatePickerDispatchContext,
  datePickerReducer,
} from "./state";
import {
  WeekdayFormat,
  CalendarType,
  datePickerDefaultOptions,
  DatePickerOptionsContext,
  DatePickerOptions,
} from "./options";
import Controls from "./Controls";
import Calendar from "./Calendar";
import styles from "./DatePicker.module.css";
import { deepmerge, filterUndefinedProperties } from "./utils";

export interface DatePickerProps {
  /**
   * Change handler, fires everytime a new date is selected.
   */
  onChange: (date: Date) => void;
  /**
   * First selectable date. Defaults to todays date.
   */
  start?: Date;
  /**
   * Last selectable date. Defaults to todays date plus 5 years
   */
  end?: Date;
  /**
   * A object with for translations and format of static texts
   */
  locale?: Locale;
  /**
   * Weekday name format. Defaults to full weekday names.
   */
  weekdayFormat?: WeekdayFormat;
  /**
   * Type of calendar. Defaults to everything visible
   *  TODO: Maybe calendarLabels ROW | COLUMN | ROW|COLUMN[]
   */
  calendarType?: CalendarType;
}

const DatePicker: React.VFC<DatePickerProps> = ({ onChange, ...props }) => {
  // merge the initialstate with our incoming props
  const options: DatePickerOptions = deepmerge(
    datePickerDefaultOptions,
    filterUndefinedProperties(props)
  );

  const [state, dispatch] = useReducer(datePickerReducer, {
    displayDate: options.start,
  });

  // if activeDate ever changes and it's changed to a value that is not
  // undefined. We call the onChange method passing along the activeDate.
  useEffect(() => {
    if (state.activeDate) {
      onChange(state.activeDate);
    }
  }, [state.activeDate, onChange]);

  return (
    <DatePickerOptionsContext.Provider value={options}>
      <DatePickerStateContext.Provider value={state}>
        <DatePickerDispatchContext.Provider value={dispatch}>
          <div className={styles.DatePicker}>
            <Controls />
            <Calendar />
          </div>
        </DatePickerDispatchContext.Provider>
      </DatePickerStateContext.Provider>
    </DatePickerOptionsContext.Provider>
  );
};

export default DatePicker;
