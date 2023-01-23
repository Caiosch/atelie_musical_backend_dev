import { Square, SquareProps } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { AiOutlineInstagram, AiOutlineWhatsApp } from "react-icons/ai";

interface SocialIconProps extends SquareProps {
  type: "whatsapp" | "instagram";
  iconSize?: number;
}

export const SocialIcon: React.FC<SocialIconProps> = ({
  type,
  iconSize = 14,
  ...rest
}) => {
  return (
    <Square
      rounded={"lg"}
      color={"white"}
      {...rest}
      bg={rest.bg || `${type}.500`}
    >
      {type === "instagram" && <AiOutlineInstagram size={iconSize} />}
      {type === "whatsapp" && <AiOutlineWhatsApp size={iconSize} />}
    </Square>
  );
};
