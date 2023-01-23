import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Text,
  MenuProps,
  ButtonProps,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { Row } from "..";

interface AppMenuPickerProps {
  options: Array<{
    title: React.ReactNode;
    description?: string;
    value: string;
  }>;
  forceOverwrite?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  _menu?: Partial<MenuProps>;
  _button?: Partial<ButtonProps>;
}

export const AppMenuPicker: React.NextFC<AppMenuPickerProps> = ({
  options,
  value,
  onChange,
  children,
  forceOverwrite = false,
  _menu,
  _button,
}) => {
  const [currentValue, setValue] = useState(value);
  const label = useMemo(() => {
    return options.find((o) => o.value === currentValue)?.title || children;
  }, [currentValue]);

  useEffect(() => {
    setValue(() => value);
  }, [value]);

  useEffect(() => {
    if (value !== undefined && currentValue !== value) {
      setValue(() => value);
    }
  }, [currentValue]);

  return (
    <>
      <Menu {..._menu}>
        <MenuButton as={Button} rounded={"none"} {..._button}>
          {label}
        </MenuButton>
        <MenuList rounded={"sm"} border={0}>
          {options.map((option, keyOption) => (
            <MenuItem
              bg={currentValue === option.value ? "primary.500" : undefined}
              color={currentValue === option.value ? "primary.900" : undefined}
              _hover={currentValue === option.value ? {} : undefined}
              _focus={currentValue === option.value ? {} : undefined}
              display={"flex"}
              flexDir={"column"}
              key={`option${keyOption}`}
              onClick={() => {
                if (forceOverwrite || value === undefined) {
                  onChange?.(option.value);
                  setValue(() => option.value);
                }
              }}
            >
              <Row
                fontFamily={"heading"}
                fontSize={"sm"}
                textAlign={"left"}
                w={"100%"}
              >
                {option.title}
              </Row>
              {option.description && (
                <Text fontSize={"xs"} textAlign={"left"} w={"100%"}>
                  {option.description}
                </Text>
              )}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};
