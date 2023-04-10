import { Dispatch, SetStateAction } from "react";
import { weekDays } from "./constants";
import { newArray } from "./utils";

export function Day({
  day,
  today,
  dayId,
  weekId,
  firstDayId,
  firstDayOfMonth,
  daysInMonth,
  hover,
  setHover,
}: {
  day: number;
  today: Date;
  dayId: number;
  weekId: number;
  firstDayId: number;
  firstDayOfMonth: string;
  daysInMonth: number;
  hover: number[][];
  setHover: Dispatch<SetStateAction<number[][]>>;
}) {
  const date = day + 1 - firstDayId;
  return (
    <button
      className={`h-12 w-12 ${
        hover[weekId][dayId] === 1 ? "bg-blue-100" : "bg-white"
      } text-blue-400 overflow-hidden flex items-center justify-center text-center rounded-lg`}
      onPointerEnter={(event) => {
        setHover(() => {
          let newCal = newArray(6, 7);
          newCal[weekId][dayId] = 1;
          return newCal;
        });
      }}
    >
      {date > 0 && date <= daysInMonth ? date : ""}
    </button>
  );
}
