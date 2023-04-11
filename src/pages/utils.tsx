import { dynamicHolidays, months, staticHolidays } from "./constants";
import { Counter, DynamicHoliday } from "./types";
import { HDate } from "@hebcal/core";

export function modulo(n: number, m: number) {
  return ((n % m) + m) % m;
}

export const uniqueKey = () =>
  Date.now() + Math.random().toString(36).substring(2, 9);

export function newArray(rowSize: number, colSize: number, fill: any) {
  const rows = new Array(rowSize).fill(fill);
  const columns = new Array(colSize).fill(fill);

  return [...rows.map(() => [...columns])];
}

//creates a date counter for all for loops looping through the calendar
//keeps track of data as the loop progresses
export const getCounter = (date: Date) => {
  return {
    date: date.getDate() - 1 - date.getDay() - 1,
    daysElapsed: 0,
    week: 0,
    month: date.getMonth(),
    monthsElapsed: 0,
    year: date.getFullYear(),
    letterDays: 0,
    occurence: 0,
    occurenceCounter: 0,
  };
};

//function that ticks up the date counter
const tick = (daysInCurrentMonth: number, j: number, counter: Counter) => {
  counter.date++;
  counter.daysElapsed++;

  if (counter.date > 0) {
    counter.occurenceCounter++;
  }
  if (counter.occurenceCounter === 7) {
    counter.occurence++;
    counter.occurenceCounter = 0;
  }
  if (j === 6) counter.week++;
  if (counter.date === daysInCurrentMonth) {
    counter.month++;
    counter.monthsElapsed++;
    counter.date = 0;
    counter.week = 0;
    counter.occurence = 0;
    counter.occurenceCounter = 0;
    if (counter.month === 12) {
      counter.year++;
      counter.month = 0;
    }
  }
};

export const getDays = (milliseconds: number) =>
  Math.round(milliseconds / (1000 * 60 * 60 * 24)) + 1;

export const numOfDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate();
};

export const numOfWeeksBetweenDates = (firstDay: Date, lastDay: Date) => {
  const totalDays = getDays(lastDay.getTime() - firstDay.getTime());

  const daysInFirstWeek = 6 - firstDay.getDay() + 1;
  const daysInLastWeek = lastDay.getDay() + 1;

  const fullWeeks = (totalDays - daysInFirstWeek - daysInLastWeek) / 7;

  return fullWeeks + 2;
};

//function that takes a range of months and creates an array of total days in each of those months
export const arrayOfDaysInMonth = (firstDay: Date, lastDay: Date) => {
  const firstDate = firstDay.getDate() - 1;

  const firstMonth = firstDay.getMonth();
  const lastMonth = lastDay.getMonth();
  const firstYear = firstDay.getFullYear();
  const lastYear = lastDay.getFullYear();

  const numOfMonths = (() => {
    if (firstYear === lastYear) lastDay.getMonth() - firstMonth + 1;
    const monthsInFirstYear = 12 - firstMonth;
    const monthsInLastYear = lastMonth + 1;
    const numOfYears = lastYear - firstYear - 1;
    return numOfYears * 12 + monthsInFirstYear + monthsInLastYear;
  })();

  const daysForEachMonth: number[] = [];

  for (let i = 0; i < numOfMonths; i++) {
    const daysInMonth = new Date(
      firstYear + Math.floor((firstMonth + i) / 12),
      (firstMonth + i) % 12,
      firstDate
    );
    daysForEachMonth.push(numOfDaysInMonth(daysInMonth));
  }
  return daysForEachMonth;
};

//function to determine if it's a jewishHoliday
export const jewishHoliday = (month: number, day: number, year: number) => {
  const roshHashanah = "1 Tishrei";
  const yomKippur = "10 Tishrei";
  const date = `${new HDate(
    new Date(year, month, day + 1)
  ).getDate()} ${new HDate(new Date(year, month, day + 1)).getMonthName()}`;

  return date === roshHashanah || date === yomKippur;
};

