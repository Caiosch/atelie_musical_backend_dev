import VideoHistoryItem from "@/components/layout/shared/VideoHistoryItem";
import { AppGrid, Col, Content, Row } from "@/components/shared";
import { createCarouselArrow } from "@/components/shared/helpers/createCarouselArrow";
import { Heading } from "@chakra-ui/react";
import React from "react";

const VideosHistoriesSectionHome: React.FC = () => {
  return (
    <Col bg={"primary.100"} pb={8}>
      <Content>
        <Row mt={8} py={4} alignItems={"center"} justifyContent={"center"}>
          <Heading size={"md"} color={"secondary.600"}>
            Vídeos & Histórias
          </Heading>
        </Row>
        <Col pos={"relative"} className={"slide-1"}>
          <AppGrid
            type={"slide"}
            w={"100%"}
            _carousel={{
              pagination: true,
              renderArrow: createCarouselArrow({
                bg: "transparent",
                color: "primary.800",
                border: "none",
                _hover: {},
                _focus: {},
                _active: {},
              }),
            }}
          >
            <VideoHistoryItem
              artistName="Marina Lima"
              descriptions={[
                "A Alessandra tem três filhos e queria dar um presente especial pro seu marido no dia dos pais.",
                " Então ela, junto com as crianças criaram essa canção que fala do amor e vários momentos dos filhos com o pai.",
              ]}
              poster={
                "https://images.unsplash.com/photo-1517554558809-9b4971b38f39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              }
              posterTitle={"Dança na Sala"}
              title={"Sorte de Amar Você"}
              typeName={"Família"}
            />
            <VideoHistoryItem
              artistName="Marina Lima"
              descriptions={[
                "A Alessandra tem três filhos e queria dar um presente especial pro seu marido no dia dos pais.",
                " Então ela, junto com as crianças criaram essa canção que fala do amor e vários momentos dos filhos com o pai.",
              ]}
              poster={
                "https://images.unsplash.com/photo-1517554558809-9b4971b38f39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              }
              posterTitle={"Dança na Sala"}
              title={"Sorte de Amar Você"}
              typeName={"Família"}
            />
            <VideoHistoryItem
              artistName="Marina Lima"
              descriptions={[
                "A Alessandra tem três filhos e queria dar um presente especial pro seu marido no dia dos pais.",
                " Então ela, junto com as crianças criaram essa canção que fala do amor e vários momentos dos filhos com o pai.",
              ]}
              poster={
                "https://images.unsplash.com/photo-1517554558809-9b4971b38f39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              }
              posterTitle={"Dança na Sala"}
              title={"Sorte de Amar Você"}
              typeName={"Família"}
            />
          </AppGrid>
        </Col>
      </Content>
    </Col>
  );
};

export default VideosHistoriesSectionHome;
