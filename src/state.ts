import { useContext, createContext, Dispatch } from "react";

export type DatePickerState = {
  displayDate: Date;
  activeDate?: Date;
};

// These are the current possible actions we can perform on our state
export enum ActionTypes {
  SetDisplayDate = "SET_DISPLAY_DATE",
  SetActiveDate = "SET_ACTIVE_DATE",
}

// In our actions we use whats called "Discriminating Unions".
// Which in its simples form is a type check where we can set
// different expected types based on certain values.
// So depending on what "type" of action you want to perform
// the typechecker knows which "payload" to expect.

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
export type DatePickerAction = ActionSetDisplayDate | ActionSetActiveDate;

// the default state of our app, will most likely always be overwritten
export const datePickerIntitialState: DatePickerState = {
  displayDate: new Date(),
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

// We create two contexts for our state management, one for our state object
// and one for our event dispatcher.
// Based on: https://kentcdodds.com/blog/how-to-use-react-context-effectively
export const DatePickerStateContext = createContext<DatePickerState>(
  datePickerIntitialState
);

export const DatePickerDispatchContext = createContext<
  Dispatch<DatePickerAction>
>(() => null);

// a simple hook that gives us our current state object
export const useDatePickerState = (): DatePickerState => {
  const state = useContext(DatePickerStateContext);

  return state;
};

type DatePickerDispatches = {
  setDisplayDate: (displayDate: Date) => void;
  setActiveDate: (activeDate: Date) => void;
};

// a hook that handles our state
export const useDatePickerDispatch = (): DatePickerDispatches => {
  // get the state and dispatch values from our DatePickerContext
  const dispatch = useContext(DatePickerDispatchContext);

  // a helper method for setting the display date (the current visible month).
  const setDisplayDate = (displayDate: Date): void => {
    dispatch({ type: ActionTypes.SetDisplayDate, payload: { displayDate } });
  };

  // a helper method for setting the actve date (the date the user has chosen).
  const setActiveDate = (activeDate: Date): void => {
    dispatch({ type: ActionTypes.SetActiveDate, payload: { activeDate } });
  };

  return { setDisplayDate, setActiveDate };
};

// a hook that simplifies the use of our state reducer and access to our state.
export const useState = (): [DatePickerState, DatePickerDispatches] => {
  return [useDatePickerState(), useDatePickerDispatch()];
};
