import { Counter, DynamicDay, Settings } from "./types";
import {
  getRoshHashanah,
  getYomKippur,
  getGoodFriday,
  getEaster,
  getDateFromOccurence,
  getWeekOf,
  getDateBefore,
  newArray,
  getLastDayOfMonth,
  getNewYears,
  getDayBefore,
  getWinterBreak,
  createDefaultHolidays,
  createDefaultSettings,
} from "./utils";

export enum Day {
  SUNDAY = "Sunday",
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
}

export enum Month {
  JANUARY = "January",
  FEBRUARY = "February",
  MARCH = "March",
  APRIL = "April",
  MAY = "May",
  JUNE = "June",
  JULY = "July",
  AUGUST = "August",
  SEPTEMBER = "September",
  OCTOBER = "October",
  NOVEMBER = "November",
  DECEMBER = "December",
}

export const weekDays = [
  Day.SUNDAY,
  Day.MONDAY,
  Day.TUESDAY,
  Day.WEDNESDAY,
  Day.THURSDAY,
  Day.FRIDAY,
  Day.SATURDAY,
];

export const months = [
  Month.JANUARY,
  Month.FEBRUARY,
  Month.MARCH,
  Month.APRIL,
  Month.MAY,
  Month.JUNE,
  Month.JULY,
  Month.AUGUST,
  Month.SEPTEMBER,
  Month.OCTOBER,
  Month.NOVEMBER,
  Month.DECEMBER,
];

const defaultStartYear = new Date().getFullYear();

export const createDefaultBreaks = (schoolYearStart: number) => {
  return {
    winterBreak: getWeekOf(new Date(schoolYearStart, 11, 25)),
  };
};
export const defaultSettings: Settings = createDefaultSettings(
  defaultStartYear,
  8,
  8
);

export const settingsCategories = [
  "General",
  "Schedule",
  "Holidays and Breaks",
  "Professional Days",
  "Other",
];
