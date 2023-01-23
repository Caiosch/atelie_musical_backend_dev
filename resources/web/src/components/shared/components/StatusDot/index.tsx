import { BoxProps, Circle, Text } from "@chakra-ui/react";
import React from "react";
import { Col, Row } from "..";

interface StatusDotProps extends BoxProps {
  statusColor?: string;
  size?: number;
}

export const StatusDot: React.FC<StatusDotProps> = ({
  children,
  statusColor = "primary",
  size = 3,
  ...rest
}) => {
  const dotColor = `${statusColor}.500`;

  return (
    <Row rounded={"2xl"} alignItems={"center"} userSelect={"none"} {...rest}>
      <Circle size={size} bg={dotColor} />
      <Col flex={1} pl={2}>
        <Text>{children}</Text>
      </Col>
    </Row>
  );
};
