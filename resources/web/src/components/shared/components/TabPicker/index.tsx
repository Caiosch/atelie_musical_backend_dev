import React from "react";
import { Col } from "../Col";
import { Row } from "../Row";

interface TabPickerProps {
  value: string;
  onChange?: (nextValue: string) => void;
  options: Array<{
    value: string;
    label: React.ReactNode;
    description?: React.ReactNode;
  }>;
}

export const TabPicker: React.FC<TabPickerProps> = ({
  value,
  options,
  onChange,
}) => {
  const isActive = (opt: TabPickerProps["options"][0]) => {
    return opt.value === value;
  };

  return (
    <>
      {options.map((opt, keyOpt) => (
        <Col
          py={2}
          px={4}
          rounded={"sm"}
          key={`opt${keyOpt}${opt.value}`}
          bg={isActive(opt) ? "gray.200" : "transparent"}
          borderColor={isActive(opt) ? "gray.300" : "transparent"}
          border={"2px solid transparent"}
          cursor={"pointer"}
          userSelect={"none"}
          _dark={{
            bg: isActive(opt) ? "gray.600" : "transparent",
            borderColor: isActive(opt) ? "gray.500" : "transparent",
          }}
        >
          <Row fontSize={"sm"}>{opt.label}</Row>
          {opt.description && (
            <Row fontSize={"xs"} mt={1}>
              {opt.description}
            </Row>
          )}
        </Col>
      ))}
    </>
  );
};
