import React from "react";
import { Story, Meta } from "@storybook/react";

import DatePicker, { DatePickerProps, CalendarTypes, WeekdayFormats } from ".";
import { enUS } from "date-fns/locale";
import { addYears } from "date-fns";

export default {
  title: "DatePicker",
  component: DatePicker,
  argType: {
    onChange: { action: "change" },
  },
} as Meta;

const Template: Story<DatePickerProps> = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});

export const WithoutWeekNumber = Template.bind({});
WithoutWeekNumber.args = {
  calendarType: CalendarTypes.WithoutWeekNumber,
};

export const WithoutDayName = Template.bind({});
WithoutDayName.args = {
  calendarType: CalendarTypes.WithoutDayName,
};

export const WithoutWeekNumberAndDayName = Template.bind({});
WithoutWeekNumberAndDayName.args = {
  calendarType: CalendarTypes.WithoutWeekNumberAndDayName,
};

export const OneCharacterWeekday = Template.bind({});
OneCharacterWeekday.args = {
  weekdayFormat: WeekdayFormats.OneCharacter,
};

export const TwoCharactersWeekday = Template.bind({});
TwoCharactersWeekday.args = {
  weekdayFormat: WeekdayFormats.TwoCharacters,
};

export const ThreeCharactersWeekdays = Template.bind({});
ThreeCharactersWeekdays.args = {
  weekdayFormat: WeekdayFormats.ThreeCharacters,
};

export const EnglishLocale = Template.bind({});
EnglishLocale.args = {
  locale: {
    nextMonth: "Next month",
    previousMonth: "Previous month",
    week: "Week",
    dateFns: enUS,
  },
};

export const ShortWeekLabel = Template.bind({});
ShortWeekLabel.args = {
  locale: {
    week: "V.",
  },
};

export const StartDate1YearInFuture = Template.bind({});
StartDate1YearInFuture.args = {
  start: addYears(new Date(), 1),
};

export const EndDateToday = Template.bind({});
EndDateToday.args = {
  end: new Date(),
};
