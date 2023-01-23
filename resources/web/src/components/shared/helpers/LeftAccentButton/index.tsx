import { Col, NavbarButtonRenderProps, Row } from "@/components/shared";
import { Square, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LeftAccentButton = (props: NavbarButtonRenderProps) => {
  return (
    <Col>
      <Link to={props.to}>
        <Row
          px={4}
          py={2}
          cursor={"pointer"}
          fontFamily={"heading"}
          fontSize={"md"}
          fontWeight={props.isActive ? "bold" : "normal"}
          alignItems={"center"}
          borderLeft={"3px solid transparent"}
          transition={"background .2s ease-in-out"}
          borderColor={props.isActive ? "primary.600" : "transparent"}
          color={props.isActive ? "primary.600" : "inherit"}
          _dark={{
            color: props.isActive ? "primary.100" : "inherit",
            borderColor: props.isActive ? "primary.400" : "transparent",
            _hover: {
              borderColor: props.isActive ? "primary.400" : "gray.700",
            },
          }}
          _hover={{
            borderColor: props.isActive ? "primary.600" : "gray.200",
          }}
        >
          {props.icon && (
            <Square
              size={10}
              color={props.isActive ? "white" : undefined}
              bg={props.isActive ? "primary.400" : undefined}
              rounded={"xl"}
              shadow={props.isActive ? "md" : undefined}
            >
              {props.icon}
            </Square>
          )}
          <Text pl={2}>{props.label}</Text>
        </Row>
      </Link>
    </Col>
  );
};

export default LeftAccentButton;
