import {
  BoxProps,
  Collapse,
  Heading,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import { VscTrash } from "react-icons/vsc";
import { BoxMotion } from "../BoxMotion";
import { ButtonConfirm, ButtonConfirmProps } from "../ButtonConfirm";
import { Col } from "../Col";
import { Row } from "../Row";

interface CardCollapseProps extends BoxProps {
  title: string;
  children: React.ReactNode;
  _rightContent?: React.ReactNode;
}

export const CardCollapse: React.FC<CardCollapseProps> = ({
  title,
  children,
  _rightContent,
  ...rest
}) => {
  const collapse = useDisclosure();
  useEffect(() => {
    collapse.onOpen();
  }, []);

  return (
    <Col
      bg={"white"}
      rounded={"lg"}
      border={"1px solid transparent"}
      borderColor={"gray.300"}
      _dark={{ bg: "gray.700", borderColor: "gray.600" }}
      {...rest}
    >
      <Row p={4} alignItems={"center"}>
        <Col flex={1}>
          <Heading size={"md"}>{title}</Heading>
        </Col>
        {collapse.isOpen && _rightContent && (
          <BoxMotion
            animate={"animate"}
            initial={"init"}
            variants={{
              animate: {
                opacity: 1,
                translateX: 0,
              },
              init: {
                opacity: 0,
                translateX: "100%",
              },
            }}
          >
            {_rightContent}
          </BoxMotion>
        )}
        <IconButton
          aria-label=""
          onClick={collapse.onToggle}
          rounded={"50%"}
          transition={"all .2s ease-in-out"}
          transform={collapse.isOpen ? "rotate(0deg)" : "rotate(180deg)"}
        >
          <BsChevronDown size={18} />
        </IconButton>
      </Row>
      <Collapse in={collapse.isOpen}>{children}</Collapse>
    </Col>
  );
};
