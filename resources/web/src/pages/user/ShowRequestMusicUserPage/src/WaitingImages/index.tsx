import { getInputTextProps } from "@/components/fields/factories";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import { Col, Row } from "@/components/shared";
import CtrlFormMediaPicker, {
  mediaSrc,
  useMediaPicker,
} from "@/components/shared/ctrl-forms/CtrlFormMediaPicker";
import { appConfig } from "@/configs/app";
import { onChangeFileEvent } from "@/helpers/onChangeFileEvent";
import { useAppToast } from "@/hooks/helpers/useToast";
import { ApiApp } from "@/services/api/api.app";
import { MediaMapper } from "@/services/app/mappers/media-mapper";
import { apiClient } from "@/services/clients/api";
import {
  Button,
  CloseButton,
  Heading,
  Img,
  Input,
  SimpleGrid,
  Square,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { BsUpload } from "react-icons/bs";

interface WaitingImagesProps {
  requestMusic: ApiApp.Entities.RequestMusic;
}

const WaitingImages: React.FC<WaitingImagesProps> = ({ requestMusic }) => {
  const medias = useMediaPicker();

  const [additionals, setAdditionals] = useState<Record<string, any>>({});
  const setAdditionalInfo = (mediaIndex: number, field: string, value: any) => {
    setAdditionals((old) => ({
      ...old,
      [mediaIndex]: {
        ...(old[mediaIndex] ?? {}),
        [field]: value,
      },
    }));
  };

  const getAdditionalInfo = (mediaIndex: number, field: string) => {
    if (!additionals[mediaIndex]) return undefined;

    return additionals[mediaIndex]?.[field] || undefined;
  };

  const [captions, setCaptions] = useState<string[]>([]);
  const mediasData = useMemo(() => {
    return medias.medias.map((media, key) => ({
      media,
      caption: getAdditionalInfo(key, "caption"),
      // isMain: getAdditionalInfo(key, "isMain"),
    }));
  }, [medias, captions, getAdditionalInfo]);

  const { toast, showErrors } = useAppToast();

  const onSubmit = async () => {
    const errors: [string, string][] = [];

    if (mediasData.length <= 0) {
      errors.push([
        "Necessário ao menos uma imagem",
        "Selecione ao menos uma imagem para nos enviar",
      ]);
    }

    if (errors.length > 0) {
      showErrors(errors);
      return;
    }

    apiClient
      .sendMusicRequestMedias(requestMusic.id, {
        items: Object.values(mediasData).filter((m) => m.media.isBase64),
      })
      .then(() => {
        toast({
          status: "success",
          title: "Imagens enviadas com sucesso!",
          description: "Aguarde, iremos analisar e criar seus vídeos...",
        });
      });
  };

  useEffect(() => {
    if (requestMusic.data?.medias) {
      medias.set((old) => [
        ...requestMusic.data?.medias?.map((m: any) => m.media),
        ...old.filter((m) => m.isBase64),
      ]);
    }
  }, [requestMusic]);

  return (
    <Col gap={12}>
      <Col gap={6}>
        <Col>
          <Heading
            size={"md"}
            textTransform={"uppercase"}
            color={"primary.500"}
            mb={4}
          >
            Enviar Imagens*
          </Heading>
          <Heading size={"xs"} fontStyle={"italic"} color={"primary.50"}>
            Adicione as imagens que irá compor o seu vídeo.
          </Heading>
          <Row mt={2}>
            <Row flex={1} />
            <Col>
              <Text
                fontSize={"11px"}
                mb={1}
                fontWeight={"bold"}
                color={"primary.50"}
              >
                Imagens adicionadas
              </Text>
              <Row
                px={8}
                py={0}
                roundedTopLeft={"2xl"}
                roundedBottomRight={"2xl"}
                border={"1px solid transparent"}
                borderColor={"primary.50"}
                color={"primary.500"}
              >
                <Heading>
                  {`${medias.medias.length}/${appConfig.MAX_MUSIC_IMAGES}`}
                </Heading>
              </Row>
            </Col>
          </Row>
        </Col>
        {medias.medias.length > 0 && (
          <SimpleGrid gap={4} columns={[2, 2, 3, 3, 4, 4, 4]}>
            <CtrlFormMediaPicker
              {...medias.props}
              render={({ media, remove, index }) => {
                return (
                  <Col pos={"relative"}>
                    {media.isBase64 && (
                      <CloseButton
                        pos={"absolute"}
                        left={4}
                        top={4}
                        color={"primary.800"}
                        bg={"lighten.400"}
                        _hover={{ bg: "lighten.900" }}
                        onClick={() => {
                          remove();
                        }}
                      />
                    )}
                    <Row
                      h={[24, 28, 28, 150, 170, 170]}
                      bg={"primary.100"}
                      p={2}
                      roundedTopRight={"3xl"}
                      roundedBottomLeft={"3xl"}
                    >
                      <Img
                        src={
                          media.isBase64
                            ? mediaSrc(media)
                            : apiClient.resolveFileUrl(media.src)
                        }
                        rounded={"lg"}
                        objectFit={"contain"}
                      />
                    </Row>
                    <Input
                      mt={2}
                      value={getAdditionalInfo(index, "caption")}
                      {...getInputTextProps()}
                      rounded={"xs"}
                      placeholder={"Adicione a legenda da sua foto aqui!"}
                      px={2}
                      py={1}
                      _focus={{
                        roundedBottomLeft: "2xl",
                        roundedTopRight: "2xl",
                      }}
                      onChange={(e) => {
                        setAdditionalInfo(index, "caption", e.target.value);
                      }}
                    />
                  </Col>
                );
              }}
            />
          </SimpleGrid>
        )}
        <SimpleGrid gap={2} columns={[1, 2, 2, 2, 2, 2]}>
          <Button
            rounded={"3xl"}
            colorScheme={"primary"}
            borderWidth={2}
            borderStyle={"solid"}
            borderColor={"primary.50"}
            fontStyle={"italic"}
            color={"gray.800"}
            minH={"100%"}
            rightIcon={
              <Square ml={4}>
                <BsUpload size={20} />
              </Square>
            }
            onClick={() => {
              const input = onChangeFileEvent(async (files) => {
                const errors = files
                  .filter((f) => !f.type.startsWith("image"))
                  .map(
                    (f) =>
                      [
                        `Arquivo Inválido`,
                        `Arquivo ${f.name} não suportado`,
                      ] as [string, string]
                  );
                showErrors(errors);
                const nextFiles = files.filter((f) =>
                  f.type.startsWith("image")
                );
                const nextMedias = await MediaMapper.fromFiles(nextFiles);

                medias.push(...nextMedias);
                setCaptions((old) => [...old, ...nextMedias.map(() => "")]);
              });

              input.multiple = true;
              input.click();
            }}
          >
            Adicionar Imagens
          </Button>
          <ButtonCTA
            color={"primary.500"}
            bg={"primary.100"}
            fontSize={"2xl"}
            onClick={onSubmit}
          >
            Enviar
          </ButtonCTA>
        </SimpleGrid>
      </Col>
    </Col>
  );
};

export default WaitingImages;
