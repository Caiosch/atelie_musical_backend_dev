import { Img, ImgProps } from "@chakra-ui/react";
import React from "react";

const LogoItem: React.FC<ImgProps> = ({ ...rest }) => {
  return (
    <Img
      src={
        "https://meubemquere.com/wp-content/uploads/2022/01/Logo-AMU-Amarelo-Marrom-Onda2-29-1-e1666882683539.png"
      }
      {...rest}
    />
  );
};

export default LogoItem;
