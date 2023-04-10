import { Dispatch, SetStateAction } from "react";
import { Day } from "./Day";

export function Week({
  week,
  weekId,
  today,
  firstDayId,
  firstDayOfMonth,
  daysInMonth,
  hover,
  setHover,
}: {
  week: number[];
  weekId: number;
  today: Date;
  firstDayId: number;
  firstDayOfMonth: string;
  daysInMonth: number;
  hover: number[][];
  setHover: Dispatch<SetStateAction<number[][]>>;
}) {
  return (
    <div className="h-full w-full flex gap-1 px-1 items-center justify-center">
      {week.map((_, dayId) => {
        const day = weekId * 7 + dayId;

        return (
          <Day
            key={day}
            day={day}
            today={today}
            dayId={dayId}
            weekId={weekId}
            firstDayId={firstDayId}
            firstDayOfMonth={firstDayOfMonth}
            daysInMonth={daysInMonth}
            hover={hover}
            setHover={setHover}
          />
        );
      })}
    </div>
  );
}
