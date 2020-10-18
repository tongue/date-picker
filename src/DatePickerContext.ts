import { Dispatch, createContext } from "react";
import {
  DatePickerState,
  DatePickerAction,
  datePickerIntitialState,
} from "./state";

export const DatePickerContext = createContext<{
  state: DatePickerState;
  dispatch: Dispatch<DatePickerAction>;
}>({
  state: datePickerIntitialState,
  dispatch: () => null,
});
