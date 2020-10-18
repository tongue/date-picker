import { useContext } from "react";
import { DatePickerContext } from "./DatePickerContext";
import { DatePickerState, ActionTypes } from "./state";

export const useState = () => {
  const { state, dispatch } = useContext(DatePickerContext);

  const reset = (payload: DatePickerState): void => {
    dispatch({ type: ActionTypes.Reset, payload });
  };

  const setDisplayDate = (displayDate: Date): void => {
    dispatch({ type: ActionTypes.SetDisplayDate, payload: { displayDate } });
  };

  const setActiveDate = (activeDate: Date): void => {
    dispatch({ type: ActionTypes.SetActiveDate, payload: { activeDate } });
  };

  return { state, reset, setDisplayDate, setActiveDate };
};
