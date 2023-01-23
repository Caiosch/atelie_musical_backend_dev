import { RequestMusicLink } from "@/components/layout/links";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import CategoryImageItem from "@/components/layout/shared/CategoryImageItem";
import { AppGrid, Col, Content, Row } from "@/components/shared";
import { createCarouselArrow } from "@/components/shared/helpers/createCarouselArrow";
import { ListView } from "@/components/shared/helpers/ListView";
import {
  Button,
  Heading,
  SimpleGrid,
  Square,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { VscArrowRight } from "react-icons/vsc";

const MusicsPersonalizedSectionHome: React.FC = () => {
  const gridOptions = useBreakpointValue([
    {
      type: "slide",
      _carousel: {
        itemsToShow: 2,
        outerSpacing: -30,
        itemPadding: [0, 10],
        pagination: true,
        showArrows: false,
      },
    },
    {
      type: "slide",
      _carousel: {
        itemsToShow: 2,
        outerSpacing: -30,
        itemPadding: [0, 10],
        pagination: true,
        showArrows: false,
      },
    },
    {
      type: "slide",
      _carousel: {
        itemsToShow: 3,
        itemPadding: [0, 10],
        outerSpacing: 50,
        showArrows: true,
      },
    },
    {
      type: "slide",
      _carousel: { itemsToShow: 3, showArrows: true, itemPadding: [0, 10] },
    },
    {
      type: "slide",
      _carousel: { itemsToShow: 3, showArrows: true, itemPadding: [0, 10] },
    },
    {
      type: "slide",
      _carousel: { itemsToShow: 4, showArrows: true, itemPadding: [0, 10] },
    },
    {
      columns: 4,
      type: "slide",
      _carousel: { itemsToShow: 4, showArrows: true, itemPadding: [0, 10] },
    },
  ]);

  return (
    <>
      <Col bg={"primary.100"}>
        <Content pb={8} pos={"relative"}>
          <Col
            mt={8}
            mb={4}
            py={4}
            alignItems={"center"}
            justifyContent={"center"}
            textAlign={["center", null, null, "left", null, null]}
          >
            <Col mb={2}>
              <ListView
                items={["Músicas personalizadas", "para todo tipo de amor"]}
                render={(item) => (
                  <Heading
                    size={"md"}
                    w={"100%"}
                    color={"secondary.500"}
                    textAlign={"center"}
                  >
                    {item}
                  </Heading>
                )}
              />
            </Col>
            <Heading
              size={"xs"}
              fontSize={"xs"}
              color={"primary.500"}
              textAlign={"center"}
            >
              Pra deixar o coração bater sem medo
            </Heading>
          </Col>
          <Col
            px={[0, 0, 14, 14, 14, 14]}
            pos={"relative"}
            className={"slide-1"}
          >
            <AppGrid
              {...(gridOptions as any)}
              _carousel={{
                ...gridOptions?._carousel,
                renderArrow: createCarouselArrow({
                  bg: "transparent",
                  color: "gray.800",
                  border: 0,
                  _hover: {},
                  _active: {},
                  _focus: {},
                }),
              }}
            >
              <CategoryImageItem />
              <CategoryImageItem />
              <CategoryImageItem />
              <CategoryImageItem />
              <CategoryImageItem />
            </AppGrid>
          </Col>
          <Row mb={8} mt={10} alignItems={"center"} justifyContent={"center"}>
            <RequestMusicLink>
              <ButtonCTA
                rightIcon={<VscArrowRight size={28} />}
                bg={"gray.600"}
                color={"primary.500"}
                alignItems={"center"}
              >
                Vamos Criar
              </ButtonCTA>
            </RequestMusicLink>
          </Row>
        </Content>
      </Col>
    </>
  );
};

export default MusicsPersonalizedSectionHome;
