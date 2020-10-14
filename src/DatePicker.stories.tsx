import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import DatePicker, { DatePickerProps } from "./DatePicker";
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
  hideWeekNumber: true,
};

export const PrintLongWeekdays = Template.bind({});
PrintLongWeekdays.args = {
  printLongWeekdays: true,
};

export const EnglishLocale = Template.bind({});
EnglishLocale.args = {
  locale: enUS,
};

export const MinDate = Template.bind({});
MinDate.args = {
  minDate: addYears(new Date(), 1),
};

export const MaxDate = Template.bind({});
MaxDate.args = {
  maxDate: new Date(),
};
