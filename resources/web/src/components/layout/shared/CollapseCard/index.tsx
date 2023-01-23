import { Col, Row } from "@/components/shared";
import {
  Collapse,
  Heading,
  Show,
  Square,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiOutlineDown } from "react-icons/ai";

const CollapseCard: React.FC<{
  children?: React.ReactNode;
  title: string;
}> = ({ title, children }) => {
  const show = useDisclosure();

  useEffect(() => {
    show.onOpen();
  }, []);

  return (
    <Col>
      <Row
        color={"primary.400"}
        alignItems={"center"}
        onClick={show.onToggle}
        cursor={"pointer"}
        userSelect={"none"}
      >
        <Heading
          size={["md", "md", "md", "lg", "lg", "lg"]}
          textTransform={"uppercase"}
          flex={1}
        >
          {title}
        </Heading>
        <Square pr={2} cursor={"pointer"} userSelect={"none"}>
          <AiOutlineDown size={24} />
        </Square>
      </Row>
      <Collapse in={show.isOpen}>{children}</Collapse>
    </Col>
  );
};

export default CollapseCard;
