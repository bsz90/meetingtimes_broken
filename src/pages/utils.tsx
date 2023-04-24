import { months } from "./constants";
import { Counter, DynamicDay, Settings } from "./types";
import { HDate } from "@hebcal/core";

export function deepCopy(obj: any): any {
  let newObj: any;

  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      newObj = obj.map((item) => deepCopy(item));
    }
    if (obj === null) {
      newObj = null;
    }
    newObj = {};
    for (let key in obj) {
      newObj[key] = deepCopy(obj[key]);
    }
  }
  newObj = obj;

  return newObj;
}

export function deepEquals(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (typeof a === "object" && a !== null && b !== null) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (let i = 0; i < keysA.length; i++) {
      const key = keysA[i];
      if (!deepEquals(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  return false;
}

export function modulo(n: number, m: number) {
  return ((n % m) + m) % m;
}

export const toMS = (n: number) => n * 24 * 60 * 60 * 1000;

export const fromMS = (n: number) => (n / 24) * 60 * 60 * 1000;
//function that ticks up the date counter
const tick = (arrayOfDaysForMonth: number[], j: number, count: Counter) => {
  count.date++;
  count.daysElapsed++;

  if (count.date > 0) {
    count.occurenceCounter++;
  }
  if (count.occurenceCounter === 7) {
    count.occurence++;
    count.occurenceCounter = 0;
  }
  if (j === 6) count.week++;
  if (count.date === arrayOfDaysForMonth[count.monthsElapsed]) {
    count.month++;
    count.monthsElapsed++;
    count.date = 0;
    count.week = 0;
    count.occurence = 0;
    count.occurenceCounter = 0;
    if (count.month === 12) {
      count.year++;
      count.month = 0;
    }
  }
};

export const uniqueKey = () =>
  Date.now() + Math.random().toString(36).substring(2, 9);

export function newArray(rowSize: number, colSize: number, fill: any) {
  const rows = new Array(rowSize).fill(fill);
  const columns = new Array(colSize).fill(fill);

  return [...rows.map(() => [...columns])];
}

//CREATE FUNCTIONS
//functions that create objects
export const createDefaultHolidays = (schoolYearStart: number) => {
  return {
    newYears: getNewYears(schoolYearStart + 1),
    martinLutherKingJrDay: getDateFromOccurence(2, 1, 0, schoolYearStart + 1),
    presidentsDay: getDateFromOccurence(2, 1, 1, schoolYearStart + 1),
    goodFriday: getGoodFriday(schoolYearStart + 1),
    memorialDay: getLastDayOfMonth(1, 4, schoolYearStart + 1),
    laborDay: getDateFromOccurence(0, 1, 8, schoolYearStart),
    columbusIndigenousPeoplesDay: getDateFromOccurence(
      1,
      1,
      9,
      schoolYearStart
    ),
    roshHashanah: getRoshHashanah(schoolYearStart),
    yomKippur: getYomKippur(schoolYearStart),
    veteransDay: new Date(schoolYearStart, 10, 10),
    thanksgiving: getDateFromOccurence(3, 4, 10, schoolYearStart),
  };
};

export const createDefaultSettings = (
  startYear: number,
  daysInCycle: number,
  classPeriodsPerDay: number
): Settings => {
  return {
    schoolYear: [startYear],
    firstDay: getDateBefore(getDateFromOccurence(0, 1, 8, startYear), 7),
    totalDays: 182,
    daysInCycle: daysInCycle,
    classPeriodsPerDay: classPeriodsPerDay,
    holidays: createDefaultHolidays(startYear),
    breaks: { winterBreak: getWinterBreak(startYear) },
    proDevDays: [getDayBefore(getDateFromOccurence(2, 1, 1, startYear + 1), 5)],
    customDays: [],
  };
};

export const createCalendar = (firstDay: Date, lastDay: Date) => {
  //create offsets to know when to start the first day, have the looping function -
  const firstDayId = firstDay.getDay() - 1;

  const newCalendar = newArray(getNumOfWeeksBetween(firstDay, lastDay), 7, 0);

  //test letterdays, will need to lift this to state
  const letterDays = ["A", "B", "C", "D", "E", "F", "G", "H"];

  const year = 2022;

  const holidays = Object.values(createDefaultHolidays(year));

  let count = counter(firstDay);

  for (let i = 0; i < newCalendar.length; i++) {
    for (let j = 0; j < newCalendar[i].length; j++) {
      //condition to skip weekends
      if (j === 0 || j === 6) {
        tick(getArrayOfDaysForMonth(firstDay, lastDay), j, count);
        continue;
      }

      const currentDay = new Date(count.year, count.month, count.date);

      //if holidays array includes a date that is equal to the current day, tick and continue
      if (
        holidays.some(
          (date) =>
            date.toLocaleDateString() === currentDay.toLocaleTimeString()
        )
      ) {
        tick(getArrayOfDaysForMonth(firstDay, lastDay), j, count);
        continue;
      }

      //use id to access the letterDays array to add letter day onto newArray
      //subtract firstDayId from letterDays count to provide an offset so that the letterDays start at the correct time
      //if letterDays prop is less than 0, return -1 so that the id cannot be used
      const letterDaysId =
        count.letterDays - firstDayId < 0
          ? -1
          : (count.letterDays - firstDayId) % letterDays.length;

      newCalendar[i][j] =
        letterDaysId < 0
          ? 0
          : months[count.month] + letterDays[letterDaysId] + count.date;

      //tick up letterDays and date after use
      count.letterDays++;
      tick(getArrayOfDaysForMonth(firstDay, lastDay), j, count);
    }
  }

  return newCalendar;
};

//GETTER FUNCTIONS

//function that takes a range of months and creates an array of total days in each of those months
export const getArrayOfDaysForMonth = (firstDay: Date, lastDay: Date) => {
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
    daysForEachMonth.push(getDaysInMonth(daysInMonth));
  }
  return daysForEachMonth;
};

//creates a date counter for all for loops looping through the calendar
//keeps track of data as the loop progresses
export const counter = (date: Date) => {
  return {
    date: date.getDate() - 1 - date.getDay(),
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

const loop = (
  year: number,
  calendarStart: Date,
  test: (i: number, j: number, count: Counter) => boolean,
  result: (count: Counter, year: number) => Date
) => {
  const calendar = newArray(10, 7, 0);

  let count = counter(calendarStart);

  for (let i = 0; i < calendar.length; i++) {
    for (let j = 0; j < calendar[i].length; j++) {
      if (test(i, j, count)) {
        return result(count, year);
      }
      tick(
        getArrayOfDaysForMonth(calendarStart, getFutureDate(calendarStart, 70)),
        j,
        count
      );
    }
  }
  throw new Error();
};

//returns the date of a specific of number of days before a passed Date
export const getDateBefore = (date: Date, daysBefore: number) => {
  return new Date(date.getTime() - toMS(daysBefore));
};

//returns the date based on the number of occurences of that day
export const getDateFromOccurence = (
  occurence: number,
  day: number,
  month: number,
  year: number
) => {
  const monthStart = new Date(year, month, 1);

  const test = (i: number, j: number, count: Counter) => {
    return occurence === count.occurence && count.date >= 0 && day === j;
  };

  const result = (count: Counter, year: number) => {
    return new Date(year, count.month, count.date + 1);
  };

  return loop(year, monthStart, test, result);
};

//returns the date of the weekday before a certain date
export const getDayBefore = (date: Date, targetDay: number) => {
  const startingDay = date.getDay();
  const daysApart = modulo(targetDay - startingDay, 7);

  return new Date(date.getTime() - toMS(daysApart));
};

export const getDaysBetween = (startDate: Date, endDate: Date) => {
  const totalDays =
    Math.round(fromMS(endDate.getTime() - startDate.getTime())) + 1;

  const daysBetween = [];

  for (let i = 0; i < totalDays; i++) {
    const date = new Date(startDate.getTime() + toMS(i));
    daysBetween.push(date);
  }
  return daysBetween;
};

export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate();
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

const getFutureDate = (date: Date, daysInFuture: number) => {
  const futureDate = new Date(date);
  futureDate.setDate(futureDate.getDate() + 56);
  return futureDate;
};

export const getGoodFriday = (year: number) =>
  getDateBefore(getEaster(year), 2);

export const getNumOfWeeksBetween = (firstDay: Date, lastDay: Date) => {
  const totalDays =
    Math.round(fromMS(lastDay.getTime() - firstDay.getTime())) + 1;

  const daysInFirstWeek = 6 - firstDay.getDay() + 1;
  const daysInLastWeek = lastDay.getDay() + 1;

  const fullWeeks = (totalDays - daysInFirstWeek - daysInLastWeek) / 7;

  return fullWeeks + 2;
};

export const getLastDayOfMonth = (day: number, month: number, year: number) => {
  const monthStart = new Date(year, month, 1);

  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const lastWeekStart = lastDayOfMonth - 6;

  for (let i = lastWeekStart; i <= lastDayOfMonth; i++) {
    const date = new Date(year, month, i);
    if (date.getDay() === day) {
      return date;
    }
  }
  throw new Error();
};

export const getNewYears = (year: number) => {
  const newYears = new Date(year, 0, 1);

  if (newYears.getDay() !== 0) newYears;
  return new Date(year, 0, 2);
};

export const getRoshHashanah = (year: number) => {
  const monthStart = new Date(year, 8, 1);

  const test = (i: number, j: number, count: Counter) => {
    const roshHashanah = "1 Tishrei";

    const currentGregDate = new Date(year, 8 + count.monthsElapsed, count.date);

    const hebrewDate = new HDate(currentGregDate);

    const dateString = `${hebrewDate.getDate()} ${hebrewDate.getMonthName()}`;

    return dateString === roshHashanah;
  };

  const result = (count: Counter, year: number) =>
    new Date(year, monthStart.getMonth() + count.monthsElapsed, count.date);

  return loop(year, monthStart, test, result);
};

const getStaticHoliday = (
  date: Date,
  name?: string,
  specialConditions?: (count: Counter, j: number) => boolean
) => {
  let holiday: {
    month: number;
    date: number;
    name?: string;
    specialConditions?: (count: Counter, j: number) => boolean;
  } = {
    month: date.getMonth(),
    date: date.getDate(),
  };
  if (name) holiday.name = name;
  if (specialConditions) holiday.specialConditions = specialConditions;
  return holiday;
};

//get the 5 weekdays of the week of the passed Date
export const getWeekOf = (date: Date) => {
  const week = [];
  //get monday before date
  const startDate = getDayBefore(date, 1);
  for (let i = 0; i < 5; i++) {
    week.push(new Date(startDate.getTime() + toMS(i)));
  }

  return week;
};

export const getTimeStringFromMinutes = (minutes: number) => {
  const date = new Date(minutes * 60 * 1000); // Convert minutes to milliseconds by multiplying by 60 * 1000

  const hours = date.getHours().toString().padStart(2, "0"); // Get hours and convert to a string with leading zero if necessary
  const minutesStr = date.getMinutes().toString().padStart(2, "0"); // Get minutes and convert to a string with leading zero if necessary

  return `${hours}:${minutesStr}`;
};

export const getWinterBreak = (year: number) => {
  const xmasEve = new Date(year, 11, 24);
  const startDay =
    xmasEve.getDay() === 3 ? new Date(year, 11, 23) : new Date(year, 11, 24);
  const newYears = new Date(year + 1, 0, 1);
  const lastDay =
    newYears.getDay() === 0 || newYears.getDay() === 4
      ? new Date(year + 1, 0, 2)
      : newYears;
  return getDaysBetween(startDay, lastDay);
};

export const getYomKippur = (year: number) => {
  const monthStart = new Date(year, 8, 1);

  const test = (i: number, j: number, count: Counter) => {
    const roshHashanah = "10 Tishrei";

    const currentGregDate = new Date(year, 8 + count.monthsElapsed, count.date);

    const hebrewDate = new HDate(currentGregDate);

    const dateString = `${hebrewDate.getDate()} ${hebrewDate.getMonthName()}`;

    return dateString === roshHashanah;
  };

  const result = (count: Counter, year: number) =>
    new Date(year, monthStart.getMonth() + count.monthsElapsed, count.date);

  return loop(year, monthStart, test, result);
};
