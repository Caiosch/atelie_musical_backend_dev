import { Col, Row } from "@/components/shared";
import CtrlFormSelectBase, {
  CtrlFormSelectBaseContract,
} from "@/components/shared/ctrl-forms/CtrlFormSelectBase";
import { ListView } from "@/components/shared/helpers/ListView";
import { Heading, Link, Text } from "@chakra-ui/react";
import React from "react";

interface PickMusicExtrasProps
  extends CtrlFormSelectBaseContract<{
    value: string;
    title: string;
    price: number;
    icon: React.ReactNode;
    description: string[];
    plusDeadline: number;
  }> {}

const PickMusicExtras: React.FC<PickMusicExtrasProps> = ({
  items,
  ...rest
}) => {
  return (
    <CtrlFormSelectBase
      items={items.map((item) => ({
        label: ({ toggle, isSelected }) => (
          <Col w={400} maxW={"100%"} mx={"auto"}>
            <Col
              onClick={toggle}
              rounded={"2xl"}
              cursor={"pointer"}
              userSelect={"none"}
              p={2}
            >
              <Row
                py={2}
                bg={isSelected ? "primary.500" : "transparent"}
                color={isSelected ? "white" : "gray.600"}
                border={"1px solid transparent"}
                borderColor={isSelected ? "transparent" : "gray.600"}
                rounded={"2xl"}
              >
                <Heading
                  size={"sm"}
                  textTransform={"uppercase"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                  w={"100%"}
                >
                  {item.title}
                </Heading>
              </Row>
              <Col
                h={150}
                w={260}
                maxW={"100%"}
                bg={"green.600"}
                mt={2}
                rounded={"2xl"}
                pos={"relative"}
                border={"2px solid transparent"}
                borderColor={"primary.500"}
                alignItems={"center"}
                justifyContent={"center"}
                color={"white"}
                mx={"auto"}
              >
                {item.icon}
                <Row
                  bottom={0}
                  w={"100%"}
                  pos={"absolute"}
                  p={4}
                  alignItems={"center"}
                >
                  <Row flex={1}>
                    <Link
                      fontSize={"xs"}
                      colorScheme={"primary"}
                      textDecor={"underline"}
                      color={"white"}
                      fontWeight={"bold"}
                      fontStyle={"italic"}
                    >
                      Prazo: +{item.plusDeadline}dias
                    </Link>
                  </Row>
                  <Heading size={"sm"} fontWeight={"bold"}>
                    ${item.price}
                  </Heading>
                </Row>
              </Col>
            </Col>
            <ListView
              items={item.description}
              render={(text) => (
                <Text
                  fontSize={"xs"}
                  textAlign={"center"}
                  fontWeight={"bold"}
                  fontStyle={"italic"}
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              )}
            />
          </Col>
        ),
        value: item.value,
      }))}
      {...rest}
    />
  );
};

export default PickMusicExtras;
