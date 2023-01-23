import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import { useAuth } from "@/components/providers/AuthProvider";
import { Col, Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import { ApiApp } from "@/services/api/api.app";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Square,
  useDisclosure,
  Checkbox,
  Link,
  Text,
  useBoolean,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { BsEnvelope, BsEye, BsEyeSlash } from "react-icons/bs";
import { Link as ReactLink } from "react-router-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (user: ApiApp.Entities.User) => void;
  onLogout?: () => void;
  onRegisterRequest?: () => void;
  onRecoveryRequest?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onLogout,
  onRegisterRequest,
  onRecoveryRequest,
}) => {
  const isShowPassword = useDisclosure();
  const form = useForm();
  const [isLoading, loading] = useBoolean();
  const { loginByEmail, isAuth, user, logout, dashboardPath, isAdmin } =
    useAuth();

  const submit = ({ data }: any) => {
    loading.on();
    loginByEmail(data)
      .then((user) => {
        onSubmit?.(user);
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
    <Modal isOpen={isOpen} onClose={onClose} size={"md"} isCentered>
      <ModalOverlay />
      <ModalContent
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
            {!isAuth ? "Login" : "Meu Perfil"}
          </Heading>
        </ModalHeader>
        <ModalCloseButton size={"lg"} mr={8} />
        {isAuth && (
          <ModalBody>
            <Col gap={6}>
              <ListView
                items={[
                  ["Nome", user!.name],
                  ["E-mail", user!.email],
                  [
                    "",
                    isAdmin && (
                      <Badge
                        bg={"primary.500"}
                        color={"black"}
                        fontSize={"4xl"}
                      >
                        Admin
                      </Badge>
                    ),
                  ],
                ]}
                render={([field, value]) => (
                  <Col fontFamily={"heading"}>
                    {field && (
                      <Heading
                        fontSize={"lg"}
                        textTransform={"uppercase"}
                        color={"primary.500"}
                        mb={2}
                      >
                        {field}
                      </Heading>
                    )}
                    <Heading fontFamily={"body"} fontSize={"2xl"}>
                      {value}
                    </Heading>
                  </Col>
                )}
              />
              <SimpleGrid gap={4} mt={8} columns={2}>
                <ListView
                  items={[
                    {
                      label: isAdmin ? "Área Administrativa" : "Editar Perfil",
                      to: dashboardPath,
                    },
                    {
                      label: "Pedidos",
                      to: isAdmin && "/admin",
                      onClick: onClose,
                      colorScheme: "gray",
                    },
                    {
                      label: "Usuários",
                      to: isAdmin && "/admin",
                      onClick: onClose,
                      colorScheme: "gray",
                    },
                    {
                      label: "Inscrições",
                      to: isAdmin && "/admin",
                      onClick: onClose,
                      colorScheme: "gray",
                    },
                    {
                      label: "Artistas",
                      to: isAdmin && "/admin",
                      onClick: onClose,
                      colorScheme: "gray",
                    },
                  ]}
                  render={({ label, to, onClick, colorScheme = "primary" }) =>
                    !to ? (
                      <></>
                    ) : (
                      <ReactLink to={to} onClick={onClick}>
                        <ButtonCTA
                          bg={"transparent"}
                          border={"3px solid transparent"}
                          borderColor={`${colorScheme}.500`}
                          _hover={{ bg: `${colorScheme}.500` }}
                          color={"white"}
                          w={"100%"}
                        >
                          {label}
                        </ButtonCTA>
                      </ReactLink>
                    )
                  }
                />

                <ButtonCTA
                  bg={"transparent"}
                  border={"3px solid transparent"}
                  borderColor={"red.500"}
                  _hover={{ bg: "red.500" }}
                  color={"white"}
                  w={"100%"}
                  onClick={() => {
                    logout().finally(() => {
                      onLogout?.();
                    });
                  }}
                >
                  Sair
                </ButtonCTA>
              </SimpleGrid>
            </Col>
          </ModalBody>
        )}
        {!isAuth && (
          <form onSubmit={form.handleSubmit(submit)}>
            <ModalBody>
              <Col gap={4}>
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
                      {...form.register("data.saveSession")}
                    />
                    <FormLabel m={0} fontSize={"md"} fontWeight={"bold"}>
                      Manter Logado
                    </FormLabel>
                  </FormControl>
                  {onRecoveryRequest && (
                    <Link px={4} py={2} onClick={onRecoveryRequest}>
                      Redefinir Senha
                    </Link>
                  )}
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
                  isLoading={isLoading}
                >
                  Entrar na Conta
                </ButtonCTA>
                {onRegisterRequest && (
                  <Row mt={4} fontSize={"lg"}>
                    <Text as={"span"}>Não tem conta?</Text>
                    <Link
                      color={"primary.400"}
                      px={2}
                      onClick={onRegisterRequest}
                    >
                      Criar Conta
                    </Link>
                  </Row>
                )}
              </Col>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
