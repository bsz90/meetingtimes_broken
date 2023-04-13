import { RelationalOperatorOrHigher } from "typescript";

export type Holiday = DynamicDay | StaticDay;

export type ReligiousHolidays = (year: number) => Date;

export type Holidays = {
  [key: string]: Date;
};

export type Breaks = {
  [key: string]: Date[];
};

export type DynamicDay = {
  dateRange: [number, number];
  week?: number;
  occurence?: number | number[];
  month: number;
  day: number;
  name: string;
  determineDate?: (year: number) => Date;
};

export type StaticDay = {
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

export type Settings = {
  schoolYear: number[];
  firstDay: Date;
  totalDays: number;
  daysInCycle: number;
  classPeriodsPerDay: number;
  holidays: Holidays;
  breaks: Breaks;
  proDevDays: Date[];
  customDays: Date[];
};

export type SettingKey = keyof Settings;

export type Period = {
  name: string;
  time: number;
  type: "class" | "free" | "meeting" | "lunch";
};
