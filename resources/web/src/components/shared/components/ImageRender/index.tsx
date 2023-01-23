import { Img, ImgProps } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface ImageRenderProps extends ImgProps {}

export const ImageRender: React.FC<ImageRenderProps> = ({ src, ...rest }) => {
  return (
    <Img
      src={`/src/assets/${src?.startsWith("/") ? src : `/${src}`}`}
      {...rest}
    />
  );
};
