import { ArtistLink, ArtistsLink } from "@/components/layout/links";
import ArtistItem from "@/components/layout/shared/ArtistItem";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import { AppGrid, Col, Content, Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import { useArtistListQuery } from "@/hooks/api/useArtistListQuery";
import {
  Button,
  Heading,
  SimpleGrid,
  Square,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { VscArrowRight } from "react-icons/vsc";

// import { Container } from './styles';

const OursArtistsSectionHome: React.FC = () => {
  const { query: artists } = useArtistListQuery(8);
  const gridOptions = useBreakpointValue([
    {
      columns: 1,
      type: "slide",
      _carousel: { itemsToShow: 1, pagination: true, itemPadding: [0, 0] },
    },
    {
      columns: 2,
      type: "grid",
      _carousel: { itemsToShow: 2, pagination: true, itemPadding: [0, 0] },
    },
    {
      columns: 3,
      type: "grid",
      _carousel: { itemsToShow: 3, pagination: true, itemPadding: [0, 0] },
    },
    {
      columns: 3,
      type: "grid",
      _carousel: { itemsToShow: 3, pagination: true, itemPadding: [0, 0] },
    },
    {
      columns: 4,
      type: "grid",
      _carousel: { itemsToShow: 4, pagination: true, itemPadding: [0, 0] },
    },
    {
      columns: 4,
      type: "grid",
      gap: 4,
      _carousel: { itemsToShow: 4, pagination: true, itemPadding: [0, 0] },
    },
    {
      columns: 4,
      type: "grid",
      gap: 4,
      _carousel: { itemsToShow: 4, pagination: true, itemPadding: [0, 0] },
    },
  ]);

  return (
    <>
      <Col bg={"gray.700"} color={"primary.100"}>
        <Content>
          <Col
            mt={8}
            py={4}
            mb={4}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Heading size={"md"} textTransform={"uppercase"} mb={4}>
              Nossos Artistas
            </Heading>
            <ListView
              items={[
                "Talentosos e apaixonados pelo o que",
                "fazem, cada um com sua voz e estilo.",
                "Escolha o seu favorito para ser",
                "o cantor da sua história!",
              ]}
              render={(v) => (
                <Heading
                  textAlign={"center"}
                  fontSize={10}
                  color={"primary.500"}
                >
                  {v}
                </Heading>
              )}
            />
          </Col>
          <Col px={[4, 8, 4, 0, 0, 0]} className={"slide-2"}>
            <AppGrid type={"slide"} {...(gridOptions as any)}>
              {artists.data?.data.map((artist) => (
                <ArtistItem artist={artist} key={`artist${artist.id}`} />
              ))}
            </AppGrid>
          </Col>
          <Row
            mt={4}
            mb={12}
            alignItems={"center"}
            justifyContent={"center"}
            px={4}
          >
            <ArtistsLink>
              <ButtonCTA
                rightIcon={
                  <Square color={"primary.500"}>
                    <VscArrowRight size={24} />
                  </Square>
                }
                bg={"primary.100"}
                color={"primary.900"}
                w={"100%"}
              >
                Veja todos os artistas
              </ButtonCTA>
            </ArtistsLink>
          </Row>
        </Content>
      </Col>
    </>
  );
};

export default OursArtistsSectionHome;
