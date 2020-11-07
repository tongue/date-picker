import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import DatePicker, {
  DatePickerProps,
  CalendarType,
  WeekdayFormatOptions,
} from ".";
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

export const HideWeekNumber = Template.bind({});
HideWeekNumber.args = {
  calendarType: CalendarType.WithoutWeekNumber,
};

export const PrintLongWeekdays = Template.bind({});
PrintLongWeekdays.args = {
  weekdayFormat: WeekdayFormatOptions.AllCharacters,
};

export const EnglishLocale = Template.bind({});
EnglishLocale.args = {
  locale: enUS,
  nextMonthLabel: "Next month",
  previousMonthLabel: "Previous month",
  weekLabel: "W.",
};

export const StartDate1YearInFuture = Template.bind({});
StartDate1YearInFuture.args = {
  start: addYears(new Date(), 1),
};

export const EndDateToday = Template.bind({});
EndDateToday.args = {
  end: new Date(),
};

/* export const WithTransitions = Template.bind({}); */
/* WithTransitions.args = { */
/*   transitions: true, */
/* }; */
