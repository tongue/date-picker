import { useContext, createContext } from "react";
import { addYears } from "date-fns";
import { sv, Locale } from "./locale";

export enum WeekdayFormats {
  OneCharacter = "ONE_CHARACTER",
  TwoCharacters = "TWO_CHARACTERS",
  ThreeCharacters = "THREE_CHARACTERS",
  AllCharacters = "ALL_CHARACTERS",
}

export type WeekdayFormat =
  | "ONE_CHARACTER"
  | "TWO_CHARACTERS"
  | "THREE_CHARACTERS"
  | "ALL_CHARACTERS";

// These are the current possible actions we can perform on our state
export enum ActionTypes {
  SetDisplayDate = "SET_DISPLAY_DATE",
  SetActiveDate = "SET_ACTIVE_DATE",
}

// TODO: Maybe it should be an array of types or a single value:
// ex: "WITH_WEEK" || ["WITH_WEEK", "WITH_DAY_NAME"]
export type CalendarType =
  | "DEFAULT"
  | "WITHOUT_WEEK_NUMBER"
  | "WITHOUT_DAY_NAME"
  | "WITHOUT_WEEK_NUMBER_AND_DAY_NAME";

export enum CalendarTypes {
  Default = "DEFAULT",
  WithoutWeekNumber = "WITHOUT_WEEK_NUMBER",
  WithoutDayName = "WITHOUT_DAY_NAME",
  WithoutWeekNumberAndDayName = "WITHOUT_WEEK_NUMBER_AND_DAY_NAME",
}

export type DatePickerOptions = {
  start: Date;
  end: Date;
  locale: Locale;
  calendarType: CalendarType;
  weekdayFormat: WeekdayFormat;
};

// the default state of our app, will most likely always be overwritten
export const datePickerDefaultOptions: DatePickerOptions = {
  start: new Date(),
  end: addYears(new Date(), 5),
  locale: sv,
  calendarType: CalendarTypes.Default,
  weekdayFormat: WeekdayFormats.AllCharacters,
};

// We create two contexts for our state management, one for our state object
// and one for our event dispatcher.
// Based on: https://kentcdodds.com/blog/how-to-use-react-context-effectively
export const DatePickerOptionsContext = createContext<DatePickerOptions>(
  datePickerDefaultOptions
);

// a simple hook that gives us our current state object
export const useOptions = (): DatePickerOptions => {
  const options = useContext(DatePickerOptionsContext);

  return options;
};
