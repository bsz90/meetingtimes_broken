export type DynamicHoliday = {
  dateRange: [number, number];
  week?: number;
  occurence?: number | [number, number];
  day: number;
  name: string;
  specialConditions?: (counter: Counter, j: number) => boolean;
};

export type StaticHolidays = {
  date: number;
  name: string;
  specialConditions?: (counter: Counter, j: number) => boolean;
};

export type Counter = {
  date: number;
  week: number;
  month: number;
  letterDays: number;
  occurence: number;
  occurenceCounter: number;
};
