import { Col, Row } from "@/components/shared";
import {
  Circle,
  Collapse,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BsPlus } from "react-icons/bs";

interface CardCollapseItemProps {
  title: string;
  description: React.ReactNode[];
}

const CardCollapseItem: React.FC<CardCollapseItemProps> = ({
  title,
  description,
}) => {
  const show = useDisclosure();

  return (
    <Col
      bg={"primary.50"}
      border={"1px solid transparent"}
      borderColor={"secondary.500"}
      rounded={"lg"}
      shadow={"lg"}
    >
      <Row p={4}>
        <Text
          flex={1}
          fontSize={"2xl"}
          color={"secondary.400"}
          fontWeight={"bold"}
          pr={4}
        >
          {title}
        </Text>
        <Circle
          size={10}
          bg={show.isOpen ? "red.500" : "secondary.500"}
          color={"white"}
          onClick={show.onToggle}
          transition={"all .2s ease-in-out"}
          transform={`rotate(${show.isOpen ? 45 + 90 : "0"}deg)`}
          cursor={"pointer"}
        >
          <BsPlus size={30} />
        </Circle>
      </Row>
      <Collapse in={show.isOpen}>
        <SimpleGrid py={4} px={8} gap={1} color={"gray.500"}>
          {description.map((d, keyD) => (
            <Text minH={5} key={`desc${keyD}`} fontSize={"xl"} as={"div"}>
              {d}
            </Text>
          ))}
        </SimpleGrid>
      </Collapse>
    </Col>
  );
};

export default CardCollapseItem;
