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
import { uniqueKey } from "./utils";

export const Select = ({
  content,
  value,
  handleClick,
}: {
  content: string[];
  value: string;
  handleClick: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Root open={open}>
      <Trigger
        onKeyDown={(e) => console.log(e)}
        onClick={() => setOpen(true)}
        className={`h-10 flex justify-between items-center border-2 py-4 px-4 border-blue-300 bg-white rounded-lg bg-white drop-shadow-md`}
      >
        <Value>{value}</Value>
        {/* <Icon className="w-4 h-4 flex items-center justify-center text-[10px]"></Icon> */}
      </Trigger>
      <Portal>
        <Content
          className="h-60  bg-white drop-shadow-[0_25px_25px_rgba(0,0,0,0.50)] rounded-lg "
          onEscapeKeyDown={() => setOpen(false)}
          onPointerDownOutside={() => setOpen(false)}
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
              {content.map((value: string) => {
                return (
                  <Item
                    className={`flex items-center justify-center px-4 h-8 rounded-md mx-4 bg-white text-blue-500 hover:bg-blue-500 hover:text-white select-none }`}
                    key={uniqueKey()}
                    value={JSON.stringify(value)}
                    onClick={() => {
                      handleClick(value);
                      setOpen(false);
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
  );
};
