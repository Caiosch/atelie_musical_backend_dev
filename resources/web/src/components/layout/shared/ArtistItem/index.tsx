import { Col, Row } from "@/components/shared";
import PredefineArtistAndRequest from "@/components/shared/helpers/PredefineArtistAndRequest";
import { resolveArtistAvatar } from "@/configs/app";
import { getColorByString } from "@/helpers/getColorByString";
import { useSettingsQuery } from "@/hooks/api/useSettingsQuery";
import { ApiApp } from "@/services/api/api.app";
import { Box, Button, Heading, Img, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { ArtistLink } from "../../links";
import ArtistMusicalStyles from "../ArtistMusicalStyles";
import AudioPlayer from "../AudioPlayer";
import BadgeMusicStyle from "../BadgeMusicStyle";

interface ArtistItemProps {
  artist: ApiApp.Entities.Artist;
}

const ArtistItem: React.FC<ArtistItemProps> = ({ artist }) => {
  return (
    <>
      <Col
        roundedBottomLeft={"50px"}
        roundedTopRight={"50px"}
        overflow={"hidden"}
        bg={"primary.50"}
        color={"gray.800"}
        w={"100%"}
        // maxW={["90vw", "auto", "auto", "auto", "auto"]}
      >
        <Img src={resolveArtistAvatar(artist)} h={200} objectFit={"cover"} />
        <Col pb={8} flex={1}>
          <Row p={4}>
            <Heading size={"md"} color={"gray.600"}>
              {artist.full_name}
            </Heading>
          </Row>
          <ArtistMusicalStyles
            _badge={{
              border: 0,
              fontFamily: "body",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: ["10px", "xs", "sm", "md"],
            }}
            artist={artist}
          />
          <Row mt={"auto"}>
            {artist.music?.music?.file?.src && (
              <AudioPlayer
                colorScheme="light"
                src={artist.music?.music?.file?.src}
              />
            )}
          </Row>
          <Row flex={1} />
          <SimpleGrid gap={2} columns={1} mt={4} px={4}>
            <ArtistLink id={`${artist.id}`}>
              <Button
                bg={"secondary.700"}
                rounded={"3xl"}
                color={"primary.100"}
                colorScheme={"primary"}
                textTransform={"uppercase"}
                w={"100%"}
              >
                Ver Perfil
              </Button>
            </ArtistLink>
            <PredefineArtistAndRequest artistId={artist.id}>
              <Button
                bg={"primary.600"}
                rounded={"3xl"}
                color={"primary.100"}
                colorScheme={"primary"}
                textTransform={"uppercase"}
                w={"100%"}
              >
                Escolher Artista
              </Button>
            </PredefineArtistAndRequest>
          </SimpleGrid>
        </Col>
      </Col>
    </>
  );
};

export default ArtistItem;
