import { BoxPropFieldChildProps, Row } from "@/components/shared";
import {
  Menu,
  MenuButton,
  Button,
  Box,
  MenuList,
  MenuItem,
  Select,
} from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { set } from "react-hook-form";
import { AiOutlineDown } from "react-icons/ai";

const FieldOptions: React.FC<BoxPropFieldChildProps> = ({
  options,
  isEditing,
  onChange,
  value,
  selectedValue,
  confirm,
  focusRef,
}) => {
  return (
    <>
      {isEditing.isOpen && !!options && options.length <= 10 && (
        <Row flex={1}>
          <Menu>
            <MenuButton
              as={Button}
              size={"md"}
              variant={"unstyled"}
              w={"100%"}
              h={"100%"}
              textAlign={"left"}
              ref={focusRef}
            >
              <Row alignItems={"center"}>
                {selectedValue?.label || "Selecione..."}
                <Box ml={"auto"}>
                  <AiOutlineDown size={10} />
                </Box>
              </Row>
            </MenuButton>
            <MenuList border={0} rounded={"sm"} maxH={300} overflowY={"scroll"}>
              {options.map((option) => (
                <MenuItem
                  key={`opt${option.value}${option.label}`}
                  fontSize={"xs"}
                  onClick={() => {
                    onChange(`${option.value}`);
                    confirm();
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Row>
      )}
      {isEditing.isOpen && !!options && options.length > 10 && (
        <Row flex={1}>
          <Select
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              onChange(`${e.target.value}`);
              confirm();
            }}
            ref={focusRef}
            variant={"unstyled"}
            value={value}
          >
            {options.map((option) => (
              <option
                key={`opt${option.value}${option.label}`}
                value={`${option.value}`}
              >
                {option.label}
              </option>
            ))}
          </Select>
        </Row>
      )}
    </>
  );
};

export default FieldOptions;
