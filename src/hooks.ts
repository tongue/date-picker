import { useContext } from "react";
import {
  DatePickerContext,
  DatePickerState,
  ActionTypes,
} from "./DatePickerContext";

export const useState = () => {
  const { state, dispatch } = useContext(DatePickerContext);

  const reset = (payload: DatePickerState): void => {
    dispatch({ type: ActionTypes.Reset, payload });
  };

  const setDisplayDate = (displayDate: Date): void => {
    dispatch({ type: ActionTypes.SetDisplayDate, payload: { displayDate } });
  };

  return { state, reset, setDisplayDate };
};
