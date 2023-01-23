import { Button, ButtonProps, Square, Text } from "@chakra-ui/react";
import React from "react";

const ButtonCTA: React.FC<ButtonProps> = ({
  children,
  rightIcon,
  leftIcon,
  ...rest
}) => {
  return (
    <Button
      display={"flex"}
      colorScheme={"primary"}
      bg={"primary.200"}
      maxH={"initial"}
      maxW={"initial"}
      px={16}
      pos={"relative"}
      color={"primary.800"}
      py={6}
      rounded={"3xl"}
      textTransform={"uppercase"}
      alignItems={"center"}
      rightIcon={
        rightIcon ? (
          <Square mr={4} size={12} pos={"absolute"} right={0} top={0}>
            {rightIcon}
          </Square>
        ) : undefined
      }
      leftIcon={
        leftIcon ? (
          <Square ml={4} size={12} pos={"absolute"} left={0} top={0}>
            {leftIcon}
          </Square>
        ) : undefined
      }
      _hover={{}}
      _active={{}}
      _focus={{}}
      {...rest}
    >
      <Text flex={1}>{children}</Text>
    </Button>
  );
};

export default ButtonCTA;
