import { RequestMusicLink } from "@/components/layout/links";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import { Col, Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import { Img, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";

const HeaderSectionHome: React.FC = () => {
  return (
    <>
      <Col w={"100%"} pos={"relative"}>
        <Row h={"100%"} w={"100%"} pos={"relative"}>
          <Col
            w={["100%", "100%", "100%", "40vw"]}
            h={"100%"}
            pos={["absolute", "absolute", "absolute", "relative"]}
            left={0}
            top={0}
            zIndex={10}
            background={"black"}
          >
            <Img
              w={"100%"}
              h={"100%"}
              objectFit={"cover"}
              src={
                "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              }
              opacity={[0.2, 0.2, 0.2, 1, 1, 1]}
            />
          </Col>
          <Col
            w={["100%", "100%", "100%", "40vw"]}
            h={"100%"}
            pos={["relative", "relative", "relative", "relative"]}
            left={0}
            top={0}
            flex={1}
            bg={["transparent", "transparent", "transparent", "gray.600"]}
            justifyContent={"center"}
            pl={[0, 6, 20]}
            zIndex={20}
          >
            <Col
              maxW={"100%"}
              mt={"auto"}
              w={["100%", "100%", "100%", "52%", "52%", "52%"]}
            >
              <Heading
                as={"h1"}
                fontSize={"44px"}
                color={"primary.100"}
                mb={8}
                pl={3}
                mt={72}
                display={"flex"}
                flexDir={"column"}
              >
                <ListView
                  items={["Crie uma música", "para quem você ama"]}
                  render={(v, k) => (
                    <Text
                      as={"span"}
                      color={k <= 0 ? "primary.500" : "primary.50"}
                    >
                      {v}
                    </Text>
                  )}
                />
              </Heading>

              <Col gap={4} px={6} pb={8}>
                <RequestMusicLink>
                  <ButtonCTA
                    w={"100%"}
                    bg={"primary.100"}
                    color={"primary.600"}
                  >
                    Começar Minha Música
                  </ButtonCTA>
                </RequestMusicLink>
                <ButtonCTA
                  w={"100%"}
                  bg={"primary.500"}
                  color={"primary.100"}
                  rightIcon={<AiOutlineWhatsApp size={26} />}
                >
                  Saber Mais
                </ButtonCTA>
              </Col>
            </Col>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default HeaderSectionHome;
