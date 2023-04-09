import { Day } from "./Day";

export function Week({
  week,
  monthId: id,
  today,
  firstDayId,
  firstDayOfMonth,
  daysInMonth,
}: {
  week: number[];
  monthId: number;
  today: Date;
  firstDayId: number;
  firstDayOfMonth: string;
  daysInMonth: number;
}) {
  return (
    <div className="h-20 w-full flex gap-1 px-1 items-center justify-center">
      {week.map((_, weekId) => {
        const day = id * 7 + weekId;
        return (
          <Day
            key={day}
            day={day}
            today={today}
            firstDayId={firstDayId}
            firstDayOfMonth={firstDayOfMonth}
            daysInMonth={daysInMonth}
          />
        );
      })}
    </div>
  );
}
