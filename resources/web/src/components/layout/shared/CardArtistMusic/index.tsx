import { Col, Row } from "@/components/shared";
import { Box, Circle, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import AudioPlayer from "../AudioPlayer";
import BadgeMusicStyle from "../BadgeMusicStyle";

const CardArtistMusic: React.FC<{
  title: string;
  source?: string;
  genres?: string[];
  category?: string;
}> = ({ genres, category, title, source }) => {
  return (
    <Col
      bg={"primary.100"}
      color={"gray.600"}
      px={8}
      py={4}
      roundedTopRight={"2xl"}
      roundedBottomLeft={"2xl"}
      shadow={"lg"}
    >
      <Col>
        <Heading size={"md"}>{title}</Heading>
        <Row alignItems={"center"}>
          <Circle size={2} bg={"primary.600"} mb={1} mr={2} />
          {category && (
            <Heading size={"sm"} color={"primary.600"}>
              {category}
            </Heading>
          )}
        </Row>
        {genres && (
          <SimpleGrid gap={2} columns={[2, 2, 3, 3, 3, 3]} mt={4}>
            {genres.map((v, keyV) => (
              <BadgeMusicStyle
                key={`item${keyV}`}
                mr={2}
                textAlign={"center"}
                fontSize={"xs"}
              >
                {v}
              </BadgeMusicStyle>
            ))}
          </SimpleGrid>
        )}
        {source && (
          <Row mt={4}>
            <AudioPlayer src={source} />
          </Row>
        )}
      </Col>
    </Col>
  );
};

export default CardArtistMusic;
