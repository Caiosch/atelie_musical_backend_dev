import { getInputTextProps } from "@/components/fields/factories";
import FieldWrap from "@/components/fields/FieldWrap";
import BadgeSelect from "@/components/layout/shared/BadgeSelect";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import { Col, Content, Row } from "@/components/shared";
import { durationsConfig, songTypesConfig } from "@/configs/app";
import { Input, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { BsMusicNoteBeamed, BsClock } from "react-icons/bs";
import { FaGuitar } from "react-icons/fa";
import RequestMusicAdditionals from "../../../RequestMusicAdditionals";
import RequestMusicFromWhere from "../../../RequestMusicFromWhere";
import { useMusicRequestSubmit } from "../../hooks/useMusicRequestSubmit";

const RequestMusicFinishRequest: React.FC = () => {
  const { onSubmit, isLoading, requestMusicForm, requestMusicFormData, price } =
    useMusicRequestSubmit();

  return (
    <>
      <Col bg={"gray.700"} color={"primary.50"} py={6} px={4}>
        <Content>
          <div id="form-music"></div>
          <Col gap={4}>
            <FieldWrap
              label={"Escolha 1 música como referência"}
              description={
                "Nós vamos nos inspirar nessa referência para criar a sua música, então escolhe pensando nisso."
              }
              _topLeftIcon={
                <Col color={"primary.50"}>
                  <BsMusicNoteBeamed />
                </Col>
              }
              _description={{ color: "primary.50" }}
            >
              <Input
                {...getInputTextProps()}
                {...requestMusicForm.register("data.musicReference")}
                placeholder={"Ex: Nome da música - Nome do Artista"}
              />
            </FieldWrap>
            <Col color={"primary.100"}>
              <Heading
                fontFamily={"body"}
                textTransform={"uppercase"}
                fontSize={"md"}
              >
                Show! Já estamos terminando.
              </Heading>
              <Heading
                fontFamily={"body"}
                textTransform={"uppercase"}
                fontSize={"md"}
              >
                Agora vamos pra parte técnica.
              </Heading>
            </Col>
            <FieldWrap
              label={"Quanto tempo a Música vai ter?"}
              description={"*Duração Aproximada"}
              _topRightIcon={
                <Col color={"primary.50"}>
                  <BsClock />
                </Col>
              }
              _description={{ color: "primary.50" }}
            >
              <div id="form-star"></div>
              <Col alignItems={"start"}>
                <BadgeSelect
                  items={durationsConfig.items}
                  value={[requestMusicFormData.data?.duration]}
                  onChange={(durationsKeys) => {
                    requestMusicForm.setValue(
                      "data.duration",
                      durationsKeys.pop()
                    );
                  }}
                  _badge={{
                    textTransform: "uppercase",
                    fontSize: "md",
                    w: 200,
                    maxW: "100%",
                    textAlign: "left",
                  }}
                />
              </Col>
            </FieldWrap>
            <FieldWrap
              label={"A Sua Música pode ser"}
              description={[
                "<strong>Acúsica</strong> = voz + 1 instrumento (ex: voz e violão)",
                "<strong>Banda</strong> = voz + vários instrumentos (ex: voz, teclado, baixo e violão)",
              ]}
              _topLeftIcon={
                <Col color={"primary.50"}>
                  <FaGuitar />
                </Col>
              }
              _description={{ color: "primary.50" }}
            >
              <Row>
                <Col flex={1}>
                  <BadgeSelect
                    items={songTypesConfig.items}
                    value={[requestMusicFormData.data?.songType]}
                    onChange={(songType) => {
                      requestMusicForm.setValue(
                        "data.songType",
                        songType.pop()
                      );
                    }}
                    _badge={{
                      textTransform: "uppercase",
                      fontSize: "md",
                      textAlign: "left",
                    }}
                  />
                </Col>
                <Col
                  px={2}
                  py={4}
                  bg={"primary.50"}
                  rounded={"3xl"}
                  justifyContent={"center"}
                >
                  <Text
                    textTransform={"uppercase"}
                    fontWeight={"bold"}
                    color={"primary.500"}
                    fontSize={"sm"}
                  >
                    Total:
                  </Text>
                  <Heading size={"sm"} color={"gray.800"}>
                    $ 1.800
                  </Heading>
                  <Text
                    textTransform={"uppercase"}
                    fontWeight={"bold"}
                    color={"gray.600"}
                    fontFamily={"heading"}
                    fontSize={6}
                  >{`(4x de R$ 300)`}</Text>
                </Col>
              </Row>
            </FieldWrap>
          </Col>
        </Content>
      </Col>
      <Col bg={"primary.50"} color={"gray.800"} px={4} py={8}>
        <Content>
          <div id="form-additionals"></div>
          <RequestMusicAdditionals />
          <RequestMusicFromWhere />
        </Content>
      </Col>
      <Col bg={"gray.600"} color={"primary.50"} px={4} py={8}>
        <div id="form-finish"></div>
        <Content>
          <FieldWrap
            label={
              "Boa! Já temos toda a inspiração que precisamos para criar a sua música! Confere se ta tudo ok:"
            }
            _label={{ fontWeight: "bold" }}
          >
            <Col gap={4}>
              {price.display.map((p, pKey) => (
                <Row key={`priceDetail${pKey}`} alignItems={"center"}>
                  <Heading
                    size={"sm"}
                    textTransform={"uppercase"}
                    pr={4}
                    w={100}
                  >
                    {p.label}
                  </Heading>
                  <Row
                    flex={1}
                    borderBottom={"1px solid transparent"}
                    borderColor={"primary.50"}
                    alignItems={"center"}
                  >
                    <Col flex={1}>
                      {p.values?.map((pv, pvKey) => (
                        <Row
                          alignItems={"center"}
                          key={`price${pKey}${pvKey}`}
                          fontFamily={"body"}
                        >
                          <Text
                            flex={1}
                            color={"primary.500"}
                            textTransform={"uppercase"}
                          >
                            {pv.label}
                          </Text>
                          <Text
                            fontSize={"lg"}
                            color={"white"}
                            fontWeight={"bold"}
                          >
                            {/* @ts-ignore */}
                            {pv.price}
                          </Text>
                        </Row>
                      ))}
                    </Col>
                    <Col>
                      {p.price && (
                        <Text
                          fontSize={"lg"}
                          pl={4}
                          fontWeight={"bold"}
                          textAlign={"right"}
                        >
                          {p.price}
                        </Text>
                      )}
                      <Row alignItems={"center"}>
                        <Text>{p.description}</Text>
                      </Row>
                    </Col>
                  </Row>
                </Row>
              ))}
              {requestMusicFormData.data?.deliveryType === "express" && (
                <Row alignItems={"center"} justifyContent={"center"}>
                  <Row
                    textTransform={"uppercase"}
                    bg={"primary.500"}
                    color={"white"}
                    px={4}
                    py={2}
                    rounded={"3xl"}
                    shadow={"lg"}
                    fontWeight={"bold"}
                  >
                    Pedido Express
                  </Row>
                </Row>
              )}
              <Row alignItems={"center"} justifyContent={"center"}>
                <ButtonCTA
                  color={"primary.800"}
                  bg={"primary.50"}
                  py={5}
                  rounded={9999}
                  w={230}
                  h={12}
                  maxW={"100%"}
                  isLoading={isLoading}
                  onClick={onSubmit}
                >
                  Finalizar Compra
                </ButtonCTA>
              </Row>
            </Col>
          </FieldWrap>
        </Content>
      </Col>
    </>
  );
};

export default RequestMusicFinishRequest;
