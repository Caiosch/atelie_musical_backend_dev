import { Row, Col } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import { Box, Heading, Img, Text } from "@chakra-ui/react";
import React from "react";
import AudioPlayer from "../AudioPlayer";

interface MusicCardItemProps {
  musicTitle: string;
  descriptions: string[];
  image: string;
  artistName: string;
  artistGenre: string;
}

const MusicCardItem: React.FC<MusicCardItemProps> = ({
  artistGenre,
  artistName,
  descriptions,
  image,
  musicTitle,
}) => {
  return (
    <>
      <Row
        maxW={"100%"}
        mx={"auto"}
        gap={12}
        flexDir={["column-reverse", null, "row", null, null, null]}
      >
        <Col flex={1} alignItems={"end"} justifyContent={"center"}>
          <Col
            maxW={"100%"}
            w={["100%", null, 400, null, null]}
            px={[10, null, 0, null, null]}
            color={"primary.100"}
            gap={2}
          >
            <Heading
              size={"md"}
              textAlign={["center", null, "left", null, null, null]}
            >
              {musicTitle}
            </Heading>
            <Row>{/* <AudioPlayer /> */}</Row>
            <Text
              textAlign={["center", null, "right", null, null, null]}
              pl={[0, null, 8, null, null, null]}
              w={["80%", null, "100%", null, null]}
              mx={["auto", "auto", "initial", null, null]}
            >
              <ListView
                items={descriptions}
                render={(p) => (
                  <Text as={"span"} fontWeight={400}>
                    {p}
                  </Text>
                )}
              />
            </Text>
          </Col>
        </Col>
        <Row flex={1}>
          <Box pos={"relative"} mx={"auto"}>
            <Img
              w={[180, 180, 240, 240, 240, 240]}
              roundedTopLeft={"100px"}
              roundedBottomRight={"100px"}
              src={image}
            />
            <Col pos={"absolute"} right={-6} bottom={-4} w={240}>
              <Row>
                <Row flex={1} />
                <Text fontSize={"xs"} fontWeight={"bold"} color={"primary.100"}>
                  Artista
                </Text>
              </Row>
              <Row>
                <Row flex={1} />
                <Col
                  px={8}
                  py={3}
                  bg={"gray.700"}
                  color={"primary.100"}
                  shadow={"lg"}
                  rounded={"sm"}
                >
                  <Heading size={"md"} fontFamily={"body"}>
                    {artistName}
                  </Heading>
                  <Heading
                    size={"xs"}
                    fontSize={"xs"}
                    textTransform={"uppercase"}
                    color={"primary.500"}
                    fontFamily={"body"}
                  >
                    {artistGenre}
                  </Heading>
                </Col>
              </Row>
            </Col>
          </Box>
        </Row>
      </Row>
    </>
  );
};

export default MusicCardItem;
