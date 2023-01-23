import CommonMasterPage from "@/components/layout/pages/common/CommonMasterPage";
import FooterPage from "@/components/layout/pages/common/FooterPage";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import MenuTopSpacing from "@/components/layout/shared/MenuTopSpacing";
import RequestMusicCard from "@/components/modules/request/RequestMusicCard";
import { AppGrid, Col, Content, Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import { useUserQuery } from "@/hooks/api/useUserQuery";
import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { useParams } from "react-router-dom";

const ShowUserAdminPage: React.FC = () => {
  const { userId } = useParams();
  const { data: user } = useUserQuery(userId!);

  if (!user) return <></>;

  return (
    <CommonMasterPage>
      <Col bg={"gray.700"} color={"primary.50"}>
        <MenuTopSpacing />
        <Content mt={20}>
          <Col>
            <Row alignItems={"center"} mb={20}>
              <Heading
                size={"2xl"}
                textTransform={"uppercase"}
                color={"primary.500"}
              >
                Usuário - {user.name} #{userId}
              </Heading>
              <Row flex={1} />
              <ButtonCTA
                bg={"transparent"}
                fontFamily={"heading"}
                textTransform={"uppercase"}
                fontSize={"2xl"}
                rightIcon={<BsTrash />}
                _hover={{ textDecoration: "underline", opacity: 1 }}
                color={"red.400"}
                opacity={0.8}
              >
                Excluir
              </ButtonCTA>
            </Row>
            <Row>
              <Heading size={"xl"} textTransform={"uppercase"} mb={8}>
                Informações do Usuário
              </Heading>
            </Row>
            <SimpleGrid gap={2} columns={2} mb={12}>
              <ListView
                items={[
                  { label: "Nome", value: user.name },
                  { label: "Telefone", value: user.phone_number },
                  { label: "Endereço", value: user.address_street },
                  { label: "Veio de Onde?", value: user.from_where },
                  { label: "Email", value: user.email },
                  {
                    label: "Data de Cadastro",
                    value: new Date(user.created_at).toLocaleString(),
                  },
                  { label: "CPF", value: user.cpf },
                ]}
                render={(rowItem) => (
                  <Row
                    alignItems={"center"}
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                  >
                    <Text
                      mr={2}
                      color={"primary.50"}
                      fontSize={"2xl"}
                      textTransform={"uppercase"}
                    >
                      {rowItem.label}
                    </Text>
                    <Text
                      color={rowItem.value ? "primary.500" : "primary.800"}
                      fontSize={"xl"}
                    >
                      {rowItem.value || "Não Definido"}
                    </Text>
                  </Row>
                )}
              />
            </SimpleGrid>
          </Col>
        </Content>
      </Col>
      <Col bg={"primary.50"} color={"gray.700"} py={20}>
        <Content>
          <Col>
            <Row>
              <Heading size={"xl"} textTransform={"uppercase"} mb={8}>
                Pedidos
              </Heading>
            </Row>
            <AppGrid
              mt={2}
              gap={4}
              columns={[1, 1, 2, 2, 2, 2, 2]}
              type={"grid"}
            >
              {user.requests?.map((request) => (
                <RequestMusicCard
                  key={`requestMusic${request.id}`}
                  requestMusic={request}
                  to={`/admin/requests/${request.id}`}
                />
              ))}
            </AppGrid>
          </Col>
        </Content>
      </Col>
      <FooterPage />
    </CommonMasterPage>
  );
};

export default ShowUserAdminPage;
