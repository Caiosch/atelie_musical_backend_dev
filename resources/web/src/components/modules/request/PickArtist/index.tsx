import AudioPlayer from "@/components/layout/shared/AudioPlayer";
import { Col, Row } from "@/components/shared";
import CtrlFormSelectBase, {
  CtrlFormSelectBaseContract,
} from "@/components/shared/ctrl-forms/CtrlFormSelectBase";
import { Avatar, Heading } from "@chakra-ui/react";
import React from "react";

interface PickArtistProps
  extends CtrlFormSelectBaseContract<{
    id: string;
    name: string;
    avatar: string;
    src?: string;
  }> {}

const PickArtist: React.FC<PickArtistProps> = ({ items, ...rest }) => {
  return (
    <CtrlFormSelectBase
      items={items.map((item) => ({
        label: ({ select, isSelected }) => (
          <Col flexDir={["column", null, null, "row", null, null]} gap={4}>
            <Row
              alignItems={"center"}
              cursor={"pointer"}
              userSelect={"none"}
              flex={1}
              onClick={() => {
                select();
              }}
            >
              <Avatar src={item.avatar} />
              <Col pl={2} flex={1}>
                <Row>
                  <Heading
                    size={"md"}
                    textTransform={"uppercase"}
                    px={4}
                    py={1}
                    flex={1}
                    rounded={100}
                    border={"2px solid transparent"}
                    borderColor={isSelected ? "gray.600" : "primary.500"}
                    bg={isSelected ? "gray.600" : "primary.500"}
                    color={isSelected ? "primary.300" : "primary.900"}
                  >
                    {item.name}
                  </Heading>
                </Row>
              </Col>
            </Row>
            {item.src && (
              <Row flex={1}>
                <AudioPlayer src={item.src} />
              </Row>
            )}
          </Col>
        ),
        value: item.id,
      }))}
      {...rest}
    ></CtrlFormSelectBase>
  );
};

export default PickArtist;
