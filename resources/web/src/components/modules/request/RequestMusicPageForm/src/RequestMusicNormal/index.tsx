import { getInputTextProps } from "@/components/fields/factories";
import FieldWrap from "@/components/fields/FieldWrap";
import { Col, Content } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import { useSettingsQuery } from "@/hooks/api/useSettingsQuery";
import { AppTagMapper } from "@/services/app/mappers/tag-mapper";
import { SimpleGrid, Input, Collapse, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import RequestMusicAboutAudio from "../../../RequestMusicAboutAudio";
import RequestMusicArtistPicker from "../../../RequestMusicArtistPicker";
import { useMusicRequestSubmit } from "../../hooks/useMusicRequestSubmit";
import RequestMusicFinishRequest from "../RequestMusicFinishRequest";

const RequestMusicNormal: React.FC = () => {
  const { sentiments } = useSettingsQuery();
  const { requestMusicForm, BadgeOptions, isOccasion, requestMusicFormData } =
    useMusicRequestSubmit();

  return (
    <>
      <Col bg={"primary.50"} px={4} py={8}>
        <div id="form-love"></div>
        <Content>
          <SimpleGrid gap={4}>
            <FieldWrap label="Para quem é a música?" isInverted>
              <Input
                {...getInputTextProps("inverted")}
                {...requestMusicForm.register("data.giftedName")}
                placeholder={"Ex: Minha chefe, Mariana"}
              />
            </FieldWrap>
            <Collapse in={!isOccasion("casamento")}>
              <FieldWrap
                label="Como você quer que o presenteado sinta essa canção?"
                description={["Você pode escolher até 2"]}
                isInverted
              >
                {BadgeOptions(
                  sentiments?.map(AppTagMapper.toBadgeOptions) || [],
                  "sentiments",
                  true
                )}
              </FieldWrap>
            </Collapse>
          </SimpleGrid>
        </Content>
      </Col>
      <Col px={4} py={8} bg={"secondary.600"} color={"primary.50"}>
        <div id="form-artists"></div>
        <Content>
          <RequestMusicArtistPicker />
        </Content>
      </Col>
      <Col px={4} py={6} bg={"primary.50"}>
        <div id="form-pencil"></div>
        <Content>
          <Col gap={8}>
            <FieldWrap
              isInverted
              label={"Conta Tudo!"}
              description={[
                "Prepare o seu coração pras coisas que vai nos contar...",
                "É a partir daqui que a alma da sua música começa a aparecer.",
                "A história que você nos contar vai dar o tom único de presente personalizado!",
                "Os detalhes importam muito.",
              ]}
              _description={{
                maxW: "100%",
                w: 240,
                fontSize: "md",
              }}
            >
              <Col
                rounded={"3xl"}
                bg={"gray.600"}
                gap={2}
                fontWeight={"bold"}
                fontStyle={"italic"}
                p={4}
              >
                <Text color={"primary.500"} px={4}>
                  Aqui vão algumas dicas:
                </Text>
                <Col color={"primary.50"}>
                  <ListView
                    items={[
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
                    ]}
                    render={(txt) => (
                      <Text
                        px={4}
                        fontWeight={"normal"}
                        fontStyle={"italic"}
                        fontSize={"sm"}
                        minH={4}
                      >
                        {txt}
                      </Text>
                    )}
                  />
                </Col>
              </Col>
              <Col pos={"relative"}>
                <Textarea
                  {...requestMusicForm.register("data.about")}
                  {...getInputTextProps("inverted")}
                  fontSize={"md"}
                  bg={"transparent"}
                  color={"primary.50"}
                  border={"1px solid transparent"}
                  borderColor={"primary.400"}
                  px={4}
                  py={2}
                  rounded={"2xl"}
                  mt={4}
                  h={300}
                  placeholder={[
                    "Fica à vontade e vai contando o que vier...",
                    "o amor mora nos detalhes...",
                    "Também pode mandar áudios ;)",
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
            <FieldWrap
              label={"Do que você contou pra gente..."}
              description={[
                "Escolha até 4 coisas que não",
                "podem faltar na música",
              ]}
              isInverted
              _label={{ color: "primary.500" }}
            >
              <Textarea
                {...requestMusicForm.register("data.aboutShort")}
                {...getInputTextProps("inverted")}
                rounded={"xl"}
                minH={36}
                placeholder={[
                  "Ex.:",
                  "1) O jeito que ele me chama quando está alegre",
                  "2) A relação dele com o pai",
                  "3) A viagem que fizemos pro Marrocos",
                  "4) O dia que eu disse sim",
                ].join("\n")}
              />
            </FieldWrap>
          </Col>
        </Content>
      </Col>
      <RequestMusicFinishRequest />
    </>
  );
};

export default RequestMusicNormal;
