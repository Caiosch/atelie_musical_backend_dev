import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import MusicCardItem from "@/components/layout/shared/MusicCardItem";
import { AppGrid, Col, Content, Row } from "@/components/shared";
import { createCarouselArrow } from "@/components/shared/helpers/createCarouselArrow";
import { Box, Heading, Img, Text } from "@chakra-ui/react";
import React from "react";

const MusicsHistoriesSectionHome: React.FC = () => {
  return (
    <>
      <Col bg={"secondary.500"}>
        <Content pb={20}>
          <Col
            mt={8}
            mb={4}
            py={4}
            px={0}
            alignItems={"center"}
            justifyContent={"center"}
            textAlign={"center"}
          >
            <Heading size={"md"} mb={2} color={"primary.100"}>
              Músicas & Histórias
            </Heading>
            <Heading fontSize={12} size={"xs"} color={"primary.500"}>
              Histórias lindas merecem ficar no repeat
            </Heading>
          </Col>
          <Col px={[0, 0, 20, 20, 20, 20]} pos={"relative"}>
            <AppGrid
              type={"slide"}
              _carousel={{
                showArrows: true,
                renderArrow: createCarouselArrow({
                  bg: "transparent",
                  color: "primary.500",
                  border: 0,
                  _hover: {},
                  _active: {},
                  _focus: {},
                  size: "sm",
                }),
              }}
            >
              <MusicCardItem
                artistGenre="Bossa Nova"
                artistName="Leo Bezerra"
                image="https://images.unsplash.com/photo-1484876065684-b683cf17d276?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                descriptions={[
                  "O Phill vai se casar com a Marina e vão ter uma grande festa. Ele teve a idéia de surpreendê-la com uma música que contava a história dos dois.",
                ]}
                musicTitle={"Sorte de Amar Você"}
              />
              <MusicCardItem
                artistGenre="Bossa Nova"
                artistName="Leo Bezerra"
                image="https://images.unsplash.com/photo-1484876065684-b683cf17d276?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                descriptions={[
                  "O Phill vai se casar com a Marina e vão ter uma grande festa. Ele teve a idéia de surpreendê-la com uma música que contava a história dos dois.",
                ]}
                musicTitle={"Sorte de Amar Você"}
              />
              <MusicCardItem
                artistGenre="Bossa Nova"
                artistName="Leo Bezerra"
                image="https://images.unsplash.com/photo-1484876065684-b683cf17d276?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                descriptions={[
                  "O Phill vai se casar com a Marina e vão ter uma grande festa. Ele teve a idéia de surpreendê-la com uma música que contava a história dos dois.",
                ]}
                musicTitle={"Sorte de Amar Você"}
              />
              <MusicCardItem
                artistGenre="Bossa Nova"
                artistName="Leo Bezerra"
                image="https://images.unsplash.com/photo-1484876065684-b683cf17d276?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                descriptions={[
                  "O Phill vai se casar com a Marina e vão ter uma grande festa. Ele teve a idéia de surpreendê-la com uma música que contava a história dos dois.",
                ]}
                musicTitle={"Sorte de Amar Você"}
              />
            </AppGrid>
          </Col>
        </Content>
      </Col>
    </>
  );
};

export default MusicsHistoriesSectionHome;
