import { dynamicHolidays, months, staticHolidays } from "./constants";
import { Counter } from "./types";

const getDays = (milliseconds: number) =>
  Math.round(milliseconds / (1000 * 60 * 60 * 24)) + 1;

const numOfDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate();
};

export const createArray = (startDay: Date, lastDay: Date) => {
  //logic to count # of days between days
  const totalDays = getDays(lastDay.getTime() - startDay.getTime());

  //create offsets to know when to start the first day, have the looping function -
  const firstDayId = startDay.getDay() - 1;

  const numOfWeeksBetweenDates = (() => {
    const daysInFirstWeek = 6 - startDay.getDay() + 1;
    const daysInLastWeek = lastDay.getDay() + 1;

    const fullWeeks = (totalDays - daysInFirstWeek - daysInLastWeek) / 7;

    return fullWeeks + 2;
  })();

  const firstMonth = startDay.getMonth();
  const lastMonth = lastDay.getMonth();
  const firstYear = startDay.getFullYear();
  const lastYear = lastDay.getFullYear();

  const numOfUniqueMonths = (() => {
    if (firstYear === lastYear) lastDay.getMonth() - firstMonth + 1;
    const monthsInFirstYear = 12 - firstMonth;
    const monthsInLastYear = lastMonth + 1;
    const numOfYears = lastYear - firstYear - 1;
    return numOfYears * 12 + monthsInFirstYear + monthsInLastYear;
  })();

  const daysForEachUniqueMonth: number[] = [];

  for (let i = 0; i < numOfUniqueMonths; i++) {
    const currentMonth = startDay;
    currentMonth.setMonth((firstMonth + i) % 12);
    daysForEachUniqueMonth.push(numOfDaysInMonth(currentMonth));
  }

  const firstArray = new Array(numOfWeeksBetweenDates).fill(0);
  const anotherArray = new Array(7).fill(0);

  const newArray = (() => {
    return [...firstArray.map(() => [...anotherArray])];
  })();

  //test letterdays, will need to lift this to state
  const letterDays = ["A", "B", "C", "D", "E", "F", "G", "H"];

  let counter: Counter = {
    date: 0 - firstDayId - 1,
    week: 0,
    month: 0,
    letterDays: 0,
    occurence: 0,
    occurenceCounter: 0,
  };

  const tick = (daysInCurrentMonth: number, j: number) => {
    counter.date++;
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
      counter.date = 0;
      counter.week = 0;
      counter.occurence = 0;
      counter.occurenceCounter = 0;
    }
  };

  for (let i = 0; i < newArray.length; i++) {
    for (let j = 0; j < newArray[i].length; j++) {
      //array of # of days in each month present in date range
      const daysInCurrentMonth = daysForEachUniqueMonth[counter.month];
      const id = (firstMonth + counter.month) % 12;
      //condition to skip weekends
      if (j === 0 || j === 6) {
        tick(daysInCurrentMonth, j);
        continue;
      }

      //condition to check if it's a static holiday
      if (staticHolidays[id].some(({ date }) => date - 1 === counter.date)) {
        tick(daysInCurrentMonth, j);
        continue;
      }
      //condition to check if it's a dynamic holiday
      if (
        dynamicHolidays[id].some((holiday) => {
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
        tick(daysInCurrentMonth, j);
        continue;
      }

      //use id to access the letterDays array to add letter day onto newArray
      const letterDaysId =
        counter.letterDays - firstDayId < 0
          ? -1
          : (counter.letterDays - firstDayId) % letterDays.length;

      newArray[i][j] =
        letterDaysId < 0
          ? 0
          : months[id] + letterDays[letterDaysId] + counter.date;

      //tick up letterDays and date after use
      counter.letterDays++;
      tick(daysInCurrentMonth, j);
    }
  }

  return newArray;
};

export const isHoliday = () => {};
