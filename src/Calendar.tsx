import React, { FC } from "react";
import { useState, CalendarType, WeekdayFormatOptions } from "./state";
import {
  setDay,
  getDay,
  getWeek,
  isWithinInterval,
  eachWeekOfInterval,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  format,
  startOfDay,
  endOfDay,
  isSameDay,
} from "date-fns";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import classNames from "classnames";
import styles from "./DatePicker.module.css";

interface CalendarProps {
  weekLabel: string;
}

const weekdayFormats = {
  [WeekdayFormatOptions.OneCharacter]: "iiiii",
  [WeekdayFormatOptions.TwoCharacters]: "iiiiii",
  [WeekdayFormatOptions.ThreeCharacters]: "iii",
  [WeekdayFormatOptions.AllCharacters]: "iiii",
};

const Calendar: FC<CalendarProps> = ({ weekLabel }) => {
  // we use our custom hook `useState` which exposes our component state
  // and a function to update the `activeDate`
  const {
    state: {
      activeDate,
      displayDate,
      calendarType,
      weekdayFormat,
      locale,
      start,
      end,
      transitions,
    },
    setActiveDate,
  } = useState();

  // we take an array of Date objects for each day within a the current week,
  // So it looks like this: `[Date, Date, ...]`
  // We then iterate (map) over this array, and convert the Date objects to the
  // actual day names, so we get a new array that looks like this:
  // `["monday", "tuesday", ...]` which we then return instead of the array of
  // date objects.

  console.log(weekdayFormats[weekdayFormat], weekdayFormats, weekdayFormat);
  const dayNames: string[] = eachDayOfInterval({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date()),
  }).map((day) => format(day, weekdayFormats[weekdayFormat], { locale }));

  // we take an array of Date objects for each week within our wanted month.
  // So it looks something like this: [`Date`, `Date`, `Date`, `Date`]
  // We then iterate (map) over that array converting the `Date` object
  // to an array of all the days within the week Date object that we get
  // for each iteration. So we get an array that looks like this
  // `[[Date, Date, ...], [Date, Date, ...], [Date, Date, ...], ...]
  const daysOfMonthByWeek: Date[][] = eachWeekOfInterval({
    start: startOfMonth(displayDate),
    end: endOfMonth(displayDate),
  }).map((week) =>
    eachDayOfInterval({ start: startOfWeek(week), end: endOfWeek(week) })
  );

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveDate(setDay(displayDate, parseInt(event.currentTarget.value, 10)));
  };

  // this function ensures that when a transition is complete the CSSTransition
  // component knows it.
  const onTransitionEnd = (node: HTMLElement, done: () => void) => {
    node.addEventListener("transitionend", done, false);
  };

  return (
    <div className={styles.Calendar}>
      <TransitionGroup component={null}>
        <CSSTransition
          key={displayDate.getTime()}
          addEndListener={onTransitionEnd}
          timeout={500}
          enter={transitions}
          exit={transitions}
          classNames={{
            enter: styles.fadeEnter,
            enterActive: styles.fadeEnterActive,
            exit: styles.fadeExit,
            exitActive: styles.fadeExitActive,
          }}
        >
          <table>
            {calendarType !== CalendarType.WithoutWeekNumberAndDayName && (
              <thead>
                <tr>
                  {calendarType !== CalendarType.WithoutWeekNumber && (
                    <th scope="column">{weekLabel}</th>
                  )}
                  {calendarType !== CalendarType.WithoutDayName &&
                    dayNames.map((day) => (
                      <th key={day} scope="column">
                        {day}
                      </th>
                    ))}
                </tr>
              </thead>
            )}
            <tbody>
              {daysOfMonthByWeek.map((daysOfWeek) => (
                <tr key={getWeek(daysOfWeek[0])}>
                  {calendarType !== CalendarType.WithoutWeekNumber &&
                    calendarType !==
                      CalendarType.WithoutWeekNumberAndDayName && (
                      <th scope="row">{getWeek(daysOfWeek[0])}</th>
                    )}
                  {daysOfWeek.map((day) => (
                    <td key={getDay(day)}>
                      <button
                        className={classNames({
                          [styles.Day__current]: isSameDay(day, new Date()),
                          [styles.Day__active]:
                            activeDate && isSameDay(day, activeDate),
                        })}
                        onClick={onClick}
                        value={getDay(day)}
                        disabled={
                          !isWithinInterval(day, {
                            start: startOfDay(start),
                            end: endOfDay(end),
                          })
                        }
                      >
                        {format(day, "d")}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default Calendar;
