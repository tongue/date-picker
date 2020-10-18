import { sv } from "date-fns/locale";

export type DatePickerState = {
  start: Date;
  end: Date;
  locale: Locale;
  displayDate: Date;
  activeDate?: Date;
  showWeekNumber: boolean;
  transitions: boolean;
  printLongWeekdays: boolean;
};

export enum ActionTypes {
  Reset = "RESET",
  SetDisplayDate = "SET_DISPLAY_DATE",
  SetActiveDate = "SET_ACTIVE_DATE",
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

type ActionSetActiveDate = {
  type: ActionTypes.SetActiveDate;
  payload: {
    activeDate: Date;
  };
};

export type DatePickerAction =
  | ActionReset
  | ActionSetDisplayDate
  | ActionSetActiveDate;

export const datePickerIntitialState: DatePickerState = {
  displayDate: new Date(),
  start: new Date(),
  end: new Date(),
  locale: sv,
  showWeekNumber: true,
  printLongWeekdays: false,
  transitions: false,
  activeDate: undefined,
};

export const datePickerReducer = (
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
    case ActionTypes.SetActiveDate:
      return {
        ...state,
        activeDate: action.payload.activeDate,
      };
    default:
      return state;
  }
};
