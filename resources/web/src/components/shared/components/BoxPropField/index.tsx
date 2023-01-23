import {
  Box,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, {
  ChangeEvent,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import { AiOutlineDown } from "react-icons/ai";
import { RetryValue } from "react-query/types/core/retryer";
import ButtonsEditingToggle from "../ButtonsEditingToggle";
import { Col } from "../Col";
import { Row } from "../Row";
import FieldOptions from "./src/FieldOptions";
import FieldText from "./src/FieldText";

interface BoxPropFieldProps {
  title: string;
  name: string;
  type?: "text" | "options";
  options?: Array<{ label: string; value: string | number }>;
  onChange?: (value: string) => void;
  canEdit?: boolean;
  prefix?: string;
}

type SelectedValue = { label: string; value: string | number } | undefined;

export interface BoxPropFieldChildProps extends BoxPropFieldProps {
  value: any;
  isEditing: ReturnType<typeof useDisclosure>;
  focusRef: React.RefObject<any>;
  onChange: (value: string | undefined) => void;
  selectedValue: SelectedValue;
  confirm: () => void;
  cancel: () => void;
}

const Field: React.FC<BoxPropFieldProps> = (props) => {
  const { title, name, canEdit, options, onChange, prefix } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [initialValue, setInitialValue] = useState<string | undefined>("");
  const { setValue, watch } = useFormContext();
  const value = watch()[name];
  const isUndefined = useMemo(() => {
    return (
      value === "null" ||
      value === "undefined" ||
      value === null ||
      value === undefined ||
      value === ""
    );
  }, [value]);

  const selectedValue = useMemo(() => {
    return options && options.find((i) => `${i.value}` === `${value}`);
  }, [options, value]);

  const isGray = useMemo(() => {
    return isUndefined;
  }, [isUndefined]);

  const reallyValue = useMemo(() => {
    if (isUndefined) {
      return undefined;
    }

    if (options?.length && selectedValue) {
      return selectedValue?.label;
    }

    return value;
  }, [isUndefined, value]);

  const isEditing = useDisclosure();

  const set = (value: string | undefined) => {
    setValue(name, value);
  };

  const confirm = () => {
    onChange?.(value || "");
    isEditing.onClose();
  };

  const cancel = () => {
    set(initialValue);
    onChange?.(initialValue || "");
    isEditing.onClose();
  };

  useEffect(() => {
    if (isEditing.isOpen) {
      set(value || "");
      setInitialValue(() => value);

      inputRef.current?.focus();
    }
  }, [isEditing.isOpen]);

  const childProps: BoxPropFieldChildProps = useMemo(() => {
    return {
      ...props,
      value,
      isEditing: isEditing,
      focusRef: inputRef,
      onChange: set,
      selectedValue,
      confirm,
      cancel,
    };
  }, [props, value, isEditing, selectedValue]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Col>
        <Row fontSize={"xs"} color={"GrayText"} fontWeight={"normal"}>
          {title}
        </Row>
        <Row fontSize={"md"} mt={1} alignItems={"center"}>
          <FieldText {...childProps} />
          <FieldOptions {...childProps} />

          {!isEditing.isOpen && (
            <Row
              flex={1}
              fontWeight={"bold"}
              color={isGray ? "GrayText" : "inherit"}
              fontStyle={isUndefined ? "italic" : "normal"}
              onClick={canEdit ? isEditing.onOpen : () => {}}
              cursor={canEdit ? "pointer" : "default"}
            >
              {reallyValue || "null"}
            </Row>
          )}
          {canEdit && (
            <ButtonsEditingToggle
              isEditing={isEditing}
              onCancel={cancel}
              onSave={confirm}
            />
          )}
        </Row>
      </Col>
    </form>
  );
};

export const BoxPropField = memo(Field);
