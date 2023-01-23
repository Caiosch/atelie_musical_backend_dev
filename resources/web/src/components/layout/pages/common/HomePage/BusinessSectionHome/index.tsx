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
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { VscArrowRight } from "react-icons/vsc";

const BusinessSectionHome: React.FC = () => {
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
      <Col bg={"secondary.700"}>
        <Content pb={4} w={["100%", null, 1200, null, null]}>
          <Col
            mt={8}
            mb={4}
            py={4}
            px={4}
            alignItems={"center"}
            justifyContent={"center"}
            textAlign={["center", null, null, "left", null, null]}
          >
            <Heading
              size={"md"}
              color={"primary.100"}
              textAlign={"center"}
              mb={2}
            >
              Marcas {"&"} Negócios
            </Heading>
            <Col mb={2}>
              <ListView
                items={[
                  "Crie músicas para o seu negócio, ",
                  "clientes e colaboradores.",
                ]}
                render={(item) => (
                  <Heading
                    size={"xs"}
                    fontSize={"xs"}
                    color={"primary.500"}
                    textAlign={"center"}
                  >
                    {item}
                  </Heading>
                )}
              />
            </Col>
          </Col>
          <Col
            px={[0, 0, 14, 14, 14, 14]}
            pos={"relative"}
            className={"slide-2"}
          >
            <AppGrid
              {...(gridOptions as any)}
              _carousel={{
                ...gridOptions?._carousel,
                renderArrow: createCarouselArrow({
                  bg: "transparent",
                  color: "primary.50",
                  border: 0,
                  _hover: {},
                  _active: {},
                  _focus: {},
                }),
              }}
            >
              <CategoryImageItem
                label="Campanhas Publicitárias"
                labelBg="gray.700"
                labelColor="primary.500"
              />
              <CategoryImageItem
                label="Ações Internas"
                labelBg="gray.700"
                labelColor="primary.500"
              />
              <CategoryImageItem
                label="Publicidade"
                labelBg="gray.700"
                labelColor="primary.500"
              />
              <CategoryImageItem
                label="Publicidade"
                labelBg="gray.700"
                labelColor="primary.500"
              />
              <CategoryImageItem
                label="Publicidade"
                labelBg="gray.700"
                labelColor="primary.500"
              />
              <CategoryImageItem
                label="Publicidade"
                labelBg="gray.700"
                labelColor="primary.500"
              />
            </AppGrid>
          </Col>
          <Row my={8} alignItems={"center"} justifyContent={"center"}>
            <RequestMusicLink>
              <ButtonCTA bg={"primary.100"} color={"gray.800"}>
                Vamos Criar
              </ButtonCTA>
            </RequestMusicLink>
          </Row>
        </Content>
      </Col>
    </>
  );
};

export default BusinessSectionHome;
