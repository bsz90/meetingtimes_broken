import {
  Content,
  Group,
  Icon,
  Item,
  ItemText,
  Label,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Separator,
  Trigger,
  Value,
  Viewport,
} from "@radix-ui/react-select";
import { useState } from "react";
import { Month } from "./constants";
import { uniqueKey } from "./utils";

export const SelectDate = ({
  content,
  value,
  handleClick,
}: {
  content: string[];
  value: Date;
  handleClick: (value: string) => void;
}) => {
  const initDate = value.toLocaleDateString();
  const [open, setOpen] = useState([false, false]);
  const [newDate, setNewDate] = useState(initDate);
  const dateArray = initDate.split("/");

  const toggleOpen = (id: number) =>
    setOpen((prev) => {
      const newState = [...prev];
      newState[id] = !prev[id];
      return newState;
    });

  const months = Array.from({ length: 12 }, (_, index) =>
    (index + 1).toString()
  );
  const days = Array.from(
    {
      length: new Date(
        +newDate.split("/")[2],
        +newDate.split("/")[0] + 1,
        0
      ).getDate(),
    },
    (_, index) => (index + 1).toString()
  );

  return (
    <div className="flex items-center gap-4">
      <Root open={open[0]}>
        <Trigger
          onClick={() => toggleOpen(0)}
          className={`h-10 w-14 flex justify-center items-center border-2 py-4 px-4 border-blue-300 bg-white rounded-lg bg-white drop-shadow-md`}
        >
          <Value>{dateArray[0]}</Value>
        </Trigger>
        <Portal>
          <Content
            className="h-60  bg-white drop-shadow-[0_25px_25px_rgba(0,0,0,0.50)] rounded-lg "
            onEscapeKeyDown={() => toggleOpen(0)}
            onPointerDownOutside={() => toggleOpen(0)}
            position="popper"
            avoidCollisions={false}
            sideOffset={-125}
          >
            <ScrollUpButton className=" h-8 text-blue-500 flex items-center justify-center">
              &uarr;
            </ScrollUpButton>
            <Viewport>
              <Group className="overflow-visible">
                <Separator className="h-4" />
                {months.map((value) => {
                  return (
                    <Item
                      className={`flex items-center justify-center px-4 h-8 rounded-md mx-4 bg-white text-blue-500 hover:bg-blue-500 hover:text-white select-none }`}
                      key={uniqueKey()}
                      value={JSON.stringify(value)}
                      onClick={() => {
                        setNewDate((prev) => {
                          const newState = prev.split("/");
                          newState[0] = value;
                          return newState.join("/");
                        });
                        handleClick(newDate);
                        toggleOpen(0);
                      }}
                    >
                      <ItemText>{value}</ItemText>
                    </Item>
                  );
                })}
                <Separator className="h-4" />
              </Group>
            </Viewport>
            <ScrollDownButton className="w-full h-8 text-blue-500 flex items-center justify-center">
              &darr;
            </ScrollDownButton>
          </Content>
        </Portal>
      </Root>
      {" / "}
      <Root open={open[1]}>
        <Trigger
          onClick={() => toggleOpen(1)}
          className={`h-10 w-14 flex justify-center items-center border-2 py-4 px-4 border-blue-300 bg-white rounded-lg bg-white drop-shadow-md`}
        >
          <Value>{dateArray[1]}</Value>
        </Trigger>
        <Portal>
          <Content
            className="h-60  bg-white drop-shadow-[0_25px_25px_rgba(0,0,0,0.50)] rounded-lg "
            onEscapeKeyDown={() => toggleOpen(1)}
            onPointerDownOutside={() => toggleOpen(1)}
            position="popper"
            avoidCollisions={false}
            sideOffset={-125}
          >
            <ScrollUpButton className="h-8 text-blue-500 flex items-center justify-center">
              &uarr;
            </ScrollUpButton>
            <Viewport>
              <Group className="overflow-visible">
                <Separator className="h-4" />
                {days.map((value) => {
                  return (
                    <Item
                      className={`flex items-center justify-center px-4 h-8 rounded-md mx-4 bg-white text-blue-500 hover:bg-blue-500 hover:text-white select-none }`}
                      key={uniqueKey()}
                      value={JSON.stringify(value)}
                      onClick={() => {
                        setNewDate((prev) => {
                          const newState = prev.split("/");
                          newState[1] = value;
                          return newState.join("/");
                        });
                        handleClick(newDate);
                        toggleOpen(1);
                      }}
                    >
                      <ItemText>{value}</ItemText>
                    </Item>
                  );
                })}
                <Separator className="h-4" />
              </Group>
            </Viewport>
            <ScrollDownButton className="w-full h-8 text-blue-500 flex items-center justify-center">
              &darr;
            </ScrollDownButton>
          </Content>
        </Portal>
      </Root>
    </div>
  );
};