//function to determine date of Easter
export const getEaster = (year: number) => {
  var a = year % 19;
  var b = Math.floor(year / 100);
  var c = year % 100;
  var d = Math.floor(b / 4);
  var e = b % 4;
  var f = Math.floor((b + 8) / 25);
  var g = Math.floor((b - f + 1) / 3);
  var h = (19 * a + b - d - g + 15) % 30;
  var i = Math.floor(c / 4);
  var k = c % 4;
  var l = (32 + 2 * e + 2 * i - h - k) % 7;
  var m = Math.floor((a + 11 * h + 22 * l) / 451);
  var n = Math.floor((h + l - 7 * m + 114) / 31);
  var p = (h + l - 7 * m + 114) % 31;

  // Return a new Date object representing the date of Easter
  return new Date(year, n - 1, p + 1);
};

export const createArray = (firstDay: Date, lastDay: Date) => {
  //create offsets to know when to start the first day, have the looping function -
  const firstDayId = firstDay.getDay() - 1;

  const daysInMonth = arrayOfDaysInMonth(firstDay, lastDay);

  const newCalendar = newArray(numOfWeeksBetweenDates(firstDay, lastDay), 7, 0);

  //test letterdays, will need to lift this to state
  const letterDays = ["A", "B", "C", "D", "E", "F", "G", "H"];

  let counter = getCounter(firstDay);

  for (let i = 0; i < newCalendar.length; i++) {
    for (let j = 0; j < newCalendar[i].length; j++) {
      //array of # of days in each month present in date range
      const daysInCurrentMonth = daysInMonth[counter.monthsElapsed];

      //condition to skip weekends
      if (j === 0 || j === 6) {
        tick(daysInCurrentMonth, j, counter);
        continue;
      }

      //condition to check if it's a static holiday
      if (
        staticHolidays[counter.month].some(
          ({ date }) => date - 1 === counter.date
        )
      ) {
        tick(daysInCurrentMonth, j, counter);
        continue;
      }

      //condition to check if it's a dynamic holiday
      if (
        dynamicHolidays[counter.month].some((holiday) => {
          if (
            holiday.dateRange[0] <= counter.date &&
            counter.date <= holiday.dateRange[1]
          ) {
            if (holiday.week)
              return holiday.week === counter.week && holiday.day === j;

            if (typeof holiday.occurence === "number") {
              return (
                holiday.occurence === counter.occurence && holiday.day === j
              );
            }

            if (typeof holiday.occurence === "object") {
              return (
                (holiday.occurence[0] === counter.occurence ||
                  holiday.occurence[1] === counter.occurence) &&
                holiday.day === j
              );
            }

            return false;
          }
        })
      ) {
        tick(daysInCurrentMonth, j, counter);
        continue;
      }

      // check if it's a jewish holiday
      if (jewishHoliday(counter.month, counter.date, counter.year)) {
        tick(daysInCurrentMonth, j, counter);
        continue;
      }

      //use id to access the letterDays array to add letter day onto newArray
      //subtract firstDayId from letterDays count to provide an offset so that the letterDays start at the correct time
      //if letterDays prop is less than 0, return -1 so that the id cannot be used
      const letterDaysId =
        counter.letterDays - firstDayId < 0
          ? -1
          : (counter.letterDays - firstDayId) % letterDays.length;

      newCalendar[i][j] =
        letterDaysId < 0
          ? 0
          : months[counter.month] + letterDays[letterDaysId] + counter.date;

      //tick up letterDays and date after use
      counter.letterDays++;
      tick(daysInCurrentMonth, j, counter);
    }
  }

  return newCalendar;
};

//function to get a specific date from a dynamicHoliday on a specific year
const getDate = (date: DynamicHoliday, year: number) => {
  const monthStart = new Date(year, date.month, 1);

  const month = createArray(
    new Date(year, date.month, 1),
    new Date(year, date.month + 1, 0)
  );

  let correctDate = undefined;

  let counter = getCounter(monthStart);

  for (let i = 0; i < month.length; i++) {
    for (let j = 0; j < month[i].length; j++) {
      if (
        date.dateRange[0] <= counter.date &&
        counter.date <= date.dateRange[1] &&
        date.day === j
      ) {
        correctDate = counter.date;
        return correctDate;
      }
      tick(numOfDaysInMonth(monthStart), j, counter);
    }
  }
  throw new Error();
};
