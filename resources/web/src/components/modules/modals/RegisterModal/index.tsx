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
  Link,
  Text,
  Input,
  Square,
  useDisclosure,
  Checkbox,
  FormControl,
  FormLabel,
  useBoolean,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import {
  BsCheck,
  BsEnvelope,
  BsEye,
  BsEyeSlash,
  BsPerson,
} from "react-icons/bs";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  onLoginRequest?: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onLoginRequest,
}) => {
  const isShowPassword = useDisclosure();
  const isShowPasswordConfirmation = useDisclosure();
  const form = useForm();
  const [isLoading, loading] = useBoolean();

  const submit = ({ data }: any) => {
    loading.on();
    apiClient
      .addUser(data)
      .then(() => {
        onLoginRequest?.();
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
            <Heading
              size={"xl"}
              mt={12}
              mb={6}
              textAlign={"center"}
              color={"primary.500"}
              textTransform={"uppercase"}
            >
              Criar Conta
            </Heading>
          </ModalHeader>
          <ModalCloseButton size={"lg"} mr={8} />
          <form onSubmit={form.handleSubmit(submit)}>
            <ModalBody>
              <Col gap={4}>
                <InputRow
                  name={"data.name"}
                  icon={<BsPerson size={26} />}
                  placeholder={"Nome Completo"}
                />
                <InputRow
                  name={"data.email"}
                  icon={<BsEnvelope size={26} />}
                  placeholder={"E-mail"}
                />
                <InputRow
                  name={"data.password"}
                  placeholder={"Senha"}
                  type={isShowPassword.isOpen ? "text" : "password"}
                  icon={
                    <Square onClick={isShowPassword.onToggle}>
                      {isShowPassword.isOpen ? (
                        <BsEyeSlash size={26} />
                      ) : (
                        <BsEye size={26} />
                      )}
                    </Square>
                  }
                />
                <InputRow
                  name={"data.password_confirmation"}
                  placeholder={"Confirmar Senha"}
                  type={isShowPasswordConfirmation.isOpen ? "text" : "password"}
                  icon={
                    <Square onClick={isShowPasswordConfirmation.onToggle}>
                      {isShowPasswordConfirmation.isOpen ? (
                        <BsEyeSlash size={26} />
                      ) : (
                        <BsEye size={26} />
                      )}
                    </Square>
                  }
                />
                <Row gap={4}>
                  <FormControl
                    display={"flex"}
                    flexDir={"row"}
                    alignItems={"center"}
                    gap={2}
                    flex={1}
                  >
                    <Checkbox
                      colorScheme="primary"
                      {...form.register("data.acceptTerms")}
                    />
                    <FormLabel m={0} fontSize={"md"} fontWeight={"bold"}>
                      Aceitar Termos {"&"} Condições
                    </FormLabel>
                  </FormControl>
                </Row>
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
                <Row mt={4} fontSize={"lg"}>
                  <Text as={"span"}>Já possui conta?</Text>
                  <Link color={"primary.400"} px={2} onClick={onLoginRequest}>
                    Fazer Login
                  </Link>
                </Row>
              </Col>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegisterModal;
