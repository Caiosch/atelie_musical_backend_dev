import FieldWrap from "@/components/fields/FieldWrap";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import { Col } from "@/components/shared";
import AritstFilterComponent from "@/components/shared/helpers/AritstFilterComponent";
import { ListView } from "@/components/shared/helpers/ListView";
import { resolveArtistAvatar } from "@/configs/app";
import { useArtistListQuery } from "@/hooks/api/useArtistListQuery";
import { useSettingsQuery } from "@/hooks/api/useSettingsQuery";
import { apiClient } from "@/services/clients/api";
import { SimpleGrid, Collapse } from "@chakra-ui/react";
import React from "react";
import PickArtist from "../PickArtist";
import { useMusicRequestSubmit } from "../RequestMusicPageForm/hooks/useMusicRequestSubmit";

const RequestMusicArtistPicker: React.FC = () => {
  const { requestMusicForm, requestMusicFormData } = useMusicRequestSubmit();
  const { data: settings } = useSettingsQuery();
  const artistsFilter = useArtistListQuery(1000000);

  return (
    <SimpleGrid gap={8}>
      <FieldWrap
        label="Gostaria de Escolher o Artista?"
        _label={{ textAlign: "center" }}
      >
        <SimpleGrid gap={4} columns={2} mb={4}>
          <ListView
            items={[
              { label: "Sim, Quero!", value: true },
              { label: "Não, Obrigado :)", value: false },
            ]}
            render={(item) => {
              const choiceArtist =
                requestMusicFormData.data?.choiceArtist || false;
              const isActive = choiceArtist === item.value;

              return (
                <ButtonCTA
                  bg={!isActive ? "primary.50" : "primary.500"}
                  color={!isActive ? "primary.500" : "primary.50"}
                  onClick={() => {
                    requestMusicForm.setValue("data.choiceArtist", item.value);
                  }}
                >
                  {item.label}
                </ButtonCTA>
              );
            }}
          />
        </SimpleGrid>
        <Collapse in={requestMusicFormData.data?.choiceArtist}>
          <SimpleGrid gap={4} p={4} bg={"white"} rounded={"2xl"}>
            <Col>
              <AritstFilterComponent isInverted={true} {...artistsFilter} />
            </Col>
            <PickArtist
              items={
                artistsFilter.nextArtists.map((artist) => ({
                  id: `${artist.id}`,
                  avatar: `${resolveArtistAvatar(artist)}`,
                  name: artist.full_name,
                  src: artist.music?.music?.file?.src
                    ? apiClient.resolveFileUrl(artist.music?.music?.file?.src)
                    : undefined,
                })) ?? []
              }
              value={[requestMusicFormData.data?.artistId]}
              onChange={(values) => {
                requestMusicForm.setValue("data.artistId", values.pop());
              }}
            />
          </SimpleGrid>
        </Collapse>
      </FieldWrap>
    </SimpleGrid>
  );
};

export default RequestMusicArtistPicker;
