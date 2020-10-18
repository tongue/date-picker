import React, { FC } from "react";
import { useState } from "./hooks";
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

const Calendar: FC<CalendarProps> = ({ weekLabel }) => {
  const {
    state: {
      activeDate,
      displayDate,
      showWeekNumber,
      printLongWeekdays,
      locale,
      start,
      end,
      transitions,
    },
    setActiveDate,
  } = useState();

  // First we get an array of Date objects for each day within a the current week,
  // So it looks like this: `[Date, Date, Date, Date, Date, Date, Date]`
  // We then iterate (map) over this array, and convert the Date objects to the
  // actual day names, so we get a new array that looks like this:
  // `["monday", "tuesday", ...]` which we then return instead of the array of
  // date objects.
  const dayNames = eachDayOfInterval({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date()),
  }).map((day) => format(day, printLongWeekdays ? "iiii" : "iii", { locale }));

  // First we get an array of Date objects for each week within our wanted month.
  // So it looks something like this: [`Date`, `Date`, `Date`, `Date`]
  // We then iterate (map) over that array converting the `Date` object
  // to an array of all the days within the week Date object that we get
  // for each iteration. So we get an array that looks like this
  // `[[Date, Date, ...], [Date, Date, ...], [Date, Date, ...], [Date, Date, ...]]
  const daysOfMonthByWeek = eachWeekOfInterval({
    start: startOfMonth(displayDate),
    end: endOfMonth(displayDate),
  }).map((week) =>
    eachDayOfInterval({ start: startOfWeek(week), end: endOfWeek(week) })
  );

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveDate(setDay(displayDate, parseInt(event.currentTarget.value, 10)));
  };

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
            <thead>
              <tr>
                {showWeekNumber && <th scope="column">{weekLabel}</th>}
                {dayNames.map((day) => (
                  <th key={day} scope="column">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {daysOfMonthByWeek.map((daysOfWeek) => (
                <tr key={getWeek(daysOfWeek[0])}>
                  {showWeekNumber && (
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