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

export const staticHolidays = [
  {
    month: 0,
    date: 0,
    name: "New Year's Day",
    //if the month starts on a sunday, this function evaluates to false,
    //which will make the function ignore this holiday
    specialConditions: ({ date }: Counter, j: number) => date !== j,
  },
  {
    month: 0,
    date: 1,
    name: "New Year's Day Observance",
    //if the month starts on a sunday, this function evaluates to true,
    //which will make the function count this holiday
    specialConditions: ({ date }: Counter, j: number) => date === j,
  },
  { month: 10, date: 11, name: "Veterans Day" },
  { month: 11, date: 24, name: "Christmas Eve" },
  { month: 11, date: 25, name: "Christmas" },
  { month: 11, date: 31, name: "New Year's Eve" },
];

export const dynamicHolidays: DynamicDay[] = [
  {
    dateRange: [14, 21],
    occurence: 2,
    month: 0,
    day: 1,
    name: "Martin Luther King Day",
  },
  {
    dateRange: [14, 21],
    occurence: 2,
    month: 1,
    day: 1,
    name: "President's Day",
  },
  {
    dateRange: [24, 30],
    occurence: [3, 4],
    month: 4,
    day: 1,
    name: "Memorial Day",
  },
  { dateRange: [0, 6], occurence: 0, month: 8, day: 1, name: "Labor Day" },

  {
    dateRange: [1, 7],
    occurence: [0, 1],
    month: 10,
    day: 2,
    name: "Election Day",
  },
  { dateRange: [21, 27], week: 3, month: 10, day: 4, name: "Thanksgiving" },
  {
    dateRange: [22, 28],
    week: 3,
    month: 10,
    day: 5,
    name: "Thanksgiving Break",
  },
];

export const defaultSettings: Settings = createDefaultSettings(
  defaultStartYear,
  8,
  8
);

export const firstFormQuestions = [
  {
    name: "startDay",
    prompt: "What is your first day of school?",
    type: "date",
    max: 11,
    restrict: (string: string) => {
      if (string[0] === "0") return string;

      let newString = string.split("-");
      const changedString = newString.map((string, id) =>
        string.slice(1, 5) === "0000"
          ? "0001"
          : id === 0
          ? string.slice(1, 5)
          : string
      );

      return changedString.join("-");
    },
  },
  {
    name: "totalDays",
    prompt: "How many days are in your school year?",
    type: "number",
    max: 3,
    restrict: (string: string) => string.slice(0, 3),
  },
  {
    name: "proDevDays",
    prompt:
      "How many full-day in-service or professional development days do you have per year?",
    type: "number",
    max: 2,
    restrict: (string: string) => string.slice(0, 2),
  },
];

export const settingsCategories = [
  "General",
  "Schedule",
  "Holidays and Breaks",
  "Professional Days",
  "Other",
];

export const time = (() => {
  const halfHours = 24 * 2; // 24 hours * 2 half hours per hour
  const result = [];

  for (let i = 0; i < halfHours; i++) {
    result.push(i * 30 * 60 * 1000); // Convert i to milliseconds and push to result array
  }

  return result;
})();
