export type DynamicHoliday = {
  dateRange: [number, number];
  week?: number;
  occurence?: number | [number, number];
  day: number;
  name: string;
  specialConditions?: (counter: Counter, j: number) => boolean;
};

export type StaticHolidays = {
  month: number;
  date: number;
  name: string;
  specialConditions?: (counter: Counter, j: number) => boolean;
};

export type Counter = {
  date: number;
  daysElapsed: number;
  week: number;
  month: number;
  monthsElapsed: number;
  year: number;
  letterDays: number;
  occurence: number;
  occurenceCounter: number;
};
