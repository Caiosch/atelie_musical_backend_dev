import { MusicLink } from "@/components/layout/links";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import { Col } from "@/components/shared";
import { ApiApp } from "@/services/api/api.app";
import { Heading, Text } from "@chakra-ui/react";
import React from "react";

const MusicFinish: React.FC<{
  requestMusic: ApiApp.Entities.RequestMusic;
}> = ({ requestMusic }) => {
  return (
    <>
      <Col gap={4} w={"100%"}>
        <Heading size={"md"} textTransform={"uppercase"} color={"primary.500"}>
          Pedido Finalizado
        </Heading>
        <Text fontStyle={"italic"}>
          Lorem Ipsum é simplesmente uma simulação de texto da indústria
          tipográfica e de impressos, e vem sendo utilizado desde o século XVI,
          quando um impressor.
        </Text>
        <Col>
          <MusicLink id={`${requestMusic.id}`}>
            <ButtonCTA
              bg={"primary.100"}
              color={"primary.500"}
              fontSize={"lg"}
              w={"100%"}
            >
              Escutar minha música
            </ButtonCTA>
          </MusicLink>
        </Col>
        {/* <Text>
          O seu projeto está sendo produzido pelos nossos incríveis
          profissionais, seu prazo de entrega é: <br />
          <Text
            as={"span"}
            color={"primary.500"}
            borderBottom={"2px solid transparent"}
            borderColor={"primary.500"}
            p={1}
          >
            3 dias úteis (27/09/2022)
          </Text>
        </Text> */}
      </Col>
    </>
  );
};

export default MusicFinish;
