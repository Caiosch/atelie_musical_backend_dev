import { RequestMusicLink } from "@/components/layout/links";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import { Col, Content, Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import { Circle, Heading, Img, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";
import { VscArrowRight, VscQuote } from "react-icons/vsc";

const CommentsSectionHome: React.FC = () => {
  return (
    <>
      <Col bg={"primary.100"}>
        <Content pb={10}>
          <Col
            mt={8}
            mb={8}
            py={4}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <ListView
              items={["Ah, se o mundo inteiro", "me pudesse ouvir."]}
              render={(v) => (
                <Heading
                  size={"md"}
                  color={"secondary.500"}
                  textAlign={"center"}
                >
                  {v}
                </Heading>
              )}
            />
          </Col>
          <Row
            w={700}
            maxW={"100%"}
            mx={"auto"}
            flexDir={["column", null, null, "row", null, null]}
          >
            <Col
              flex={1}
              pos={"relative"}
              alignItems={"center"}
              justifyContent={"center"}
              px={[10, null, null, 0, null, null]}
            >
              <Circle
                bg={"gray.600"}
                color={"primary.500"}
                pos={"absolute"}
                right={[12, null, null, -10, null, null]}
                top={-8}
                shadow={"lg"}
                size={16}
              >
                <VscQuote size={30} />
              </Circle>
              <Circle
                bg={"gray.600"}
                color={"primary.500"}
                pos={"absolute"}
                shadow={"lg"}
                size={16}
              >
                <BsPlayFill size={60} />
              </Circle>
              <Col
                left={["4%", null, null, -10, null, null]}
                bottom={4}
                bg={"gray.700"}
                rounded={"sm"}
                shadow={"lg"}
                pos={"absolute"}
                py={4}
                px={8}
              >
                <Heading size={"md"} color={"primary.500"} fontFamily={"body"}>
                  Maria Lima
                </Heading>
                <Heading
                  fontFamily={"body"}
                  size={"xs"}
                  textTransform={"uppercase"}
                  color={"primary.700"}
                >
                  Família
                </Heading>
              </Col>
              <Img
                w={230}
                h={300}
                src={
                  "https://images.unsplash.com/photo-1579047917338-a6a69144fe63?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                }
                objectFit={"cover"}
                roundedTopLeft={"130px"}
                roundedBottomRight={"130px"}
              />
            </Col>
            <Col
              flex={1}
              alignItems={"center"}
              justifyContent={"center"}
              mt={6}
              px={4}
            >
              <ListView
                items={[
                  "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI.",
                  "Quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum",
                ]}
                render={(v) => (
                  <Text
                    fontWeight={500}
                    fontSize={"16px"}
                    textAlign={"center"}
                    mb={2}
                    _last={{ mb: 0 }}
                  >
                    {v}
                  </Text>
                )}
              />
            </Col>
          </Row>
          <Row alignItems={"center"} justifyContent={"center"} py={4} px={4}>
            <RequestMusicLink>
              <ButtonCTA bg={"gray.600"} color={"primary.500"} w={"100%"}>
                Quero começar minha música
              </ButtonCTA>
            </RequestMusicLink>
          </Row>
        </Content>
      </Col>
    </>
  );
};

export default CommentsSectionHome;
