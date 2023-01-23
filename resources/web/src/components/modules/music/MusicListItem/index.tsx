import AudioPlayer from "@/components/layout/shared/AudioPlayer";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import { Col, Row } from "@/components/shared";
import PredefineArtistAndRequest from "@/components/shared/helpers/PredefineArtistAndRequest";
import { useSettingsQuery } from "@/hooks/api/useSettingsQuery";
import { ApiApp } from "@/services/api/api.app";
import { apiClient } from "@/services/clients/api";
import { Circle, Heading } from "@chakra-ui/react";
import React from "react";

interface MusicListItemProps {
  music: ApiApp.Entities.Music;
}

const MusicListItem: React.FC<MusicListItemProps> = ({ music }) => {
  const { findOccasion } = useSettingsQuery();

  return (
    <Col gap={3}>
      <Row justifyContent={"center"}>
        <Heading size={"md"} textTransform={"uppercase"} color={"primary.50"}>
          {music.name ?? "Não definido"}
        </Heading>
      </Row>
      <Row alignItems={"center"} gap={"2px"} justifyContent={"center"}>
        <Heading
          fontFamily={"body"}
          size={"md"}
          textTransform={"uppercase"}
          fontWeight={"light"}
        >
          {music.artist?.full_name ?? "Sem Artista"}
        </Heading>
        <Circle size={1} bg={"primary.500"} />
        <Heading
          fontFamily={"body"}
          fontWeight={"bold"}
          size={"md"}
          fontStyle={"italic"}
          color={"primary.500"}
        >
          {music.occasion
            ? findOccasion(music.occasion)?.value ?? "Não definido"
            : "Não definido"}
        </Heading>
      </Row>
      {music.file && (
        <Row justifyContent={"center"} px={4}>
          <AudioPlayer src={apiClient.resolveFileUrl(music.file.src)} />
        </Row>
      )}
      <Row justifyContent={"center"}>
        <PredefineArtistAndRequest artistId={music.artist.id}>
          <ButtonCTA bg={"primary.50"} color={"primary.700"} fontSize={"xl"}>
            Escolher Artista
          </ButtonCTA>
        </PredefineArtistAndRequest>
      </Row>
    </Col>
  );
};

export default MusicListItem;
