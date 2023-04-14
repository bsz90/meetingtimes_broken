import { Title } from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { Dispatch, SetStateAction } from "react";
import { settingsCategories } from "./constants";
import { uniqueKey } from "./utils";

export const SettingsCategories = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="w-1/3 h-full rounded-xl text-blue-500  items-start justify-start ">
      <Title asChild>
        <div className="h-10 w-full flex items-center justify-between text-blue-500 text-3xl px-4 py-14 drop-shadow-sm ">
          <div className="px-4">Settings</div>
        </div>
      </Title>
      <Tabs.List className="flex flex-col mx-6 gap-1">
        {settingsCategories.map((cat, id) => {
          const active = selectedTab === cat;
          return (
            <Tabs.Trigger
              key={`${cat}${uniqueKey()}`}
              className={`group h-10 w-52 p-4 hover:bg-blue-500 hover:text-white  ${
                active ? "bg-blue-300 text-white" : ""
              } rounded-lg flex items-center`}
              onClick={() => setSelectedTab(cat)}
              value={cat}
            >
              <span
                className={`${
                  active ? "bg-[#A3E635]" : "bg-none"
                } h-2 w-2 rounded-full mr-4`}
              ></span>
              <p>{cat}</p>
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
    </div>
  );
};
