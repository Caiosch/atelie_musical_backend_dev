import CommonMasterPage from "@/components/layout/pages/common/CommonMasterPage";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import MenuTopSpacing from "@/components/layout/shared/MenuTopSpacing";
import { Col, Row } from "@/components/shared";
import { apiClient } from "@/services/clients/api";
import {
  Heading,
  Input,
  Square,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordPage: React.FC = () => {
  const form = useForm();
  const isShowPassword = useDisclosure();
  const isShowPasswordConfirmation = useDisclosure();
  const { token } = useParams();
  const to = useNavigate();
  const [isLoading, loading] = useBoolean();

  const onSubmit = ({ data }: any) => {
    loading.on();
    apiClient
      .resetPassword({ ...data, token })
      .then(() => {
        to("/");
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
          borderColor={"primary.100"}
          type={type}
          {...form.register(name)}
        />
        <Square
          zIndex={20}
          size={12}
          pos={"absolute"}
          aria-label={"Envelope"}
          color={"primary.500"}
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
      <CommonMasterPage>
        <Col minH={"100vh"} w={"100%"} bg={"gray.800"}>
          <MenuTopSpacing />
          <Col flex={1} alignItems={"center"} justifyContent={"center"}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Col w={300} maxW={"100%"} gap={4} opacity={isLoading ? 0.5 : 1}>
                <Heading
                  textTransform={"uppercase"}
                  color={"primary.500"}
                  size={"lg"}
                  textAlign={"center"}
                  fontFamily={"body"}
                  mb={2}
                >
                  Redefinir Senha
                </Heading>
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
                <ButtonCTA
                  rounded={"xl"}
                  bg={"primary.100"}
                  color={"gray.700"}
                  textTransform={"none"}
                  fontSize={"lg"}
                  type={"submit"}
                  isLoading={isLoading}
                >
                  Salvar senha
                </ButtonCTA>
              </Col>
            </form>
          </Col>
        </Col>
      </CommonMasterPage>
    </>
  );
};

export default ResetPasswordPage;
