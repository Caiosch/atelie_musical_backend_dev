import CommonMasterPage from "@/components/layout/pages/common/CommonMasterPage";
import FooterPage from "@/components/layout/pages/common/FooterPage";
import ArtistItem from "@/components/layout/shared/ArtistItem";
import BadgeSelect from "@/components/layout/shared/BadgeSelect";
import CollapseCard from "@/components/layout/shared/CollapseCard";
import MenuTopSpacing from "@/components/layout/shared/MenuTopSpacing";
import { AppGrid, Col, Content, Row } from "@/components/shared";
import AritstFilterComponent from "@/components/shared/helpers/AritstFilterComponent";
import { useArtistListQuery } from "@/hooks/api/useArtistListQuery";
import { useSettingsQuery } from "@/hooks/api/useSettingsQuery";
import { Box, Heading, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";

const ArtistsPage: React.FC = () => {
  const artistFilter = useArtistListQuery(10000);

  const gridOptions = useBreakpointValue([
    {
      columns: 1,
      type: "slide",
      _carousel: {
        itemsToShow: 1,
        itemPadding: [0, 0],
        outerSpacing: 0,
        pagination: true,
      },
    },
    {
      columns: 2,
      type: "slide",
      _carousel: {
        itemsToShow: 2,
        itemPadding: [0, 0],
        outerSpacing: 0,
        pagination: true,
      },
    },
    {
      columns: 3,
      type: "slide",
      _carousel: {
        itemsToShow: 3,
        itemPadding: [0, 0],
        outerSpacing: 0,
        pagination: true,
      },
    },
    {
      columns: 3,
      type: "slide",
      _carousel: { itemsToShow: 3, itemPadding: [0, 0], showArrows: true },
    },
    {
      columns: 4,
      type: "grid",
      _carousel: { itemsToShow: 4, itemPadding: [0, 0] },
    },
    {
      columns: 4,
      type: "grid",
      gap: 4,
      _carousel: { itemsToShow: 4, itemPadding: [0, 0] },
    },
    {
      columns: 4,
      type: "grid",
      gap: 4,
      _carousel: { itemsToShow: 4, itemPadding: [0, 0] },
    },
  ]);

  return (
    <CommonMasterPage>
      <Col bg={"gray.700"}>
        <MenuTopSpacing />
        <Content h={"100%"} px={2}>
          <Col px={2}>
            <Heading color={"primary.500"} size={"2xl"} as="h1">
              Artistas
            </Heading>
          </Col>
          <AritstFilterComponent {...artistFilter} />
        </Content>
      </Col>
      <Col bg={"gray.600"}>
        <Row textAlign={"center"} justifyContent={"center"} px={4}>
          <Col
            fontSize={"xs"}
            bg={"yellow.500"}
            w={"100%"}
            color={"white"}
            textTransform={"uppercase"}
            h={14}
            alignItems={"center"}
            justifyContent={"center"}
            mt={-7}
            roundedBottomRight={"2xl"}
            roundedTopLeft={"2xl"}
          >
            Meu BemQuerê Escolhe Para Você!
          </Col>
        </Row>
        <Content py={8} px={4} minH={400} className={"slide-2"}>
          <AppGrid gap={8} {...(gridOptions as any)}>
            {artistFilter.nextArtists.map((artist) => (
              <ArtistItem artist={artist} key={`artist${artist.id}`} />
            ))}
          </AppGrid>
        </Content>
      </Col>
      <FooterPage />
    </CommonMasterPage>
  );
};

export default ArtistsPage;
