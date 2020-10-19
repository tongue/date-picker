import { useContext } from "react";
import { DatePickerContext } from "./DatePickerContext";
import { DatePickerState, ActionTypes } from "./state";

// a hook that simplifies the use of our state reducer and access to our state.
export const useState = () => {
  // get the state and dispatch values from our DatePickerContext
  const { state, dispatch } = useContext(DatePickerContext);

  // a helper method for resetting the state of state with new values
  // that we provide in form of a DatePickerState object.
  const reset = (payload: DatePickerState): void => {
    dispatch({ type: ActionTypes.Reset, payload });
  };

  // a helper method for setting the display date (the current visible month).
  const setDisplayDate = (displayDate: Date): void => {
    dispatch({ type: ActionTypes.SetDisplayDate, payload: { displayDate } });
  };

  // a helper method for setting the actve date (the date the user has chosen).
  const setActiveDate = (activeDate: Date): void => {
    dispatch({ type: ActionTypes.SetActiveDate, payload: { activeDate } });
  };

  return { state, reset, setDisplayDate, setActiveDate };
};
