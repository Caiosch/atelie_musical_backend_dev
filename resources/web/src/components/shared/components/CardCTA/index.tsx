import { Button } from "@chakra-ui/react";
import React from "react";
import { CardTitle, CardTitleProps } from "../CardTitle";
import { Col } from "../Col";
import { ImageRender } from "../ImageRender";
import { Row } from "../Row";

interface CardCTAProps extends CardTitleProps {
  src?: string;
  colorScheme?: string;
  button: {
    label: string;
    onClick?: () => void;
  };
}

export const CardCTA: React.FC<CardCTAProps> = ({
  src,
  button,
  colorScheme = "primary",
  ...cardTitleProps
}) => {
  return (
    <CardTitle {...cardTitleProps} colorScheme={colorScheme}>
      {src && (
        <Col p={4}>
          <ImageRender src={src} h={150} />
        </Col>
      )}
      <Row p={4}>
        <Button
          flex={1}
          colorScheme={colorScheme}
          bg={`${colorScheme}.500`}
          color={"white"}
          onClick={button.onClick}
        >
          {button.label}
        </Button>
      </Row>
    </CardTitle>
  );
};
