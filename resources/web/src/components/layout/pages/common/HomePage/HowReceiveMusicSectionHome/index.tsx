import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import { Col, Content, Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import { Circle, Heading, Img, Square, Text } from "@chakra-ui/react";
import React from "react";
import { BiMusic } from "react-icons/bi";
import { BsPlay } from "react-icons/bs";

const HowReceiveMusicSectionHome: React.FC = () => {
  return (
    <Col>
      <Col bg={"primary.600"} color={"primary.50"} px={8}>
        <Content py={12}>
          <Heading
            size={"lg"}
            textAlign={"center"}
            textTransform={"uppercase"}
            lineHeight={"95%"}
            pos={"relative"}
            style={{ lineHeight: "120%" }}
          >
            Como você recebe a sua música{" "}
            <Square
              pos={"absolute"}
              display={"inline-block"}
              color={"primary.400"}
              bottom={-2}
            >
              <BiMusic size={34} />
            </Square>
          </Heading>
          <Col gap={4} pt={8}>
            <ListView
              items={[
                {
                  description: [
                    "Te enviaremos uma página exclusiva onde pode, ouvir e baixar a música, ver a letra e assisir ao visualizer que criaremos com a foto que escolher.",
                  ],
                  imageSrc:
                    "https://www.testeryou.com/wp-content/uploads/2018/06/TesterYou-2.jpg",
                  videoSrc: "video_source",
                  _item: {
                    roundedTopLeft: "3xl",
                    roundedBottomRight: "3xl",
                  },
                },
                {
                  description: [
                    "Para aumentar ainda mais a emoção, você pode adicionar ao seu pedido um VÍDEO Q CANTA, com as fotos que nos enviar e a letra acompanhando o ritmo da música.",
                    "Veja o exemplo:",
                  ],
                  imageSrc:
                    "https://www.testeryou.com/wp-content/uploads/2018/06/TesterYou-2.jpg",
                  videoSrc: "video_source",
                  _item: {
                    roundedTopRight: "3xl",
                    roundedBottomLeft: "3xl",
                  },
                  _circle: { right: 5 },
                  isExtra: true,
                },
                {
                  description: [
                    "Quer ouvir a sua música no Spotify, Deezer, Apple Music, Instagram, TikTok, etc.?",
                    "É só adicionar ao seu pedido :)",
                  ],
                  imageSrc:
                    "https://www.testeryou.com/wp-content/uploads/2018/06/TesterYou-2.jpg",
                  _item: {
                    roundedTopRight: "3xl",
                    roundedBottomLeft: "3xl",
                  },
                  _circle: { left: 5 },
                  isExtra: true,
                },
              ]}
              render={(props, index) => (
                <Col>
                  <Row>
                    <Circle
                      bg={"primary.50"}
                      color={"primary.400"}
                      fontWeight={"bold"}
                      size={6}
                    >
                      {index + 1}
                    </Circle>
                    <Col ml={-2}>
                      <ListView
                        items={props.description}
                        render={(desc, descIndex) => (
                          <Text
                            textAlign={"center"}
                            fontWeight={"normal"}
                            style={{ textIndent: "6px" }}
                          >
                            {desc}
                          </Text>
                        )}
                      />
                    </Col>
                  </Row>
                  <Row h={props.isExtra ? 8 : 4} />
                  <Col
                    h={140}
                    bg={"black"}
                    border={"2px solid transparent"}
                    borderColor={"primary.400"}
                    pos={"relative"}
                    {...props._item}
                  >
                    {props.isExtra && (
                      <Circle
                        size={14}
                        border={"2px solid transparent"}
                        borderColor={"primary.100"}
                        transform={"rotate(20deg)"}
                        fontWeight={"bold"}
                        bg={"primary.500"}
                        color={"primary.50"}
                        pos={"absolute"}
                        top={-7}
                        {...props._circle}
                      >
                        Extra
                      </Circle>
                    )}
                    {props.imageSrc && (
                      <Img
                        w={"100%"}
                        h={"100%"}
                        objectFit={"cover"}
                        {...props._item}
                        src={props.imageSrc}
                      />
                    )}
                    {props.videoSrc && (
                      <Circle
                        size={14}
                        border={"2px solid transparent"}
                        borderColor={"lighten.600"}
                        color={"lighten.600"}
                        pos={"absolute"}
                        top={"50%"}
                        left={"50%"}
                        ml={-7}
                        mt={-7}
                      >
                        <BsPlay size={42} />
                      </Circle>
                    )}
                  </Col>
                </Col>
              )}
            />
          </Col>
        </Content>
      </Col>
      <Row
        alignItems={"center"}
        justifyContent={"center"}
        py={4}
        bg={"gray.600"}
      >
        <Row gap={6} mx={"auto"} alignItems={"center"}>
          <Heading
            size={"sm"}
            w={"40%"}
            flex={1}
            textAlign={"right"}
            color={"primary.50"}
            fontSize={"lg"}
            fontFamily={"body"}
          >
            A partir de{" "}
            <Text as={"span"} display={"block"} color={"primary.500"}>
              4x de R$175
            </Text>
          </Heading>
          <ButtonCTA
            rounded={"none"}
            roundedTopRight={"27px"}
            roundedBottomLeft={"27px"}
            bg={"primary.50"}
            color={"gray.700"}
            px={6}
            py={0}
            h={8}
            fontFamily={"body"}
            textTransform={"none"}
            fontSize={"lg"}
          >
            Ver valores
          </ButtonCTA>
        </Row>
      </Row>
    </Col>
  );
};

export default HowReceiveMusicSectionHome;
