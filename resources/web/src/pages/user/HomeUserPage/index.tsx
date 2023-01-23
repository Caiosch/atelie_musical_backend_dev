import { getInputTextProps } from "@/components/fields/factories";
import FieldWrap from "@/components/fields/FieldWrap";
import CommonMasterPage from "@/components/layout/pages/common/CommonMasterPage";
import FooterPage from "@/components/layout/pages/common/FooterPage";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import MenuTopSpacing from "@/components/layout/shared/MenuTopSpacing";
import RequestMusicCard from "@/components/modules/request/RequestMusicCard";
import { useAuth } from "@/components/providers/AuthProvider";
import { AppGrid, Col, Content, Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import { useRequestMusicListQuery } from "@/hooks/api/useRequestMusicListQuery";
import { apiClient } from "@/services/clients/api";
import { Heading, Input, Square } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiChevronDown } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

const HomeUserPage: React.FC = () => {
  const profileForm = useForm();
  const profileFormData = profileForm.watch();

  const passwordForm = useForm();
  const passwordFormData = passwordForm.watch();

  const requests = useRequestMusicListQuery(6);
  const { isAuth, user, refreshUser } = useAuth();

  const onSubmitProfile = ({ data }: any) => {
    if (!user || !isAuth) return;
    apiClient.updateUser(user.id, data).then(refreshUser);
  };

  const onSubmitPassword = ({ data }: any) => {
    if (!user || !isAuth) return;
    apiClient.updatePassword(data).then(() => {
      passwordForm.setValue("data", {});
    });
  };

  useEffect(() => {
    if (user) {
      const {
        id,
        role,
        created_at,
        updated_at,
        email_verified_at,
        ...nextUser
      } = user;
      profileForm.setValue("data", nextUser);
    }
  }, []);

  const Title: React.FC<{ title: string }> = ({ title }) => (
    <Row color={"primary.500"} alignItems={"center"}>
      <Heading size={"lg"} textTransform={"uppercase"} mr={2}>
        {title}
      </Heading>
      <Square mb={1}>
        <BiChevronDown size={40} />
      </Square>
    </Row>
  );

  return (
    <CommonMasterPage>
      <Col px={8} pb={20}>
        <MenuTopSpacing />
        <Content>
          <Heading size={"3xl"} color={"primary.500"} mb={4}>
            Minha Conta
          </Heading>
          <ListView
            items={[
              "Olá, Jenner!",
              "Nesta seção você pode visualizar seus pedidos e gerenciar suas informações.",
            ]}
            render={(v) => (
              <Heading size={"2xl"} color={"gray.800"} fontSize={"2xl"}>
                {v}
              </Heading>
            )}
          />
          <Row alignItems={"center"} mt={4} py={4}>
            <Heading
              size={"md"}
              textTransform={"uppercase"}
              flex={1}
              color={"primary.400"}
            >
              Lista de Pedidos
            </Heading>
            <Link to={"/music/request"}>
              <Square
                size={8}
                rounded={"xl"}
                bg={"gray.800"}
                color={"primary.400"}
                cursor={"pointer"}
              >
                <BsPlus size={26} />
              </Square>
            </Link>
          </Row>
          <AppGrid mt={2} gap={4} columns={[1, 1, 2, 3, 3, 3, 3]} type={"grid"}>
            {requests.query.data?.data?.map((request) => (
              <RequestMusicCard
                key={`requestMusic${request.id}`}
                requestMusic={request}
              />
            ))}
          </AppGrid>
          <Row pt={8} alignItems={"center"} justifyContent={"center"}>
            <Link to={"/music/request"}>
              <ButtonCTA
                px={12}
                py={8}
                fontSize={"lg"}
                bg={"secondary.500"}
                color={"primary.500"}
                rounded={999}
              >
                Fazer novo Pedido
              </ButtonCTA>
            </Link>
          </Row>
        </Content>
      </Col>
      <form onSubmit={profileForm.handleSubmit(onSubmitProfile)}>
        <Col px={8} py={12} bg={"primary.100"}>
          <Content>
            <Col>
              <Title title={"Meus Dados"} />
              <Col gap={4}>
                <FieldWrap label={"Nome Completo"} isInverted>
                  <Input
                    {...getInputTextProps("inverted")}
                    value={profileFormData.data?.name}
                    placeholder={"JENNER JON LOPES"}
                    {...profileForm.register("data.name")}
                  />
                </FieldWrap>
                <FieldWrap label={"E-mail"} isInverted>
                  <Input
                    {...getInputTextProps("inverted")}
                    value={profileFormData.data?.email}
                    placeholder={"jenner.designer@gmail.com"}
                    readOnly
                    // {...profileForm.register("data.email")}
                  />
                </FieldWrap>
                <FieldWrap label={"Telefone"} isInverted>
                  <Input
                    {...getInputTextProps("inverted")}
                    value={profileFormData.data?.phone_number}
                    placeholder={"(11) 9 5960-7178"}
                    {...profileForm.register("data.phone_number")}
                  />
                </FieldWrap>
                <FieldWrap label={"CPF"} isInverted>
                  <Input
                    {...getInputTextProps("inverted")}
                    value={profileFormData.data?.cpf}
                    placeholder={"xxx.xxx.xxx-xx"}
                    {...profileForm.register("data.cpf")}
                  />
                </FieldWrap>
                <FieldWrap label={"País"} isInverted>
                  <Input
                    {...getInputTextProps("inverted")}
                    value={profileFormData.data?.address_country}
                    placeholder={"País"}
                    {...profileForm.register("data.address_country")}
                  />
                </FieldWrap>
                <FieldWrap label={"Estado"} isInverted>
                  <Input
                    {...getInputTextProps("inverted")}
                    value={profileFormData.data?.address_state}
                    placeholder={"Estado"}
                    {...profileForm.register("data.address_state")}
                  />
                </FieldWrap>
                <FieldWrap label={"Cidade"} isInverted>
                  <Input
                    {...getInputTextProps("inverted")}
                    value={profileFormData.data?.address_city}
                    placeholder={"Cidade"}
                    {...profileForm.register("data.address_city")}
                  />
                </FieldWrap>
                <FieldWrap label={"Endereço"} isInverted>
                  <Input
                    {...getInputTextProps("inverted")}
                    value={profileFormData.data?.address_place}
                    placeholder={"Endereço"}
                    {...profileForm.register("data.address_place")}
                  />
                </FieldWrap>
                <FieldWrap label={"Complemento"} isInverted>
                  <Input
                    {...getInputTextProps("inverted")}
                    value={profileFormData.data?.address_complement}
                    placeholder={"Complemento"}
                    {...profileForm.register("data.address_complement")}
                  />
                </FieldWrap>
                <FieldWrap label={"Número"} isInverted>
                  <Input
                    {...getInputTextProps("inverted")}
                    value={profileFormData.data?.address_number}
                    placeholder={"Número"}
                    {...profileForm.register("data.address_number")}
                  />
                </FieldWrap>
              </Col>
              <Row alignItems={"center"} justifyContent={"center"} mt={4}>
                <ButtonCTA
                  bg={"gray.600"}
                  color={"primary.500"}
                  type={"submit"}
                >
                  Salvar Perfil
                </ButtonCTA>
              </Row>
            </Col>
          </Content>
        </Col>
      </form>
      <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)}>
        <Col px={8} py={12} bg={"white"}>
          <Content>
            <Col>
              <Title title={"Senha"} />
              <Col gap={4}>
                <FieldWrap label={"Senha Atual"} isInverted>
                  <Input
                    {...getInputTextProps("inverted")}
                    value={passwordFormData.data?.current_password}
                    placeholder={"**********"}
                    {...passwordForm.register("data.current_password")}
                  />
                </FieldWrap>
                <FieldWrap label={"Nova Senha"} isInverted>
                  <Input
                    {...getInputTextProps("inverted")}
                    value={passwordFormData.data?.new_password}
                    placeholder={"**********"}
                    {...passwordForm.register("data.new_password")}
                  />
                </FieldWrap>
                <FieldWrap label={"Confirmar Nova Senha"} isInverted>
                  <Input
                    {...getInputTextProps("inverted")}
                    value={passwordFormData.data?.new_password_confirmation}
                    placeholder={"**********"}
                    {...passwordForm.register("data.new_password_confirmation")}
                  />
                </FieldWrap>
              </Col>
              <Row alignItems={"center"} justifyContent={"center"} mt={4}>
                <ButtonCTA
                  bg={"gray.600"}
                  color={"primary.500"}
                  type={"submit"}
                >
                  Salvar Senha
                </ButtonCTA>
              </Row>
            </Col>
          </Content>
        </Col>
      </form>
      <FooterPage />
    </CommonMasterPage>
  );
};

export default HomeUserPage;
