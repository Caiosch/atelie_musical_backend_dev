import { Col } from "@/components/shared";
import { ApiApp } from "@/services/api/api.app";
import { Code, Heading, Text } from "@chakra-ui/react";
import React from "react";

const WaitingProduction: React.FC<{
  requestMusic: ApiApp.Entities.RequestMusic;
}> = ({ requestMusic }) => {
  return (
    <>
      <Col gap={4}>
        <Heading size={"md"} textTransform={"uppercase"} color={"primary.500"}>
          Em Produção
        </Heading>
        <Text fontSize={"xl"} fontWeight={"bold"} fontStyle={"italic"}>
          O seu projeto está sendo produzido pelos nossos incríveis
          profissionais, seu prazo de entrega é: <br />
          <Text
            as={"span"}
            color={"primary.500"}
            borderBottom={"2px solid transparent"}
            borderColor={"primary.500"}
            p={1}
          >
            {new Date(requestMusic.delivery_date).toLocaleDateString()}
          </Text>
          {/* <Code as={"pre"}>{JSON.stringify(requestMusic, null, 4)}</Code> */}
        </Text>
      </Col>
    </>
  );
};

export default WaitingProduction;
