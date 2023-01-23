import { getInputTextProps } from "@/components/fields/factories";
import FieldWrap from "@/components/fields/FieldWrap";
import CommonMasterPage from "@/components/layout/pages/common/CommonMasterPage";
import FooterPage from "@/components/layout/pages/common/FooterPage";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import MenuTopSpacing from "@/components/layout/shared/MenuTopSpacing";
import LoginModal from "@/components/modules/modals/LoginModal";
import RegisterModal from "@/components/modules/modals/RegisterModal";
import RequestMusicPriceLg from "@/components/modules/request/RequestMusicPriceLg";
import { useAuth } from "@/components/providers/AuthProvider";
import { Col, Content, Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import { toBRL } from "@/helpers/currency/toBRL";
import { useRequestMusicQuery } from "@/hooks/api/useRequestMusicQuery";
import { RequestMusicMapper } from "@/services/app/mappers/request-mapper";
import { apiClient } from "@/services/clients/api";
import {
  Circle,
  Heading,
  Input,
  SimpleGrid,
  Square,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

interface CheckoutPageProps {}

const CheckoutPage: React.FC<CheckoutPageProps> = () => {
  const { isAuth } = useAuth();
  const title = "Finalize seu cadastro";
  const checkoutForm = useForm();
  const checkoutFormData = checkoutForm.watch();
  const showLogin = useDisclosure();
  const showRegister = useDisclosure();
  const { requestId } = useParams();
  const to = useNavigate();
  const { data: requestMusic } = useRequestMusicQuery(requestId!);

  useEffect(() => {
    if (isAuth && requestId) {
      apiClient.setMusicRequest(requestId, {}).then(() => {
        to(`/accpanel/request/${requestId}`);
      });
      // apiClient.registerMusicRequestOrder(requestId!, 'paypal')
    }
  }, [isAuth]);

  if (!requestMusic) return <></>;

  return (
    <CommonMasterPage>
      <Col bg={"secondary.700"} color={"primary.50"} px={8} minH={"90vh"}>
        <MenuTopSpacing />
        <LoginModal
          {...showLogin}
          onRegisterRequest={() => {
            showLogin.onClose();
            setTimeout(() => {
              showRegister.onOpen();
            }, 100);
          }}
        />
        <RegisterModal
          {...showRegister}
          onLoginRequest={() => {
            showRegister.onClose();
            setTimeout(() => {
              showLogin.onOpen();
            }, 100);
          }}
        />
        {!isAuth && (
          <Content maxW={"100%"} w={400} my={20}>
            <Heading size={"2xl"} mb={4}>
              Faça o{" "}
              <Text as={"span"} color={"primary.500"}>
                Login
              </Text>{" "}
              para prosseguir
            </Heading>
            <Col gap={6} p={8}>
              <ButtonCTA
                bg={"primary.500"}
                color={"primary.50"}
                onClick={showLogin.onOpen}
              >
                Faça o Login
              </ButtonCTA>
              <Row alignItems={"center"} justifyContent={"center"}>
                <Circle
                  size={10}
                  border={"2px solid transparent"}
                  borderColor={"primary.50"}
                  fontWeight={"bold"}
                  color={"primary.50"}
                  fontSize={"sm"}
                  bg={"primary.500"}
                >
                  Ou
                </Circle>
              </Row>
              <ButtonCTA
                bg={"primary.50"}
                color={"primary.500"}
                onClick={showRegister.onOpen}
              >
                Cadastre-se
              </ButtonCTA>
            </Col>
            <Col gap={4}>
              <RequestMusicPriceLg requestMusic={requestMusic} />
              <ListView
                items={RequestMusicMapper.toLabelList(requestMusic)}
                render={(v) => {
                  return (
                    <Row alignItems={"center"}>
                      <Row
                        flexDir={v.flexDir as any}
                        alignItems={v.flexDir === "row" ? "center" : undefined}
                      >
                        {v.icon && (
                          <Square mr={2} size={8}>
                            {v.icon}
                          </Square>
                        )}
                        <Text
                          fontWeight={"bold"}
                          textTransform={"uppercase"}
                          flex={1}
                          mr={2}
                        >
                          {v.label}:
                        </Text>
                        <Text color={"primary.400"}>{v.value}</Text>
                      </Row>
                    </Row>
                  );
                }}
              />
            </Col>
          </Content>
        )}
        {false && (
          <Content>
            <Heading size={"2xl"} mb={4}>
              {title}
            </Heading>
            {!isAuth && (
              <Col gap={4}>
                <FieldWrap label={"E-Mail*"}>
                  <Input
                    {...getInputTextProps()}
                    {...checkoutForm.register("data.user.email")}
                    placeholder={"Ex: alguem@mail.com"}
                  />
                </FieldWrap>
                <FieldWrap label={"WhatsApp"} description={"Opcional"}>
                  <Input
                    {...getInputTextProps()}
                    {...checkoutForm.register("data.user.phoneNumber")}
                    placeholder={"(11) 91234-5678"}
                  />
                </FieldWrap>
                <FieldWrap label={"Crie uma senha"}>
                  <Input
                    {...getInputTextProps()}
                    {...checkoutForm.register("data.user.password")}
                    placeholder={"***********"}
                    type={"password"}
                  />
                </FieldWrap>
                <SimpleGrid gap={2} columns={2}>
                  <ListView
                    items={[
                      {
                        label: "PIX",
                        description: "Com desconto, 50% off!",
                        value: "pix",
                      },
                      {
                        label: "Cartão de Crédito",
                        description: "Em até 12x no cartão",
                        value: "credit-card",
                      },
                    ]}
                    render={(item) => {
                      const paymentMethod =
                        checkoutFormData.data?.paymentMethod;
                      const isActive = paymentMethod === item.value;

                      return (
                        <Col>
                          <ButtonCTA
                            bg={!isActive ? "primary.50" : "primary.500"}
                            color={!isActive ? "primary.500" : "primary.50"}
                            onClick={() => {
                              checkoutForm.setValue(
                                "data.paymentMethod",
                                item.value
                              );
                            }}
                            py={2}
                            fontSize={"xs"}
                          >
                            {item.label}
                          </ButtonCTA>
                          <Text
                            textAlign={"center"}
                            fontSize={"10px"}
                            fontStyle={"italic"}
                            textTransform={"uppercase"}
                            mt={1}
                          >
                            {item.description}
                          </Text>
                        </Col>
                      );
                    }}
                  />
                </SimpleGrid>
              </Col>
            )}
          </Content>
        )}
        {false && (
          <Content>
            <Heading
              mt={4}
              mb={2}
              fontWeight={100}
              textTransform={"uppercase"}
              color={"primary.50"}
              size={"lg"}
            >
              Finalize Sua Compra
            </Heading>

            <Col gap={4}>
              <FieldWrap label={"Nome Completo"}>
                <Input
                  {...getInputTextProps()}
                  {...checkoutForm.register("data.checkout.fullName")}
                  placeholder={"JENNIFER JON LOPES"}
                />
              </FieldWrap>
              <FieldWrap label={"CPF"}>
                <Input
                  {...getInputTextProps()}
                  {...checkoutForm.register("data.checkout.cpf")}
                  placeholder={"xxx.xxx.xxx-xx"}
                />
              </FieldWrap>
              <FieldWrap label={"Nascimento"}>
                <Input
                  {...getInputTextProps()}
                  {...checkoutForm.register("data.checkout.cpf")}
                  type={"date"}
                />
              </FieldWrap>
              <FieldWrap label={"CEP"}>
                <Input
                  {...getInputTextProps()}
                  {...checkoutForm.register("data.checkout.cep")}
                  placeholder={"xxxxx-xx"}
                />
              </FieldWrap>
              <FieldWrap label={"Endereço"}>
                <Input
                  {...getInputTextProps()}
                  {...checkoutForm.register("data.checkout.address")}
                  placeholder={"Endereço"}
                />
              </FieldWrap>
              <FieldWrap label={"Complemento"}>
                <Input
                  {...getInputTextProps()}
                  {...checkoutForm.register("data.checkout.complement")}
                  placeholder={"Complemento"}
                />
              </FieldWrap>
              <FieldWrap label={"Cidade"}>
                <Input
                  {...getInputTextProps()}
                  {...checkoutForm.register("data.checkout.city")}
                  placeholder={"Cidade"}
                />
              </FieldWrap>
              <FieldWrap label={"País"}>
                <Input
                  {...getInputTextProps()}
                  {...checkoutForm.register("data.checkout.country")}
                  placeholder={"País"}
                />
              </FieldWrap>
            </Col>
            <Heading
              mt={4}
              mb={2}
              fontWeight={100}
              textTransform={"uppercase"}
              color={"primary.50"}
              size={"lg"}
            >
              Dados do Cartão
            </Heading>
            <Col gap={4}>
              <FieldWrap label={"Nome do Cartão"}>
                <Input
                  {...getInputTextProps()}
                  {...checkoutForm.register("data.card.name")}
                  placeholder={"Nome do Cartão"}
                />
              </FieldWrap>
              <FieldWrap label={"Número do Cartão"}>
                <Input
                  {...getInputTextProps()}
                  {...checkoutForm.register("data.card.name")}
                  placeholder={"Número do Cartão"}
                />
              </FieldWrap>
              <FieldWrap label={"Mês vencimento"}>
                <Input
                  {...getInputTextProps()}
                  {...checkoutForm.register("data.card.name")}
                  placeholder={"Mês vencimento"}
                />
              </FieldWrap>
              <FieldWrap label={"Ano vencimento"}>
                <Input
                  {...getInputTextProps()}
                  {...checkoutForm.register("data.card.name")}
                  placeholder={"Ano vencimento"}
                />
              </FieldWrap>
              <FieldWrap label={"CVV"}>
                <Input
                  {...getInputTextProps()}
                  {...checkoutForm.register("data.card.name")}
                  placeholder={"CVV"}
                />
              </FieldWrap>
            </Col>
            <Row alignItems={"center"} justifyContent={"center"} mt={8}>
              <ButtonCTA bg={"green.700"} color={"white"} fontSize={"md"}>
                Finalizar Compra
              </ButtonCTA>
            </Row>
          </Content>
        )}
      </Col>
      <FooterPage />
    </CommonMasterPage>
  );
};

export default CheckoutPage;
