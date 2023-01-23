import {
  Button,
  Circle,
  Heading,
  IconButton,
  IconButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { Col } from "..";

export interface ButtonConfirmProps extends IconButtonProps {
  _confirmation: {
    title: React.ReactNode;
    colorScheme?: string;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    showCancelText?: boolean;
  };
  onConfirm?: (data: { closeModal: () => void }) => void;
}

export const ButtonConfirm: React.FC<ButtonConfirmProps> = ({
  _confirmation,
  onConfirm,
  ...rest
}) => {
  const {
    title,
    cancelText = "Cancelar",
    confirmText = "Confirmar",
    description,
    icon = <AiOutlineCheck size={40} />,
    showCancelText = true,
    colorScheme = rest.colorScheme || "green",
  } = _confirmation;
  const borderColor = `${colorScheme}.400`;
  const textColor = `${colorScheme}.200`;
  const descriptionColor = `${colorScheme}.300`;
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <IconButton
        {...rest}
        onClick={(e: any) => {
          onOpen();

          rest.onClick?.(e);
        }}
      ></IconButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pt={14}>
            <Circle
              size={20}
              mx={"auto"}
              bg={"gray.800"}
              border={"4px solid transparent"}
              borderColor={borderColor}
              color={textColor}
            >
              {icon}
            </Circle>
            <Heading
              mt={4}
              lineHeight={"130%"}
              textAlign={"center"}
              size={"lg"}
              color={textColor}
            >
              {title}
            </Heading>
            {description && (
              <Text
                my={4}
                fontSize={"lg"}
                textAlign={"center"}
                fontFamily={"heading"}
              >
                {description}
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <SimpleGrid gap={2} columns={2} w={"100%"}>
              {showCancelText ? (
                <Button
                  variant={"ghost"}
                  onClick={onClose}
                  isLoading={rest.isLoading}
                >
                  {cancelText}
                </Button>
              ) : (
                <Col />
              )}
              <Button
                colorScheme={colorScheme}
                onClick={() => {
                  onConfirm?.({ closeModal: onClose });
                }}
                isLoading={rest.isLoading}
              >
                {confirmText}
              </Button>
            </SimpleGrid>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
