import { Counter, DynamicHoliday } from "./types";

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

export const staticHolidays = [
  [
    {
      month: 0,
      date: 1,
      name: "New Year's Day",
      //if the month starts on a sunday, this function evaluates to false,
      //which will make the function ignore this holiday
      specialConditions: ({ date }: Counter, j: number) => date !== j,
    },
    {
      month: 0,
      date: 2,
      name: "New Year's Day Observance",
      //if the month starts on a sunday, this function evaluates to true,
      //which will make the function count this holiday
      specialConditions: ({ date }: Counter, j: number) => date === j,
    },
  ],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [{ month: 10, date: 11, name: "Veteran's Day" }],
  [
    { month: 11, date: 24, name: "Christmas Eve" },
    { month: 11, date: 25, name: "Christmas" },
    { month: 11, date: 26, name: "Winter Break" },
    { month: 11, date: 27, name: "Winter Break" },
    { month: 11, date: 28, name: "Winter Break" },
    { month: 11, date: 29, name: "Winter Break" },
    { month: 11, date: 30, name: "Winter Break" },
    { month: 11, date: 31, name: "New Year's Eve" },
  ],
];

export const dynamicHolidays: DynamicHoliday[][] = [
  [
    {
      dateRange: [14, 21],
      occurence: 2,
      day: 1,
      name: "Martin Luther King Day",
    },
  ],
  [
    { dateRange: [14, 21], occurence: 2, day: 1, name: "President's Day" },
    { dateRange: [15, 22], occurence: [2, 3], day: 2, name: "February Break" },
    { dateRange: [16, 23], occurence: [2, 3], day: 3, name: "February Break" },
    { dateRange: [17, 24], occurence: [2, 3], day: 4, name: "February Break" },
    { dateRange: [18, 25], occurence: [2, 3], day: 5, name: "February Break" },
  ],
  [],
  [],
  [{ dateRange: [24, 30], occurence: [4, 5], day: 1, name: "Memorial Day" }],
  [],
  [],
  [],
  [{ dateRange: [0, 6], occurence: 0, day: 1, name: "Labor Day" }],
  [],
  [
    { dateRange: [1, 7], occurence: [0, 1], day: 2, name: "Election Day" },
    { dateRange: [21, 27], week: 3, day: 4, name: "Thanksgiving" },
    { dateRange: [22, 28], week: 3, day: 5, name: "Thanksgiving Break" },
  ],
  [],
];
