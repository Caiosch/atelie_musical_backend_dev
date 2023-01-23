import { Button, HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { Row } from "../Row";

interface ButtonsEditingToggleProps {
  isEditing: ReturnType<typeof useDisclosure>;
  isLoading?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  confirmText?: string;
}

const ButtonsEditingToggle: React.FC<ButtonsEditingToggleProps> = ({
  isEditing,
  isLoading,
  onSave,
  onCancel,
  confirmText,
}) => {
  return (
    <Row>
      {!isEditing.isOpen && (
        <IconButton
          aria-label="Editar"
          size={"xs"}
          onClick={isEditing.onOpen}
          isLoading={isLoading}
        >
          {isEditing.isOpen ? <VscChromeClose /> : <AiOutlineEdit />}
        </IconButton>
      )}
      {isEditing.isOpen && (
        <HStack spacing={2}>
          <IconButton
            aria-label="Cancelar"
            size={"xs"}
            isLoading={isLoading}
            onClick={() => {
              onCancel?.();
            }}
            colorScheme={"red"}
            variant={"ghost"}
          >
            {isEditing.isOpen ? <VscChromeClose /> : <AiOutlineEdit />}
          </IconButton>
          {confirmText && (
            <Button
              size={"xs"}
              isLoading={isLoading}
              onClick={() => {
                onSave?.();
              }}
              colorScheme={"gray"}
              variant={"outline"}
              type={"submit"}
              leftIcon={<BsCheck size={16} />}
              _hover={{
                _dark: { color: "green.400", borderColor: "green.300" },
                color: "green.600",
                borderColor: "green.600",
              }}
            >
              {confirmText}
            </Button>
          )}
          {!confirmText && (
            <IconButton
              aria-label="Salvar"
              size={"xs"}
              isLoading={isLoading}
              onClick={() => {
                onSave?.();
              }}
              colorScheme={"gray"}
              _hover={{
                _dark: { color: "green.400", borderColor: "green.300" },
                color: "green.600",
                borderColor: "green.600",
              }}
              variant={"outline"}
              type={"submit"}
            >
              {isEditing.isOpen ? <BsCheck /> : <AiOutlineEdit />}
            </IconButton>
          )}
        </HStack>
      )}
    </Row>
  );
};

export default ButtonsEditingToggle;
