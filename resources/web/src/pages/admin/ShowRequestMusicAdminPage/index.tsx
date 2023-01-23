import { getInputTextProps } from "@/components/fields/factories";
import { MusicLink } from "@/components/layout/links";
import CommonMasterPage from "@/components/layout/pages/common/CommonMasterPage";
import AudioPlayer from "@/components/layout/shared/AudioPlayer";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import MenuTopSpacing from "@/components/layout/shared/MenuTopSpacing";
import PickArtist from "@/components/modules/request/PickArtist";
import { Col, Content, Row } from "@/components/shared";
import CtrlFormMediaPicker, {
  FormMedia,
} from "@/components/shared/ctrl-forms/CtrlFormMediaPicker";
import AritstFilterComponent from "@/components/shared/helpers/AritstFilterComponent";
import { ListView } from "@/components/shared/helpers/ListView";
import PencilWrap from "@/components/shared/helpers/PencilWrap";
import {
  getDurationConfig,
  getMusicExtras,
  getMusicRequestStatusConfig,
  getSongTypeConfig,
  MusicRequestStatus,
  resolveArtistAvatar,
} from "@/configs/app";
import { toBRL } from "@/helpers/currency/toBRL";
import { useArtistListQuery } from "@/hooks/api/useArtistListQuery";
import { useRequestMusicQuery } from "@/hooks/api/useRequestMusicQuery";
import { useSettingsQuery } from "@/hooks/api/useSettingsQuery";
import { ApiApp } from "@/services/api/api.app";
import { MediaMapper } from "@/services/app/mappers/media-mapper";
import { apiClient } from "@/services/clients/api";
import {
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Heading,
  Img,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Square,
  Text,
  Textarea,
  useBoolean,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

const ShowRequestMusicAdminPage: React.FC = () => {
  const requestForm = useForm();
  const requestFormData = requestForm.watch();
  const { requestId } = useParams();
  const {
    data: requestMusic,
    refetch,
    isFetching,
  } = useRequestMusicQuery(requestId!);
  const { data: settings } = useSettingsQuery();
  const artistsQuery = useArtistListQuery();
  const [isLoadingSave, loading] = useBoolean(false);

  const isLoading = isLoadingSave || isFetching;

  useEffect(() => {
    if (requestMusic) {
      setFormDataByRequest(requestMusic);
    }
  }, [requestMusic?.data?.admin]);

  if (!requestMusic) return <></>;

  const getFileValue = (name: string): Partial<FormMedia> => {
    const nextName = name.split(".")!.pop()!;
    return requestFormData.admin?.[nextName] || {};
  };

  const setFormDataByRequest = (request: ApiApp.Entities.RequestMusic) => {
    requestForm.setValue("admin", {
      ...(request.data?.admin || {}),
      medias: request.data.medias,
      privacy: request.privacy,
    });

    refetch();
  };

  const isFinished = requestMusic.status === MusicRequestStatus.Finished;

  const onSubmit = async ({ status = requestMusic.status, ...data }: any) => {
    loading.on();
    const { artistId = requestMusic.artist_id, ...adminData } = {
      ...data.admin,
    };
    const resolveKeys = [
      "musicFile",
      "visualizerFile",
      "singerFile",
      "artistRecordFile",
    ];

    for (const key of resolveKeys) {
      if (!adminData[key]) continue;
      const nextFiles = await MediaMapper.fromFileList(adminData[key]);

      adminData[key] = nextFiles[0];
    }

    await apiClient
      .setMusicRequest(requestId!, {
        admin: adminData,
        artistId,
        status,
      })
      .then((request) => {
        setFormDataByRequest(request);
      })
      .finally(() => {
        loading.off();
      });
  };

  return (
    <CommonMasterPage>
      <Col bg={"secondary.800"} minH={"100vh"} color={"primary.50"}>
        <MenuTopSpacing />
        <Content px={4}>
          <Col gap={6} opacity={isLoading ? 0.7 : 1}>
            <Heading size={"2xl"}>
              <Text as={"span"} color={"primary.500"}>
                Pedido #{requestMusic.id}{" "}
              </Text>
              {requestMusic.artist?.full_name &&
                `- ${requestMusic.artist?.full_name}`}
            </Heading>
            <Row gap={8} alignItems={"center"} mb={8}>
              <Heading
                size={"md"}
                fontFamily={"body"}
                textTransform={"uppercase"}
                color={"primary.500"}
              >
                Status Atual
              </Heading>
              <Menu>
                <MenuButton
                  as={Heading}
                  size={"md"}
                  fontFamily={"body"}
                  textTransform={"uppercase"}
                  color={"primary.600"}
                  px={8}
                  py={2}
                  bg={"primary.50"}
                  rounded={"3xl"}
                  cursor={"pointer"}
                >
                  {getMusicRequestStatusConfig(requestMusic.status)?.label}
                </MenuButton>
                <MenuList
                  bg={"primary.50"}
                  color={"primary.500"}
                  fontWeight={"bold"}
                  textTransform={"uppercase"}
                >
                  <ListView
                    items={
                      requestMusic.status === MusicRequestStatus.WaitingPayment
                        ? []
                        : [
                            {
                              label: "Aguardando Imagens",
                              value: MusicRequestStatus.WaitingImages,
                            },
                            {
                              label: "Em Produção",
                              value: MusicRequestStatus.WaitingProduction,
                            },
                            {
                              label: "Finalizado",
                              value: MusicRequestStatus.Finished,
                            },
                          ]
                    }
                    render={({ label, value }) => (
                      <MenuItem
                        onClick={() => {
                          onSubmit({
                            ...requestForm.getValues(),
                            status: value,
                          });
                        }}
                        isDisabled={isLoading}
                        textTransform={"uppercase"}
                        fontWeight={"bold"}
                      >
                        {label}
                      </MenuItem>
                    )}
                  />
                </MenuList>
              </Menu>
              <Row flex={1} />
              {!isFinished && (
                <ButtonCTA
                  fontSize={"3xl"}
                  bg={"primary.500"}
                  color={"white"}
                  isLoading={isLoading}
                  onClick={() => onSubmit(requestForm.getValues())}
                >
                  Salvar
                </ButtonCTA>
              )}
            </Row>
            <Heading size={"xl"} textTransform={"uppercase"}>
              Informações do Pedido
            </Heading>
            <SimpleGrid columns={[1, 1, 1, 2, 2, 2, 2]} gap={8}>
              <ListView
                items={[
                  {
                    title: "Música",
                    items: [
                      {
                        label: "Artista",
                        value: requestMusic.artist?.full_name,
                      },
                      {
                        label: "Voz",
                        value: requestMusic.artist?.voice_gender
                          ? requestMusic.artist?.voice_gender === "M"
                            ? "Masculina"
                            : "Feminina"
                          : undefined,
                      },
                      {
                        label: "Tempo de Música",
                        value: `${
                          getDurationConfig(requestMusic.data.duration)?.label
                        }`,
                      },
                      { label: "Arranjo", value: "Casamento" },
                      {
                        label: "Referência",
                        value: requestMusic.data.musicReference,
                      },
                      {
                        label: "Ocasião",
                        value: requestMusic.data.occasions,
                      },

                      { label: "Proposta", value: requestMusic.data.about },
                      {
                        label: "Proposta (Audio)",
                        value: requestMusic.data.aboutRecorded && (
                          <Row w={300} maxW={"100%"}>
                            <AudioPlayer
                              colorScheme="light"
                              src={apiClient.resolveFileUrl(
                                requestMusic.data.aboutRecorded.src
                              )}
                            />
                          </Row>
                        ),
                      },
                    ],
                  },
                  {
                    title: "Informações do pedido",
                    items: [
                      {
                        label: "Data de Criação",
                        value: new Date(
                          requestMusic.created_at
                        ).toLocaleString(),
                      },
                      {
                        label: "Data de Contratação",
                        value:
                          requestMusic.payed_at &&
                          new Date(requestMusic.payed_at).toLocaleString(),
                      },
                      {
                        label: "Data de Entrega",
                        value:
                          requestMusic.delivered_at &&
                          new Date(requestMusic.delivered_at).toLocaleString(),
                      },
                      {
                        label: "Música",
                        value: `${
                          getSongTypeConfig(requestMusic.data.songType)?.label
                        }`,
                      },
                      {
                        label: "Extras",
                        value: getMusicExtras(requestMusic).join(" & "),
                      },
                      {
                        label: "Prazo Estimado",
                        value: new Date(
                          requestMusic.delivery_date
                        ).toLocaleDateString(),
                      },
                      {
                        label: "Valor",
                        value: toBRL(Number(requestMusic.price_total)),
                      },
                      { label: "Método de Pagamento", value: "PayPal" },
                      { label: "Cupom", value: undefined },
                    ],
                  },
                  {
                    title: "Cliente",
                    items: [
                      {
                        label: "Nome do Cliente",
                        value: requestMusic.user?.name,
                      },
                      {
                        label: "Email",
                        value: [
                          requestMusic.user?.email,
                          requestMusic.data?.email,
                        ]
                          .filter((v) => !!v)
                          .join(", "),
                      },
                      {
                        label: "Telefone",
                        value: requestMusic.user?.phone_number,
                      },
                      {
                        label: "Endereço",
                        value: requestMusic.user?.address_street,
                      },
                    ],
                  },
                ]}
                render={(boxItem) => (
                  <Col>
                    <Heading
                      size={"lg"}
                      color={"primary.500"}
                      textTransform={"uppercase"}
                      mb={2}
                      alignSelf={"flex-start"}
                    >
                      {boxItem.title}
                    </Heading>
                    <Col
                      mt={2}
                      gap={2}
                      fontWeight={"bold"}
                      fontSize={"xl"}
                      fontStyle={"italic"}
                    >
                      <ListView
                        items={boxItem.items}
                        render={(rowItem) => (
                          <Row alignItems={"center"}>
                            <Text mr={2} color={"primary.400"}>
                              {rowItem.label}
                            </Text>
                            <Text
                              color={rowItem.value ? "white" : "secondary.200"}
                              as={"div"}
                            >
                              {rowItem.value || "Não Definido"}
                            </Text>
                          </Row>
                        )}
                      />
                    </Col>
                  </Col>
                )}
              />
            </SimpleGrid>
            {/* <pre>{JSON.stringify(requestFormData, null, 2)}</pre> */}
            <Col py={8}>
              <Heading size={"xl"} textTransform={"uppercase"} mb={4}>
                Imagens Adicionadas
              </Heading>
              <SimpleGrid gap={4} columns={[2, 2, 3, 4, 4, 4]}>
                <ListView
                  items={
                    (requestMusic.data.medias || []) as Array<{
                      media: FormMedia;
                      caption?: string;
                    }>
                  }
                  render={(props) => {
                    return (
                      <Col>
                        <Col
                          h={40}
                          w={"100%"}
                          bg={"gray.700"}
                          border={"4px solid transparent"}
                          borderColor={"primary.500"}
                          roundedBottomRight={"40px"}
                          roundedTopLeft={"40px"}
                          py={1}
                          pos={"relative"}
                          overflow={"hidden"}
                        >
                          <Img
                            w={"100%"}
                            h={"100%"}
                            objectFit={"contain"}
                            src={
                              props.media.isBase64
                                ? props.media.src
                                : apiClient.resolveFileUrl(props.media.src)
                            }
                          />
                        </Col>
                        <Input
                          {...getInputTextProps()}
                          mt={2}
                          value={props.caption}
                          readOnly
                        />
                      </Col>
                    );
                  }}
                />
              </SimpleGrid>
            </Col>

            <Col py={4}>
              <Heading
                size={"lg"}
                color={"primary.500"}
                textTransform={"uppercase"}
                mb={4}
              >
                {isFinished ? "Pedido Finalizado ⭐" : "Finalizar Pedido"}
              </Heading>
              <form onSubmit={requestForm.handleSubmit(onSubmit)}>
                <Col gap={4}>
                  <ListView
                    items={[
                      {
                        label: "Nome da Música",
                        type: "text",
                        placeholder: "Digite...",
                        name: "admin.musicName",
                      },
                      {
                        label: "Privacidade",
                        type: "radio",
                        name: "admin.privacy",
                        options: [
                          { label: "Privado", value: "private" },
                          { label: "Público", value: "public" },
                        ],
                      },
                      {
                        label: "Artista",
                        type: "select:artist",
                        placeholder: "Digite...",
                        name: "admin.artistId",
                      },
                      {
                        label: "Arquivo da Música (Mp3)",
                        type: "file",
                        name: "admin.musicFile",
                      },
                      {
                        label: "Recado do Artista (Mp3)",
                        type: "file",
                        name: "admin.artistRecordFile",
                      },
                      {
                        label: "Link do Youtube Visualizer",
                        type: "text",
                        placeholder: "Digite...",
                        name: "admin.visualizerYoutube",
                      },
                      {
                        label: "Arquivo Visualizer (Mp4)",
                        type: "file",
                        placeholder: "Digite...",
                        name: "admin.visualizerFile",
                      },
                      {
                        label: "Link Youtube do Vídeo Que Canta",
                        type: "text",
                        placeholder: "Digite...",
                        name: "admin.singerYoutube",
                      },
                      {
                        label: "Arquivo Vídeo Que Canta (Mp4)",
                        type: "file",
                        placeholder: "Digite...",
                        name: "admin.singerFile",
                      },
                      {
                        label: "Link para apps de música",
                        type: "text",
                        placeholder: "Digite...",
                        name: "admin.musicAppsLink",
                      },
                      {
                        label: "Letra da Música",
                        type: "textarea",
                        placeholder: "Digite...",
                        name: "admin.musicLetter",
                      },
                    ]}
                    render={({ label, type, name, options, placeholder }) => (
                      <FormControl
                        display={"flex"}
                        flexDir={[
                          "column",
                          "column",
                          "column",
                          "row",
                          "row",
                          "row",
                          "row",
                        ]}
                        alignItems={"center"}
                      >
                        <FormLabel
                          textTransform={"uppercase"}
                          fontStyle={"italic"}
                          fontSize={"lg"}
                          fontWeight={"bold"}
                          mr={4}
                          mb={0}
                          cursor={"pointer"}
                          alignSelf={"start"}
                        >
                          {label}
                        </FormLabel>
                        {type === "text" && (
                          <PencilWrap
                            flex={1}
                            w={[
                              "100%",
                              "100%",
                              "100%",
                              "auto",
                              "auto",
                              "auto",
                              "auto",
                            ]}
                          >
                            <Input
                              placeholder={placeholder}
                              {...getInputTextProps()}
                              {...requestForm.register(name)}
                            />
                          </PencilWrap>
                        )}
                        {type === "radio" && (
                          <Row gap={4}>
                            <ListView
                              items={options ?? []}
                              render={(v) => (
                                <Row
                                  alignItems={"center"}
                                  px={4}
                                  py={2}
                                  rounded={"xl"}
                                  cursor={"pointer"}
                                  userSelect={"none"}
                                  fontWeight={"bold"}
                                  fontFamily={"heading"}
                                  textTransform={"uppercase"}
                                  onClick={() => {
                                    requestForm.setValue(name, v.value);
                                  }}
                                  bg={
                                    requestFormData.admin?.privacy === v.value
                                      ? "primary.500"
                                      : "darken.100"
                                  }
                                >
                                  {v.label}
                                </Row>
                              )}
                            />
                          </Row>
                        )}
                        {type === "textarea" && (
                          <PencilWrap
                            flex={1}
                            w={[
                              "100%",
                              "100%",
                              "100%",
                              "auto",
                              "auto",
                              "auto",
                              "auto",
                            ]}
                          >
                            <Textarea
                              placeholder={placeholder}
                              {...getInputTextProps()}
                              {...requestForm.register(name)}
                              rounded={"md"}
                            />
                          </PencilWrap>
                        )}

                        {type === "select:artist" && (
                          <Col
                            p={4}
                            pt={0}
                            flex={1}
                            bg={"primary.50"}
                            rounded={"xl"}
                            w={["100%", "100%", "100%", "auto", "auto", "auto"]}
                            gap={4}
                          >
                            <AritstFilterComponent
                              isInverted
                              {...artistsQuery}
                            />
                            <PickArtist
                              items={
                                artistsQuery.nextArtists.map((artist) => ({
                                  id: `${artist.id}`,
                                  avatar: `${resolveArtistAvatar(artist)}`,

                                  name: artist.full_name,
                                })) ?? []
                              }
                              value={[
                                requestFormData.admin?.artistId ??
                                  `${requestMusic.artist_id}`,
                              ]}
                              onChange={(values) => {
                                requestForm.setValue(name, values.pop());
                              }}
                            />
                          </Col>
                        )}

                        {type === "file" && (
                          <PencilWrap
                            flex={1}
                            w={[
                              "100%",
                              "100%",
                              "100%",
                              "auto",
                              "auto",
                              "auto",
                              "auto",
                            ]}
                          >
                            {getFileValue(name).isBase64 === false ? (
                              <Row
                                flex={1}
                                pr={10}
                                alignItems={"center"}
                                pos={"relative"}
                              >
                                <Row flex={1} pos={"relative"}>
                                  <Row
                                    as={"a"}
                                    pos={"absolute"}
                                    top={0}
                                    left={0}
                                    w={"100%"}
                                    h={"100%"}
                                    // @ts-ignore
                                    href={apiClient.resolveFileUrl(
                                      getFileValue(name).src!
                                    )}
                                    zIndex={10}
                                    target={"_blank"}
                                  />
                                  <Input
                                    placeholder={placeholder}
                                    {...getInputTextProps()}
                                    value={`Arquivo Anexado: ${
                                      getFileValue(name).src
                                    }`}
                                    readOnly
                                    flex={1}
                                    pos={"relative"}
                                    zIndex={5}
                                    bg={"primary.50"}
                                    color={"primary.900"}
                                    fontWeight={"extrabold"}
                                  />
                                </Row>
                                <CloseButton
                                  onClick={() => {
                                    requestForm.setValue(name, undefined);
                                  }}
                                />
                              </Row>
                            ) : (
                              <Input
                                placeholder={placeholder}
                                {...getInputTextProps()}
                                {...requestForm.register(name)}
                                type={"file"}
                                py={1}
                              />
                            )}
                          </PencilWrap>
                        )}
                      </FormControl>
                    )}
                  />
                </Col>
                <SimpleGrid
                  mt={8}
                  mb={32}
                  gap={8}
                  columns={[1, 1, 2, 3, 3, 3, 3]}
                >
                  <ButtonCTA
                    type={"submit"}
                    fontSize={"3xl"}
                    bg={"primary.50"}
                    color={"primary.500"}
                    isLoading={isLoading}
                  >
                    Salvar
                  </ButtonCTA>
                  {isFinished && (
                    <ButtonCTA
                      as={Link}
                      // @ts-ignore
                      to={`/music/${requestMusic.id}`}
                      textAlign={"center"}
                      type={"submit"}
                      fontSize={"3xl"}
                      bg={"primary.50"}
                      color={"primary.500"}
                    >
                      Página de Entrega
                    </ButtonCTA>
                  )}
                  {!isFinished && (
                    <>
                      <ButtonCTA
                        fontSize={"3xl"}
                        bg={"primary.50"}
                        color={"primary.500"}
                        isLoading={isLoading}
                        onClick={() => {
                          onSubmit({
                            ...requestForm.getValues(),
                            status: MusicRequestStatus.Finished,
                          });
                        }}
                      >
                        Concluir Entrega
                      </ButtonCTA>
                    </>
                  )}
                </SimpleGrid>
              </form>
            </Col>
          </Col>
        </Content>
      </Col>
    </CommonMasterPage>
  );
};

export default ShowRequestMusicAdminPage;
