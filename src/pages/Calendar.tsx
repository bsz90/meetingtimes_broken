import { useMemo, useReducer } from "react";
import { months, weekDays } from "./constants";
import { createArray } from "./utils";
import { Week } from "./Week";

export function Calendar() {
  const calendarArray: number[][] = new Array(6).fill(new Array(7).fill(0));

  const today = new Date();

  const day = today.getDay();
  const month = today.getMonth();
  const year = today.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayId = new Date(year, month, 1).getDay();
  const firstDayOfMonthString = weekDays[firstDayId];

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDayOfSchool = new Date(2022, 7, 29);

  const getKeyFromDate = (date: Date) =>
    `${date.getMonth() + 1}/${date.getDate()}`;

  console.log(createArray(new Date(2022, 10, 1), new Date(2023, 1, 28)));

  const cycleDays = 8;

  return (
    <div className="w-[600px] border-2 capitalize flex flex-col rounded-lg bg-blue-300/95 overflow-hidden">
      <div className="w-full h-20 text-5xl flex items-center justify-center bg-blue-500 py-1 gap-20">
        <button className="h-full w-12 text-lg ">&larr;</button>
        <h2 className="">
          {months[today.getMonth()]} {year}
        </h2>
        <button className="h-full w-12 text-lg ">&rarr;</button>
      </div>
      <div className="w-full h-8 flex items-center justify-center px gap">
        {weekDays.map((weekDay, id) => {
          return (
            <div
              className="h-full w-full border-y flex items-center justify-center text-center bg-blue-500 gap-1 p-1"
              key={weekDay}
            >
              {weekDay.slice(0, 3)}
            </div>
          );
        })}
      </div>
      <div className="w-full flex flex-col items-center justify-center text-center gap-1 py-1">
        {calendarArray.map((week, id) => {
          return (
            <Week
              key={`week ${id}`}
              week={week}
              monthId={id}
              today={today}
              firstDayId={firstDayId}
              firstDayOfMonth={firstDayOfMonthString}
              daysInMonth={daysInMonth}
            />
          );
        })}
      </div>
    </div>
  );
}
