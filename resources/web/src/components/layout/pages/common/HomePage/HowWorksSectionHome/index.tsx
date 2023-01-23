import HowWorkItem from "@/components/layout/shared/HowWorkItem";
import { AppGrid, Col, Content, Row } from "@/components/shared";
import {
  Circle,
  Heading,
  SimpleGrid,
  useBreakpointValue,
  useToken,
} from "@chakra-ui/react";
import React, { useState } from "react";

const HowWorksSectionHome: React.FC = () => {
  function onChangeSlide(_: any, nextIndex: number) {
    setCurrentSlide(() => nextIndex);
  }

  const showPagination = useBreakpointValue([
    true,
    true,
    true,
    false,
    false,
    false,
    false,
  ]);

  const gridOptions = useBreakpointValue([
    {
      columns: 1,
      type: "slide",
      _carousel: {
        itemsToShow: 1,
        outerSpacing: 10,
        onChange: onChangeSlide,
      },
    },
    {
      columns: 1,
      type: "slide",
      _carousel: {
        itemsToShow: 1,
        outerSpacing: 80,
        onChange: onChangeSlide,
      },
    },
    {
      columns: 2,
      type: "slide",
      _carousel: {
        itemsToShow: 1,
        outerSpacing: 50,
        onChange: onChangeSlide,
        showArrows: true,
      },
    },
    {
      columns: 3,
      type: "slide",
      _carousel: { itemsToShow: 3, onChange: onChangeSlide, showArrows: true },
    },
    {
      columns: 3,
      type: "slide",
      _carousel: { itemsToShow: 3, onChange: onChangeSlide, showArrows: true },
    },
    {
      columns: 4,
      type: "grid",
      _carousel: { itemsToShow: 4, onChange: onChangeSlide, showArrows: true },
    },
    {
      columns: 4,
      type: "grid",
      _carousel: { itemsToShow: 4, onChange: onChangeSlide, showArrows: true },
    },
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carousel, setCarousel] = useState<any>({});
  const [shadowCircle] = useToken("colors", ["gray.700"]);

  const CircleSlide: React.FC<{ index: number }> = ({ index }) => {
    return (
      <Circle
        size={14}
        pos={"relative"}
        zIndex={10}
        bg={currentSlide === index ? "primary.100" : "gray.700"}
        color={currentSlide === index ? "primary.500" : "primary.500"}
        fontSize={currentSlide === index ? "xl" : "xl"}
        transition={"all .2s ease-in-out"}
        border={"2px solid transparent"}
        borderColor={"primary.500"}
        fontWeight={"bold"}
        boxShadow={`0 0 0 6px ${shadowCircle}`}
        onClick={() => {
          carousel.goTo(index);
        }}
      >
        {index + 1}
      </Circle>
    );
  };

  return (
    <>
      <Col
        bg={[
          "gray.700",
          "gray.700",
          "gray.700",
          "primary.600",
          "primary.600",
          "primary.600",
        ]}
      >
        <Content>
          <Col>
            <Row
              alignItems={"center"}
              justifyContent={"center"}
              py={4}
              mt={8}
              mb={4}
              color={"primary.100"}
            >
              <Heading
                textAlign={"center"}
                textTransform={"uppercase"}
                size={"lg"}
                mx={8}
              >
                Como a mágica acontece
              </Heading>
            </Row>
            {showPagination && (
              <Row
                alignItems={"center"}
                justifyContent={"space-around"}
                pos={"relative"}
                mt={4}
                mb={8}
              >
                <CircleSlide index={0} />
                <CircleSlide index={1} />
                <CircleSlide index={2} />
                <CircleSlide index={3} />
                <Row
                  pos={"absolute"}
                  w={"90%"}
                  h={"1px"}
                  bg={"primary.500"}
                  zIndex={5}
                  left={"5%"}
                ></Row>
              </Row>
            )}
            <AppGrid
              type={"slide"}
              gap={4}
              columns={4}
              onCarousel={setCarousel}
              _carousel={{
                itemsToShow: 2,
              }}
              {...(gridOptions as any)}
            >
              <HowWorkItem
                title={"Conta pra gente"}
                listItems={["Pra quem é a música?", "É uma ocasião especial?"]}
              />
              <HowWorkItem
                title={"Escolha como você quer a sua música"}
                listItems={[
                  "Estilo Musical",
                  "Tipo de Voz",
                  "Artista",
                  "Não se preocupa, a gente te ajuda",
                ]}
                isDown
              />
              <HowWorkItem
                title={"Conta a história"}
                listItems={["Que vamos transformá-la em música"]}
              />
              <HowWorkItem
                title={"Conta pra gente"}
                listItems={[
                  "Para grandes emoções!",
                  "Vai receber uma canção feita só para você em até 7 dias",
                ]}
                isDown
              />
            </AppGrid>
          </Col>
        </Content>
      </Col>
    </>
  );
};

export default HowWorksSectionHome;
