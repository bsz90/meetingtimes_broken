import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close,
} from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import * as Separator from "@radix-ui/react-separator";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { defaultSettings } from "./constants";
import { Settings } from "./types";
import { deepCopy, deepEquals, newArray, uniqueKey } from "./utils";
import { SettingsScrollArea } from "./SettingsScrollArea";
import { SettingsCategories } from "./SettingsCategories";

export const AppSettings = ({
  settings,
  setSettings,
}: {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
}) => {
  const [proDevDays, setProDevDays] = useState<number | undefined>(undefined);
  const [data, setData] = useState(newArray(4, 1, ""));
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("General");
  const [newSettings, setNewSettings] = useState(settings);

  const disabled = useMemo(
    () => deepEquals(settings, newSettings),
    [newSettings, settings]
  );

  return (
    <div className="min-w-[600px] border-2 capitalize flex flex-col rounded-2xl bg-blue-200/95 overflow-hidden">
      <Root open={open} modal={true}>
        <Trigger
          className="w-32 h-12 bg-white rounded-xl text-blue-500"
          onClick={() => setOpen(true)}
        >
          Settings
        </Trigger>
        <Portal className="h-full w-full">
          <Overlay className="fixed top-0 h-full w-full bg-gray-400/50  flex items-center justify-center" />
          <Content className="fixed top-0 h-full w-full flex items-center justify-center ">
            <div className="w-[1000px] h-[600px] bg-white overflow-hidden rounded-xl flex flex-col items-center drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]">
              <Tabs.Root
                className="w-full h-full flex flex-row  bg-blue-100/25"
                defaultValue="General"
                orientation="vertical"
              >
                <SettingsCategories
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
                <Separator.Root
                  className="h-full min-w-[1px] border-blue-200 border bg-blue-200"
                  decorative
                  orientation="vertical"
                />
                <div className="w-full flex flex-col justify-between bg-white">
                  <div className="w-full flex justify-end mb-4 pt-4 pr-4">
                    <Close
                      className="w-10 h-10 text-xs flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
                      onClick={() => {
                        setSettings(deepCopy(defaultSettings));
                        setOpen(false);
                      }}
                    >
                      &#10005;
                    </Close>
                  </div>
                  <ScrollArea.Root className="w-full flex flex-col justify-betweenp-4 overflow-hidden">
                    <Tabs.Content className="w-full" value={selectedTab}>
                      <SettingsScrollArea
                        selectedTab={selectedTab}
                        settings={settings}
                        setSettings={setSettings}
                        newSettings={newSettings}
                        setNewSettings={setNewSettings}
                      ></SettingsScrollArea>
                    </Tabs.Content>
                  </ScrollArea.Root>
                  <div className="w-full flex items-center justify-center px-2 pb-20 gap-16">
                    <button
                      className={`h-12 w-40 bg-none text-blue-400 rounded-lg drop-shadow-lg`}
                      onClick={() => {
                        setSettings(deepCopy(defaultSettings));
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className={`h-12 w-40 ${
                        disabled ? "bg-blue-200" : "bg-blue-500"
                      } rounded-lg drop-shadow-lg`}
                      disabled={disabled}
                      onClick={() => {
                        setSettings(deepCopy(newSettings));
                        setOpen(false);
                      }}
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
              </Tabs.Root>
            </div>
          </Content>
        </Portal>
      </Root>
    </div>
  );
};
