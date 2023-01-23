import { Col } from "@/components/shared";
import { toBRL } from "@/helpers/currency/toBRL";
import { ApiApp } from "@/services/api/api.app";
import { Heading } from "@chakra-ui/react";
import React from "react";

// import { Container } from './styles';

interface RequestMusicPriceLgProps {
  requestMusic: ApiApp.Entities.RequestMusic;
}

const RequestMusicPriceLg: React.FC<RequestMusicPriceLgProps> = ({
  requestMusic,
}) => {
  return (
    <Col py={4} px={8} rounded={"xl"} bg={"darken.200"} shadow={"lg"}>
      <Heading size={"lg"} color={"primary.500"} mb={2}>
        {toBRL(Number(requestMusic.price_total || 0))}
      </Heading>
      <Heading size={"sm"} fontWeight={"light"} color={"white"}>
        Ou em 4x de {toBRL(Number(requestMusic.price_total || 0) / 4)}
      </Heading>
    </Col>
  );
};

export default RequestMusicPriceLg;
