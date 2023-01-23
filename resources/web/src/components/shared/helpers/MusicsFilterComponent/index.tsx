import BadgeSelect from "@/components/layout/shared/BadgeSelect";
import CollapseCard from "@/components/layout/shared/CollapseCard";
import { MusicFilter } from "@/hooks/api/useMusicsListQuery";
import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";

// import { Container } from './styles';

const MusicsFilterComponent: React.FC<
  MusicFilter & { isInverted?: boolean }
> = ({
  musicVoicesFilter,
  musicalOccasionsFilter,
  musicalStylesFilter,
  pagination,
  query,
  setMusicVoices,
  setMusicalOccasions,
  setMusicalStyles,
  isInverted,
  musicalStyles,
  occasions,
}) => {
  return (
    <>
      <SimpleGrid gap={4} my={8}>
        <CollapseCard title={"Estilos Musicais"}>
          <Box maxW={"100%"}>
            <BadgeSelect
              isInverted={isInverted}
              items={musicalStyles.map((style) => ({
                label: style.value,
                value: style.key,
              }))}
              value={musicalStylesFilter}
              onChange={setMusicalStyles}
            />
          </Box>
        </CollapseCard>
        <CollapseCard title={"Ocasiões"}>
          <Box maxW={"100%"}>
            <BadgeSelect
              isInverted={isInverted}
              items={occasions.map((style) => ({
                label: style.value,
                value: style.key,
              }))}
              value={musicalOccasionsFilter}
              onChange={setMusicalOccasions}
            />
          </Box>
        </CollapseCard>
        <CollapseCard title={"Voz"}>
          <Box maxW={"100%"}>
            <BadgeSelect
              isInverted={isInverted}
              items={["Feminina", "Masculino"].map((v) => ({
                value: v[0],
                label: v,
              }))}
              value={musicVoicesFilter}
              onChange={(v) => {
                if (v.length <= 0) {
                  setMusicVoices([]);
                } else {
                  setMusicVoices([v.pop()]);
                }
              }}
            />
          </Box>
        </CollapseCard>
      </SimpleGrid>
    </>
  );
};

export default MusicsFilterComponent;
