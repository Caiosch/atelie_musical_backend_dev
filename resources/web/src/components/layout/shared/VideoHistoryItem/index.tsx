import { Col, Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import { Button, Circle, Heading, Img, Text } from "@chakra-ui/react";
import React from "react";
import { BsPlayFill } from "react-icons/bs";
import { RequestMusicLink } from "../../links";
import ButtonCTA from "../ButtonCTA";

interface VideoHistoryItemProps {
  posterTitle: string;
  poster: string;
  artistName: string;
  typeName: string;
  title: string;
  descriptions: string[];
}

const VideoHistoryItem: React.FC<VideoHistoryItemProps> = ({
  poster,
  artistName,
  descriptions,
  posterTitle,
  title,
  typeName,
}) => {
  return (
    <Row
      flexDir={["column", null, "row", null, null, null]}
      px={[4, null, 0, null, null, null]}
      w={"90%"}
    >
      <Col
        bg={"secondary.500"}
        rounded={"3xl"}
        roundedTopLeft={"none"}
        minH={[200, 230, 230, 300, 300, 300, 300]}
        flex={1}
        mb={[8, null, 0, null, null, null]}
      >
        <Row px={4} pt={4} alignItems={"center"} justifyContent={"center"}>
          <Heading
            size={"sm"}
            color={"primary.500"}
            textTransform={"uppercase"}
          >
            {posterTitle}
          </Heading>
        </Row>
        <Col p={4} pos={"relative"}>
          <Img
            w={"100%"}
            h={[160, 230, 230, 300, 300, 300, 300]}
            rounded={"md"}
            src={poster}
            objectFit={"cover"}
          />
          <Row pos={"absolute"} bottom={0} left={0} pl={10}>
            <Circle size={10} bg={"primary.400"} color={"white"}>
              <BsPlayFill size={30} />
            </Circle>
          </Row>
        </Col>
        <Row
          px={4}
          pb={2}
          alignItems={"center"}
          justifyContent={"center"}
          color={"white"}
        >
          <Text fontSize={"sm"} fontWeight={"normal"}>
            {artistName}
          </Text>
          <Text
            fontWeight={"bold"}
            textTransform={"uppercase"}
            pl={8}
            fontSize={"sm"}
            color={"primary.50"}
          >
            {typeName}
          </Text>
        </Row>
      </Col>
      <Col
        w={["100%", null, "40%", null, null, null]}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Col
          maxW={"100%"}
          w={["80%", null, 300, null, null]}
          textAlign={["center", null, "left", null, null]}
        >
          <Heading size={"md"} mb={4}>
            {title}
          </Heading>
          <ListView
            items={descriptions}
            render={(p) => (
              <Text as="p" mb={1} fontWeight={"normal"} fontSize={"sm"}>
                {p}
              </Text>
            )}
          />
        </Col>
        <Row p={4} w={"100%"}>
          <RequestMusicLink>
            <ButtonCTA
              bg={"gray.600"}
              color={"primary.500"}
              w={"100%"}
              fontSize={"xs"}
              maxW={"100%"}
            >
              Quero Criar a Minha Música
            </ButtonCTA>
          </RequestMusicLink>
        </Row>
      </Col>
    </Row>
  );
};

export default VideoHistoryItem;
