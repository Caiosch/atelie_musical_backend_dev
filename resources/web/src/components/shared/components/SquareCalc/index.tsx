import { Box, BoxProps } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { Col } from "../Col";

// import { Container } from './styles';

interface SquareCalcProps extends BoxProps {
  by?: "width" | "height";
}

export const SquareCalc: React.FC<SquareCalcProps> = ({
  by = "width",
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const setSquareSizesEquals = () => {
    const size =
      by === "width" ? ref.current?.offsetWidth : ref.current?.offsetHeight;

    if (size) {
      ref.current?.style.setProperty(
        by === "width" ? "height" : "width",
        `${size}px`
      );
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSquareSizesEquals();
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      ref={ref}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      {...rest}
    ></Box>
  );
};
