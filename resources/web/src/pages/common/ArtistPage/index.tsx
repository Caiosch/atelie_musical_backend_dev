import { ArtistLink } from "@/components/layout/links";
import CommonMasterPage from "@/components/layout/pages/common/CommonMasterPage";
import FooterPage from "@/components/layout/pages/common/FooterPage";
import ArtistMusicalStyles from "@/components/layout/shared/ArtistMusicalStyles";
import BadgeMusicStyle from "@/components/layout/shared/BadgeMusicStyle";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import CardArtistMusic from "@/components/layout/shared/CardArtistMusic";
import MenuTopSpacing from "@/components/layout/shared/MenuTopSpacing";
import { AppGrid, Col, Content, Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import PredefineArtistAndRequest from "@/components/shared/helpers/PredefineArtistAndRequest";
import { resolveArtistAvatar } from "@/configs/app";
import { useArtistQuery } from "@/hooks/api/useArtistQuery";
import { useSettingsQuery } from "@/hooks/api/useSettingsQuery";
import { apiClient } from "@/services/clients/api";
import {
  Box,
  Heading,
  Img,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { Link, useParams } from "react-router-dom";

const ArtistPage: React.FC = () => {
  const { artistId } = useParams();
  const { data: artist } = useArtistQuery(artistId!);
  const { findOcasion, filterSentiments } = useSettingsQuery();

  const gridOptions = useBreakpointValue([
    {
      columns: 1,
      type: "slide",
      _carousel: { itemsToShow: 1, outerSpacing: 0, itemPadding: [0, 10] },
    },
    {
      columns: 1,
      type: "slide",
      _carousel: { itemsToShow: 1, outerSpacing: 0, itemPadding: [0, 10] },
    },
    {
      columns: 1,
      type: "slide",
      _carousel: { itemsToShow: 1, outerSpacing: 0, itemPadding: [0, 10] },
    },
    { columns: 2, type: "grid", _carousel: { itemsToShow: 2 } },
    { columns: 2, type: "grid", _carousel: { itemsToShow: 2 } },
    { columns: 2, type: "grid", _carousel: { itemsToShow: 2 } },
    { columns: 2, type: "grid", _carousel: { itemsToShow: 2 } },
  ]);

  const createBgGradient = (direction: string = "to-b", color = "gray.700") => {
    return `linear(${direction}, darken.400, ${color})`;
  };

  if (!artist) return <></>;

  return (
    <CommonMasterPage>
      <Row
        h={["auto", null, null, "80vh", null, null]}
        w={"100%"}
        flexDir={["column", null, null, "row", null, null]}
      >
        <Col flex={1} pos={"relative"}>
          <Box
            w={"100%"}
            h={"100%"}
            zIndex={20}
            pos={"absolute"}
            left={0}
            top={0}
            bgGradient={[
              // createBgGradient("to-b", "gray.600"),
              null,
              null,
              null,
              createBgGradient("to-r"),
              null,
              null,
            ]}
          />
          <Img
            src={resolveArtistAvatar(artist)}
            w={"100%"}
            h={["60vh", null, null, "100%", null, null]}
            objectFit={"cover"}
            pos={"relative"}
            zIndex={10}
          />
        </Col>
        <Col
          flex={1}
          pl={4}
          pr={[4, null, null, 0, null, null]}
          bg={[
            "gray.600",
            "gray.600",
            "gray.600",
            "gray.700",
            "gray.700",
            "gray.700",
          ]}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {/* <MenuTopSpacing /> */}
          <Heading
            size={["md", "md", "lg", "lg", "2xl"]}
            color={"primary.400"}
            mt={[10, null, null, 0, null, null]}
            mb={8}
            textAlign={"center"}
          >
            {artist.full_name}
          </Heading>
          <SimpleGrid
            gap={6}
            fontSize={"lg"}
            color={"white"}
            w={["100%", null, null, "60%", null, null]}
            pb={8}
            lineHeight={"180%"}
          >
            <ListView
              items={artist.description?.split("\n\n") || []}
              render={(p) => (
                <>
                  <ListView
                    items={p.split("\n")}
                    render={(line) => <Text>{line}</Text>}
                  />
                </>
              )}
            />
          </SimpleGrid>
        </Col>
      </Row>
      <Col bg={"gray.600"}>
        <Content w={800}>
          <Col py={8} px={4}>
            <Row justifyContent={"center"}>
              <Heading
                size={"lg"}
                color={"primary.100"}
                fontFamily={"body"}
                textTransform={"uppercase"}
              >
                Estilos Musicais
              </Heading>
            </Row>
            <ArtistMusicalStyles
              artist={artist}
              textAlign={"center"}
              as={SimpleGrid}
              // @ts-ignore
              columns={3}
              mt={4}
              _badge={{
                border: 0,
                fontFamily: "body",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: ["10px", "xs", "sm", "md"],
              }}
            />
          </Col>
          <Col mb={4} mt={8}>
            <Row justifyContent={"center"} mb={4}>
              <Heading
                size={"lg"}
                color={"primary.100"}
                fontFamily={"body"}
                textTransform={"uppercase"}
              >
                Portifólio do Artista
              </Heading>
            </Row>
            <AppGrid gap={4} columns={2} {...(gridOptions as any)}>
              {artist.musics
                ?.filter((m) => m.privacy === "public")
                .map((music) => (
                  <CardArtistMusic
                    title={`${artist.full_name} - ${
                      music.data.admin?.musicName ?? "Sem Nome"
                    }`}
                    category={
                      findOcasion(music.data?.ocasions)?.value || undefined
                    }
                    genres={filterSentiments(music.data?.sentiments || []).map(
                      (s) => s.value
                    )}
                    source={
                      music.data?.admin?.musicFile?.src &&
                      apiClient.resolveFileUrl(
                        music.data?.admin?.musicFile?.src
                      )
                    }
                  />
                ))}
            </AppGrid>
          </Col>
          <Col>
            <SimpleGrid
              columns={[1, 1, 2, 2, 2, 2, 2]}
              gap={[2, 2, 4, 4, 8, 8, 8]}
              p={4}
            >
              <PredefineArtistAndRequest artistId={artist.id}>
                <ButtonCTA bg={"primary.100"} color={"primary.600"}>
                  Escolher Artista
                </ButtonCTA>
              </PredefineArtistAndRequest>
              <ArtistLink id={`${artist.id}`} style={{ width: "100%" }}>
                <ButtonCTA bg={"primary.600"} color={"primary.100"} w={"100%"}>
                  Ver Mais Artistas
                </ButtonCTA>
              </ArtistLink>
            </SimpleGrid>
          </Col>
        </Content>
      </Col>
      <FooterPage isInverted />
    </CommonMasterPage>
  );
};

export default ArtistPage;
