import { BoxProps, Heading } from "@chakra-ui/react";
import React from "react";
import { Col, Row } from "..";

export interface CardTitleProps extends Omit<BoxProps, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  colorScheme?: string;
  _rightHeader?: React.ReactNode;
}

export const CardTitle: React.NextFC<CardTitleProps> = ({
  title,
  description,
  children,
  colorScheme,
  _rightHeader,
  ...rest
}) => {
  return (
    <Col
      w={"100%"}
      rounded={"xl"}
      bg={"white"}
      borderStyle={"solid"}
      borderColor={`${colorScheme}.200`}
      boxShadow={`0 0 0 0 transparent`}
      transition={"box-shadow .2s ease-in-out"}
      _dark={{
        bg: "gray.650",
        borderColor: "gray.600",
      }}
      {...rest}
    >
      <Row alignItems={"center"} p={4} pb={2}>
        <Heading
          transition={"all .2s ease-in-out"}
          _groupHover={{ color: `${colorScheme}.200` }}
          flex={1}
          size={"md"}
          cursor={"default"}
        >
          {title}
        </Heading>
        {_rightHeader}
      </Row>
      {description && (
        <>
          <Row px={4} mb={3} mt={"auto"}>
            <Row
              h={1}
              w={"100%"}
              bg={"darken.50"}
              rounded={"lg"}
              _dark={{ bg: "lighten.50" }}
            />
          </Row>
          <Heading
            color={"#777"}
            size={"xs"}
            px={4}
            pb={4}
            fontWeight={"normal"}
          >
            {description}
          </Heading>
        </>
      )}
      <Col mt={"auto"}>{children}</Col>
    </Col>
  );
};
