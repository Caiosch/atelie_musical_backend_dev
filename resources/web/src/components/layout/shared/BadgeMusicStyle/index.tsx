import { Row } from "@/components/shared";
import { Badge, BadgeProps, Box } from "@chakra-ui/react";
import React from "react";

// import { Container } from './styles';

const BadgeMusicStyle: React.FC<BadgeProps> = (props) => {
  return (
    <Box
      bg={"primary.500"}
      color={"primary.100"}
      py={1}
      rounded={999}
      px={3}
      fontFamily={"heading"}
      textAlign={"center"}
      display={"inline-block"}
      {...props}
    />
  );
};

export default BadgeMusicStyle;
