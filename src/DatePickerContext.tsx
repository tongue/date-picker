import React, { useReducer } from "react";
import { sv } from "date-fns/locale";

type DatePickerState = {
  displayDate: Date;
  start: Date;
  end: Date;
  locale: Locale;
};

enum ActionTypes {
  Reset = "RESET",
  SetDisplayDate = "SET_DISPLAY_DATE",
}

type ActionReset = {
  type: ActionTypes.Reset;
  payload: DatePickerState;
};

type ActionSetDisplayDate = {
  type: ActionTypes.SetDisplayDate;
  payload: {
    displayDate: Date;
  };
};

type DatePickerAction = ActionReset | ActionSetDisplayDate;

const datePickerIntitialState: DatePickerState = {
  displayDate: new Date(),
  start: new Date(),
  end: new Date(),
  locale: sv,
};

const datePickerReducer = (
  state: DatePickerState,
  action: DatePickerAction
): DatePickerState => {
  switch (action.type) {
    case ActionTypes.Reset:
      return {
        ...state,
        displayDate: action.payload.displayDate,
        start: action.payload.start,
        end: action.payload.end,
        locale: action.payload.locale,
      };
    case ActionTypes.SetDisplayDate:
      return {
        ...state,
        displayDate: action.payload.displayDate,
      };
    default:
      return state;
  }
};

export const DatePickerContext = React.createContext<DatePickerState>(
  datePickerIntitialState
);

export const DatePickerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    datePickerReducer,
    datePickerIntitialState
  );

  return (
    <DatePickerContext.Provider value={{ state, dispatch }}>
      {children}
    </DatePickerContext.Provider>
  );
};