import { getInputTextProps } from "@/components/fields/factories";
import FieldWrap from "@/components/fields/FieldWrap";
import { Col, Content } from "@/components/shared";
import { Heading, Input, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import MenuTopSpacing from "@/components/layout/shared/MenuTopSpacing";
import { useSettingsQuery } from "@/hooks/api/useSettingsQuery";
import { AppTagMapper } from "@/services/app/mappers/tag-mapper";
import RequestMusicCorporativo from "./src/RequestMusicCorporativo";
import RequestMusicCasamento from "./src/RequestMusicCasamento";
import { useMusicRequestSubmit } from "./hooks/useMusicRequestSubmit";
import RequestMusicNormal from "./src/RequestMusicNormal";

const RequestMusicPageForm: React.FC = () => {
  const { occasions } = useSettingsQuery();
  const { isOccasion, BadgeOptions, requestMusicForm } = useMusicRequestSubmit();

  return (
    <>
      <Col bg={"gray.700"} px={4} py={8}>
        <Content>
          <MenuTopSpacing />
          <Col pb={20}>
            <Heading mb={8} size={"2xl"} color={"primary.400"}>
              Bem vindo ao nosso ateliê musical.
            </Heading>
            <Col color={"primary.100"}>
              <Heading size={"lg"}>
                Aqui vamos dar o primeiro passo para transformar a sua história
                em uma música exclusiva!
              </Heading>
            </Col>
          </Col>
        </Content>
        <Content>
          <div id="form-user"></div>
          <SimpleGrid gap={8}>
            <FieldWrap label="Qual o seu nome?">
              <Input
                {...getInputTextProps()}
                {...requestMusicForm.register("data.name")}
                placeholder={"Ex: Tom Jobim"}
              />
            </FieldWrap>
            <FieldWrap label="Qual o seu email?">
              <Input
                {...getInputTextProps()}
                {...requestMusicForm.register("data.email")}
                placeholder={"alguem@exemplo.com"}
              />
            </FieldWrap>
            <FieldWrap label="Qual é a ocasião?">
              {BadgeOptions(
                occasions?.map(AppTagMapper.toBadgeOptions) || [],
                "occasions",
                false,
                false
              )}
            </FieldWrap>
          </SimpleGrid>
        </Content>
      </Col>
      {isOccasion("corporativo") && <RequestMusicCorporativo />}
      {isOccasion("casamento") && <RequestMusicCasamento />}
      {!isOccasion("casamento", "corporativo") && <RequestMusicNormal />}
    </>
  );
};

export default RequestMusicPageForm;
