import { months } from "./constants";

const getDays = (milliseconds: number) =>
  Math.round(milliseconds / (1000 * 60 * 60 * 24)) + 1;

const numOfDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate();
};

export const createArray = (startDay: Date, endDay: Date) => {
  //logic to count # of days between days
  const totalDays = getDays(endDay.getTime() - startDay.getTime());

  //create offsets to know when to start the first day, have the looping function -
  const firstDayId = startDay.getDay() - 1;
  const lastDayId = endDay.getDay();
  const startDate = startDay.getDate();

  const numOfWeeksBetweenDates = (() => {
    const daysInFirstWeek = 6 - startDay.getDay() + 1;
    const daysInLastWeek = endDay.getDay() + 1;

    const fullWeeks = (totalDays - daysInFirstWeek - daysInLastWeek) / 7;

    return fullWeeks + 2;
  })();

  const startingMonth = startDay.getMonth();

  const numOfUniqueMonths = endDay.getMonth() - startingMonth + 1;

  const daysForEachUniqueMonth: number[] = [];

  for (let i = 0; i < numOfUniqueMonths; i++) {
    const currentMonth = startDay;
    currentMonth.setMonth(startingMonth + i);
    daysForEachUniqueMonth.push(numOfDaysInMonth(currentMonth));
  }

  const firstArray = new Array(numOfWeeksBetweenDates).fill(0);
  const anotherArray = new Array(7).fill(0);

  const newArray = (() => {
    return [...firstArray.map(() => [...anotherArray])];
  })();

  //test letterdays, will need to lift this to state
  const letterDays = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let counter = { date: 0 - firstDayId - 1, month: 0, letterDays: 0 };

  for (let i = 0; i < newArray.length; i++) {
    for (let j = 0; j < newArray[i].length; j++) {
      //array of # of days in each month present in date range
      const daysInCurrentMonth = daysForEachUniqueMonth[counter.month];

      //condition to skip weekends
      if (j === 0 || j === 6) {
        counter.date++;
        if (counter.date === daysInCurrentMonth) {
          counter.month++;
          counter.date = 0;
        }
        continue;
      }

      //use id to access the letterDays array to add letter day onto newArray
      const id =
        counter.letterDays - firstDayId < 0
          ? -1
          : (counter.letterDays - firstDayId) % letterDays.length;

      newArray[i][j] = id < 0 ? 0 : letterDays[id];

      //tick up letterDays and date after use
      counter.letterDays++;
      counter.date++;
      //check if month is ready to change
      if (counter.date === daysInCurrentMonth) {
        counter.month++;
        counter.date = 0;
      }
    }
  }

  return newArray;
};

export const isHoliday = () => {};
