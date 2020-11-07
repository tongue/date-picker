import { useContext } from "react";
import { sv } from "date-fns/locale";
import { DatePickerContext } from "./DatePickerContext";

export enum WeekdayFormatOptions {
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
  Reset = "RESET",
  SetDisplayDate = "SET_DISPLAY_DATE",
  SetActiveDate = "SET_ACTIVE_DATE",
}

export enum CalendarType {
  Default,
  WithoutWeekNumber,
  WithoutDayName,
  WithoutWeekNumberAndDayName,
}

export type DatePickerState = {
  start: Date;
  end: Date;
  locale: Locale;
  displayDate: Date;
  activeDate?: Date;
  calendarType: CalendarType;
  transitions: boolean;
  weekdayFormat: WeekdayFormat;
};

// In our actions we use whats called "Discriminating Unions".
// Which in its simples form is a type check where we can set
// different expected types based on certain values.
// So depending on what "type" of action you want to perform
// the typechecker knows which "payload" to expect.

// The reset action is used to reset all the datepicker props to new values
type ActionReset = {
  type: ActionTypes.Reset;
  payload: DatePickerState;
};

// The setDisplayDate action is used to set the current displayDate
type ActionSetDisplayDate = {
  type: ActionTypes.SetDisplayDate;
  payload: {
    displayDate: Date;
  };
};

// The setActiveDate action is used to set the current activeDate
type ActionSetActiveDate = {
  type: ActionTypes.SetActiveDate;
  payload: {
    activeDate: Date;
  };
};

// combine all our action types to one union action type.
export type DatePickerAction =
  | ActionReset
  | ActionSetDisplayDate
  | ActionSetActiveDate;

// the default state of our app, will most likely always be overwritten
export const datePickerIntitialState: DatePickerState = {
  displayDate: new Date(),
  start: new Date(),
  end: new Date(),
  locale: sv,
  calendarType: CalendarType.Default,
  weekdayFormat: "ALL_CHARACTERS",
  transitions: false,
  activeDate: undefined,
};

// This is our state management reducer.
// The reducer is completely based around "immutability", it performs
// actions upon our state, but it never mutates the state. It always returns
// a new copy of our modified state instead.
// We do this because we don't want anybody to change our state without
// using our set actions. And thusly making statemanagent more clear in the
// long run as our component grows.
export const datePickerReducer = (
  state: DatePickerState,
  action: DatePickerAction
): DatePickerState => {
  // So based on what action we recieve (you can think of actions like events or messages),
  // we will create a new object spread out the old state object in that new object.
  // And the overwrite the values that we need to change depending on the action.
  // And so we have created a new object with all the state properties with the update
  // we wanted. But we have not mutated the previous version of the state. So that
  // is still accessible to us. If we want to do something with it.
  switch (action.type) {
    case ActionTypes.Reset:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.SetDisplayDate:
      return {
        ...state,
        displayDate: action.payload.displayDate,
      };
    case ActionTypes.SetActiveDate:
      return {
        ...state,
        activeDate: action.payload.activeDate,
      };
    default:
      return state;
  }
};

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
