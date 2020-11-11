import { Locale as DateFnsLocale } from "date-fns";
import { sv as dateFnsSv } from "date-fns/locale";

export interface Locale {
  nextMonth?: string;
  previousMonth?: string;
  week?: string;
  dateFns?: DateFnsLocale;
}

export const sv: Locale = {
  nextMonth: "Nästa månad",
  previousMonth: "Föregående månad",
  week: "Vecka",
  dateFns: dateFnsSv,
};
