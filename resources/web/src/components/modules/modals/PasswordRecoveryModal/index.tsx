import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import { Col, Row } from "@/components/shared";
import { apiClient } from "@/services/clients/api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Square,
  useBoolean,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { BsEnvelope } from "react-icons/bs";

interface PasswordRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

const PasswordRecoveryModal: React.FC<PasswordRecoveryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const form = useForm();
  const [isLoading, loading] = useBoolean();

  const submit = ({ data }: any) => {
    loading.on();
    apiClient
      .recoveryPassword(data)
      .then(() => {
        onSubmit?.();
      })
      .finally(() => {
        loading.off();
      });
  };

  const InputRow = ({
    name,
    icon,
    placeholder,
    type = "text",
  }: {
    icon: React.ReactNode;
    name: string;
    placeholder?: string;
    type?: string;
  }) => {
    return (
      <Row pos={"relative"} _focusWithin={{ color: "primary.500" }}>
        <Input
          flex={1}
          w={"100%"}
          color={"white"}
          placeholder={placeholder}
          fontSize={"lg"}
          size={"lg"}
          focusBorderColor={"primary.500"}
          type={type}
          {...form.register(name)}
        />
        <Square
          zIndex={20}
          size={12}
          pos={"absolute"}
          aria-label={"Envelope"}
          right={0}
          top={0}
        >
          {icon}
        </Square>
      </Row>
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"md"} isCentered>
        <ModalOverlay />
        <ModalContent
          maxH={"90%"}
          rounded={"50px"}
          mx={4}
          my={2}
          bg={"gray.700"}
          color={"primary.50"}
          px={6}
          py={4}
        >
          <ModalHeader>
            <Col>
              <Heading
                size={"xl"}
                mt={12}
                mb={4}
                textAlign={"center"}
                color={"primary.500"}
                textTransform={"uppercase"}
              >
                Recuperar Senha
              </Heading>
              <Heading
                size={"md"}
                mb={6}
                textAlign={"center"}
                color={"primary.50"}
                fontFamily={"body"}
              >
                Insira seu e-mail para receber o link de recuperação
              </Heading>
            </Col>
          </ModalHeader>
          <ModalCloseButton size={"lg"} mr={8} />
          <form onSubmit={form.handleSubmit(submit)}>
            <ModalBody>
              <Col gap={4}>
                <InputRow
                  name={"data.email"}
                  icon={<BsEnvelope size={26} />}
                  placeholder={"Email"}
                />
              </Col>
            </ModalBody>

            <ModalFooter>
              <Col justifyContent={"center"} alignItems={"center"} w={"100%"}>
                <ButtonCTA
                  textTransform={"none"}
                  color={"gray.700"}
                  rounded={"xl"}
                  bg={"primary.100"}
                  fontSize={"lg"}
                  fontWeight={"bold"}
                  mx={"auto"}
                  h={8}
                  _hover={{ boxShadow: "lg" }}
                  type={"submit"}
                  w={"full"}
                  isLoading={isLoading}
                >
                  Criar Conta
                </ButtonCTA>
              </Col>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PasswordRecoveryModal;
