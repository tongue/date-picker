import React, { useReducer, Dispatch, FC, createContext } from "react";
import { sv } from "date-fns/locale";

export type DatePickerState = {
  start: Date;
  end: Date;
  locale: Locale;
  displayDate: Date;
  activeDate?: Date;
  showWeekNumber: boolean;
  printLongWeekdays: boolean;
};

export enum ActionTypes {
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
  showWeekNumber: true,
  printLongWeekdays: false,
  activeDate: undefined,
};

const datePickerReducer = (
  state: DatePickerState,
  action: DatePickerAction
): DatePickerState => {
  switch (action.type) {
    case ActionTypes.Reset:
      return {
        ...state,
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

export const DatePickerContext = createContext<{
  state: DatePickerState;
  dispatch: Dispatch<DatePickerAction>;
}>({
  state: datePickerIntitialState,
  dispatch: () => null,
});

export const DatePickerProvider: FC = ({ children }) => {
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
