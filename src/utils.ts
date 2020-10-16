import {
  Locale,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  eachYearOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  getYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";

// Get all the months in the year of the current date
export const monthsInYear: Date[] = eachMonthOfInterval({
  start: startOfYear(new Date()),
  end: endOfYear(new Date()),
});

// Format Date object to full name of month based on locale
// ex: "october"
export const formatMonth = (date: Date, locale: Locale): string =>
  format(date, "MMMM", { locale });

// Format Date object to digit of day in month
// ex: "12"
export const formatDayNumber = (date: Date): string => format(date, "d");

// Format Date object to short or long weekday name
// ex: "tuesday" or "tue"
export const formatDay = (
  date: Date,
  longWeekdays: boolean,
  locale: Locale
): string => format(date, longWeekdays ? "iiii" : "iii", { locale });

// Returns an array with all the days of the week based on locale with either
// short or long weekday names
// ex: `["monday", "tuesday", ...]` or `["mon", "tue", ...]`
export const getDayNames = (longWeekdays: boolean, locale: Locale): string[] =>
  // First we get an array of Date objects for each day within a the current week,
  // So it looks like this: `[Date, Date, Date, Date, Date, Date, Date]`
  // We then iterate (map) over this array, and convert the Date objects to the
  // actual day names, so we get a new array that looks like this:
  // `["monday", "tuesday", ...]` which we then return instead of the array of
  // date objects.
  eachDayOfInterval({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date()),
  }).map((day) => formatDay(day, longWeekdays, locale));

// Returns an array where that contains arrays that represents each week
// of the the month, each week array contains all the days of that week.
// ex: `[[Date, Date, Date, Date, Date, Date, Date], [Date, Date, Date ...], ...]`
export const getDaysOfMonthByWeek = (date: Date): Date[][] =>
  // First we get an array of Date objects for each week within our wanted month.
  // So it looks something like this: [`Date`, `Date`, `Date`, `Date`]
  // We then iterate (map) over that array converting the `Date` object
  // to an array of all the days within the week Date object that we get
  // for each iteration. So we get an array that looks like this
  // `[[Date, Date, ...], [Date, Date, ...], [Date, Date, ...], [Date, Date, ...]]
  eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  }).map((week) =>
    eachDayOfInterval({ start: startOfWeek(week), end: endOfWeek(week) })
  );

// Returns an array of Dateobbjects for all the available years within the
// start and end dates. If the start and end dates year is the same, we return
// the start date in an array
export const getSelectableYears = (start: Date, end: Date): Date[] =>
  getYear(start) === getYear(end)
    ? [start]
    : eachYearOfInterval({
        start,
        end,
      });
