import { Dispatch, createContext } from "react";
import {
  DatePickerState,
  DatePickerAction,
  datePickerIntitialState,
} from "./state";

// Create a context for our date picker, that will be responsible
// to pass along the state and dispatch function used to update
// our state.
export const DatePickerContext = createContext<{
  state: DatePickerState;
  dispatch: Dispatch<DatePickerAction>;
}>({
  state: datePickerIntitialState,
  dispatch: () => null,
});
