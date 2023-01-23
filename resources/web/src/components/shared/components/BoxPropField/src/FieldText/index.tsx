import { Input } from "@chakra-ui/react";
import React, { ChangeEvent, memo } from "react";
import { BoxPropFieldChildProps } from "../..";
import { Row } from "../../../Row";

const FieldText: React.FC<BoxPropFieldChildProps> = ({
  isEditing,
  options,
  focusRef,
  onChange,
  value,
  confirm,
}) => {
  return (
    <>
      {isEditing.isOpen && !options && (
        <Row flex={1}>
          <Input
            size={"xs"}
            variant={"unstyled"}
            value={value}
            fontSize={"sm"}
            fontWeight={"bold"}
            ref={focusRef}
            onBlur={() => {
              setTimeout(() => {
                if (isEditing.isOpen) {
                  confirm();
                }
              }, 150);
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === "") {
                onChange(undefined);
                return;
              }
              onChange(e.target.value);
            }}
          />
        </Row>
      )}
    </>
  );
};

export default memo(FieldText);
