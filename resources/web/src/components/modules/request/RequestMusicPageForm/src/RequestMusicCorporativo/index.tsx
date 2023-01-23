import { getInputTextProps } from "@/components/fields/factories";
import FieldWrap from "@/components/fields/FieldWrap";
import { Col, Content } from "@/components/shared";
import { useSettingsQuery } from "@/hooks/api/useSettingsQuery";
import { AppTagMapper } from "@/services/app/mappers/tag-mapper";
import { SimpleGrid, Input, Collapse, Textarea } from "@chakra-ui/react";
import React from "react";
import RequestMusicAboutAudio from "../../../RequestMusicAboutAudio";
import RequestMusicArtistPicker from "../../../RequestMusicArtistPicker";
import { useMusicRequestSubmit } from "../../hooks/useMusicRequestSubmit";
import RequestMusicFinishRequest from "../RequestMusicFinishRequest";

const RequestMusicCorporativo: React.FC = () => {
  const { sentiments, projects } = useSettingsQuery();
  const { requestMusicForm, BadgeOptions, requestMusicFormData, isOccasion } =
    useMusicRequestSubmit();

  return (
    <>
      <div id="form-gifted"></div>
      <Col bg={"primary.50"} px={4} py={8}>
        <Content mb={6}>
          <SimpleGrid>
            <FieldWrap label="Qual é o Projeto?">
              <Col>
                {BadgeOptions(
                  projects?.map(AppTagMapper.toBadgeOptions) || [],
                  "project",
                  true,
                  false,
                  {
                    _unselected: {
                      color: "gray.800",
                      border: "rgba(0,0,0,.3)",
                      bg: "transparent",
                    },
                    _selected: {
                      color: "white",
                      border: "primary.500",
                      bg: "primary.500",
                    },
                    _badge: {
                      w: 240,
                      px: 2,
                      maxW: "100%",
                    },
                  }
                )}
              </Col>
            </FieldWrap>
          </SimpleGrid>
        </Content>
        <Content>
          <div id="form-love"></div>
          <SimpleGrid gap={4}>
            <FieldWrap
              label="Para quem é a música?"
              isInverted
              _label={{ color: "primary.500" }}
            >
              <Input
                {...getInputTextProps("inverted")}
                {...requestMusicForm.register("data.giftedName")}
                placeholder={"Ex: Minha chefe, Mariana"}
              />
            </FieldWrap>
            <Collapse in={!isOccasion("casamento")}>
              <FieldWrap
                label="Que sentimento a música deve transmitir?"
                description={["Você pode escolher até 2"]}
                _label={{ color: "primary.500" }}
                isInverted
              >
                {BadgeOptions(
                  sentiments?.map(AppTagMapper.toBadgeOptions) || [],
                  "sentiments",
                  true,
                  true,
                  {
                    _unselected: {
                      color: "gray.800",
                      border: "rgba(0,0,0,.3)",
                      bg: "transparent",
                    },
                    _selected: {
                      color: "primary.500",
                      border: "transparent",
                      bg: "gray.700",
                    },
                  }
                )}
              </FieldWrap>
            </Collapse>
          </SimpleGrid>
        </Content>
      </Col>
      <Col px={4} py={6} bg={"secondary.600"} color={"primary.50"}>
        <div id="form-pencil"></div>
        <Content>
          <Col>
            <FieldWrap
              label="Qual a proposta da Música?"
              description={[
                "Qual a proposta da música?",
                "Escreva o briefing com informações e histórias que são importantes para a composição da música.",
                "Se a música for para uma campanha específica explique o objetivo da campanha e o quê ela precisa comunicar.",
                "Se for instituional, conta pra gente sobre os valores e objetivos da sua marca e os principais pontos de conexão com os clientes e colaboradores",
                "Aqui vão algumas dicas:",
              ]}
            >
              <Col pos={"relative"}>
                <Textarea
                  {...requestMusicForm.register("data.about")}
                  {...getInputTextProps()}
                  fontSize={"sm"}
                  bg={"transparent"}
                  color={"primary.50"}
                  border={"1px solid transparent"}
                  borderColor={"primary.400"}
                  px={4}
                  py={2}
                  shadow={"lg"}
                  rounded={"2xl"}
                  mt={4}
                  h={300}
                  placeholder={[
                    " - Como tudo começou.",
                    " - Trajetória de vida.",
                    " - Lembranças gostosas",
                    " - Momentos inesquecíveis e/ou de superação",
                    " - Piada interna, expressão só de vocês.",
                    "",
                    " - Lugares e coisas preferidas",
                    " - O que faz o olho brilhar?",
                    " - O que tira o sorriso do rosto?",
                    " - O que faz gargalhar?",
                    " - O que el@ tem de mais profundo e bonito...",
                    " - Sonhos, aspirações, desafios...",
                  ].join("\n")}
                />
                <RequestMusicAboutAudio
                  onChange={(media) => {
                    requestMusicForm.setValue("data.aboutRecorded", media);
                  }}
                  value={requestMusicFormData.data?.aboutRecorded}
                />
              </Col>
            </FieldWrap>
          </Col>
        </Content>
      </Col>

      <Col px={4} py={6} bg={"primary.50"}>
        <Content>
          <Col>
            <FieldWrap
              label={"Do que você contou pra gente..."}
              description={
                "Escolha até 4 coisas que não podem faltar na música"
              }
              isInverted
              _label={{ color: "primary.500" }}
            >
              <Textarea
                {...requestMusicForm.register("data.aboutShort")}
                {...getInputTextProps("inverted")}
                rounded={"xl"}
                placeholder={"Ex: Como tudo começou e lembranças gostosas"}
              />
            </FieldWrap>
          </Col>
        </Content>
      </Col>

      <Col px={4} py={8} bg={"secondary.600"} color={"primary.50"}>
        <div id="form-artists"></div>
        <Content>
          <RequestMusicArtistPicker />
        </Content>
      </Col>
      <RequestMusicFinishRequest />
    </>
  );
};

export default RequestMusicCorporativo;
