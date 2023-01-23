import { Square, SquareProps, Text } from "@chakra-ui/react";
import React from "react";
import { Col } from "..";

export const SquareBigButton: React.FC<
  SquareProps & { title: string; icon: React.ReactNode; isActive?: boolean }
> = ({ title, icon, isActive, ...rest }) => {
  return (
    <Square
      size={48}
      bg={isActive ? "linear(to-b, primary.400, primary.500)" : "white"}
      rounded={"lg"}
      shadow={"lg"}
      cursor={"pointer"}
      transition={"all .2s ease-in-out"}
      userSelect={"none"}
      _active={{
        transform: "scale(0.98)",
      }}
      _hover={{ bgGradient: "linear(to-b, primary.400, primary.500)" }}
      _dark={{
        bgGradient: isActive
          ? "linear(to-b, primary.400, primary.600)"
          : "linear(to-b, gray.900, gray.1000)",
        _hover: {
          bgGradient: "linear(to-b, primary.400, primary.600)",
        },
      }}
      {...rest}
    >
      <Col alignItems={"center"}>
        {icon}
        <Text mt={2} fontWeight={"bold"} fontFamily={"heading"} fontSize={"sm"}>
          {title}
        </Text>
      </Col>
    </Square>
  );
};
