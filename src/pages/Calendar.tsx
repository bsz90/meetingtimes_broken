import { useMemo, useReducer, useState } from "react";
import { months, weekDays } from "./constants";
import { createCalendar, modulo, newArray } from "./utils";
import { Week } from "./Week";

const initialState = { count: 0 };

function reducer(
  state: {
    count: number;
  },
  action: {
    type: "increment" | "decrement";
  }
) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

export function Calendar() {
  const [{ count }, dispatch] = useReducer(reducer, initialState);

  const [hover, setHover] = useState<number[][]>(newArray(6, 7, 0));

  const today = useMemo(() => new Date(), []);

  const day = today.getDay();
  const month = useMemo(
    () => modulo(today.getMonth() + count, 12),
    [count, today]
  );

  const year = today.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayId = new Date(year, month, 1).getDay();
  const firstDayOfMonthString = weekDays[firstDayId];

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // console.log(createArray(new Date(2022, 8, 1), new Date(2023, 1, 28)));

  return (
    <div className="border-2 capitalize flex flex-col rounded-lg bg-blue-300/95 overflow-hidden">
      <div className="w-full h-20 text-2xl flex items-center justify-between bg-blue-500 py-1 px-4">
        <h2 className="w-1/4 text-center text-lg">
          {year + Math.round((month + count) / 12)}
        </h2>
        <h2 className="w-2/4 text-center">{months[month]}</h2>
        <div className="w-1/4 flex items-center justify-between p-4w">
          <button
            className="h-full w-12 text-lg"
            onClick={() => dispatch({ type: "decrement" })}
          >
            &larr;
          </button>
          <button
            className="h-full w-12 text-lg"
            onClick={() => dispatch({ type: "increment" })}
          >
            &rarr;
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center text-center gap-1 py-1">
        <div className="h-8 w-full flex gap-1 px-1 items-center justify-center  bg-blue-500">
          {weekDays.map((weekDay, id) => {
            return (
              <div
                className="h-full w-12 flex items-center justify-center text-center gap-1 p-1"
                key={weekDay}
              >
                {weekDay.slice(0, 3)}
              </div>
            );
          })}
        </div>
        {hover.map((week, id) => {
          return (
            <Week
              key={`week ${id}`}
              week={week}
              weekId={id}
              today={today}
              firstDayId={firstDayId}
              firstDayOfMonth={firstDayOfMonthString}
              daysInMonth={daysInMonth}
              hover={hover}
              setHover={setHover}
            />
          );
        })}
      </div>
    </div>
  );
}
