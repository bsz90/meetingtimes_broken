import { weekDays } from "./constants";

export function Day({
  day,
  today,
  firstDayId,
  firstDayOfMonth,
  daysInMonth,
}: {
  day: number;
  today: Date;
  firstDayId: number;
  firstDayOfMonth: string;
  daysInMonth: number;
}) {
  const date = day + 1 - firstDayId;
  return (
    <div className="h-full w-full bg-white text-blue-400 overflow-hidden rounded-lg">
      {date > 0 && date <= daysInMonth ? date : ""}
    </div>
  );
}
