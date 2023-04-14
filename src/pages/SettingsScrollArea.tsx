import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Tabs from "@radix-ui/react-tabs";
import { Dispatch, SetStateAction, useState } from "react";
import { Select } from "./Select";
import { SelectDate } from "./SelectDate";
import { Settings } from "./types";
import { deepCopy } from "./utils";

export const SettingsScrollArea = ({
  selectedTab,
  settings,
  setSettings,
  newSettings,
  setNewSettings,
}: {
  selectedTab: string;
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
  newSettings: Settings;
  setNewSettings: Dispatch<SetStateAction<Settings>>;
}) => {
  function getYearsArray() {
    const currentYear = new Date().getFullYear();
    const pastYears = Array.from(
      { length: 15 },
      (_, index) => currentYear - index - 1
    );
    const futureYears = Array.from(
      { length: 15 },
      (_, index) => currentYear + index + 1
    );

    const allYears = [...pastYears.reverse(), currentYear, ...futureYears].map(
      (year) => toSchoolYear(year)
    );
    return allYears;
  }

  function toSchoolYear(year: number) {
    const nextYear = year + 1;
    return `${year} - ${nextYear}`;
  }

  function fromSchoolYearString(schoolYear: string): number[] {
    const [startYearStr] = schoolYear.split(" - ");

    const startYear = parseInt(startYearStr, 10);
    return [startYear, startYear + 1];
  }

  function getNumberRange(n: number) {
    const start = n - 15;
    const end = n + 15;
    const range = Array.from({ length: end - start + 1 }, (_, i) => {
      const num = start + i;
      return num.toString();
    });
    return range;
  }

  const dayCycle = Array.from({ length: 20 }, (_, id) => (id + 1).toString());

  return (
    <ScrollArea.Viewport className="h-full w-full text-blue-500 px-28">
      <div className="h-full flex flex-col gap-8 py-12 border-2 border-gray-300 rounded-xl px-24 text-md">
        <div className="w-full flex items-center justify-between">
          <div className="text-md">School Year: </div>
          <Select
            content={getYearsArray()}
            value={toSchoolYear(newSettings.schoolYear[0])}
            handleClick={(value: string) =>
              setNewSettings((prev) => {
                let newState = {
                  ...deepCopy(prev),
                  schoolYear: fromSchoolYearString(value),
                };
                return newState;
              })
            }
          />
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="text-md">First Day: </div>
          <SelectDate
            content={getYearsArray()}
            value={newSettings.firstDay}
            handleClick={(value: string) => {
              console.log(value);
              const newDateParam = value.split("/");
              setNewSettings((prev) => {
                const firstDay = new Date(
                  +newDateParam[2],
                  +newDateParam[0] - 1,
                  +newDateParam[1] - 1
                );

                const newState = {
                  ...deepCopy(prev),
                  firstDay: firstDay,
                };
                return newState;
              });
            }}
          />
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="">Total School Days: </div>
          <div className="">
            <Select
              content={getNumberRange(settings.totalDays)}
              value={newSettings.totalDays.toString()}
              handleClick={(value: string) =>
                setNewSettings((prev) => {
                  let newState = {
                    ...deepCopy(prev),
                    totalDays: +value,
                  };
                  return newState;
                })
              }
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="">Days In Schedule Cycle</div>
          <div className="">
            <Select
              content={dayCycle}
              value={newSettings.daysInCycle.toString()}
              handleClick={(value: string) =>
                setNewSettings((prev) => {
                  let newState = {
                    ...deepCopy(prev),
                    daysInCycle: +value,
                  };
                  return newState;
                })
              }
            />
          </div>
        </div>
        <ScrollArea.ScrollAreaScrollbar className="w-4 h-full bg-gray-400">
          <ScrollArea.Thumb className="h-4 w-4 bg-gray-200 rounded-full" />
        </ScrollArea.ScrollAreaScrollbar>
      </div>
    </ScrollArea.Viewport>
  );
};
