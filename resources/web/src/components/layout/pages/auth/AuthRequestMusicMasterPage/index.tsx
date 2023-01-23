import MenuTopSpacing from "@/components/layout/shared/MenuTopSpacing";
import { Col, Content, Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import { ApiApp } from "@/services/api/api.app";
import { RequestMusicMapper } from "@/services/app/mappers/request-mapper";
import { Heading, Square, Text } from "@chakra-ui/react";
import React from "react";
import CommonMasterPage from "../../common/CommonMasterPage";
import FooterPage from "../../common/FooterPage";

const AuthRequestMusicMasterPage: React.FC<{
  children?: React.ReactNode;
  requestMusic: ApiApp.Entities.RequestMusic;
}> = ({ children, requestMusic }) => {
  return (
    <CommonMasterPage>
      <Col bg={"gray.600"} color={"primary.50"} px={8} pb={20} minH={"100vh"}>
        <MenuTopSpacing />
        <Content>
          <Col>
            <Heading size={"2xl"} mb={12} pr={4}>
              Acompanhe o seu pedido
            </Heading>
            {children}
          </Col>
        </Content>
        <Content pt={8}>
          <Heading
            size={"md"}
            textTransform={"uppercase"}
            color={"primary.500"}
            mb={4}
          >
            Informações do Pedido
          </Heading>
          <Col gap={4}>
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
      </Col>
      <FooterPage />
    </CommonMasterPage>
  );
};

export default AuthRequestMusicMasterPage;
