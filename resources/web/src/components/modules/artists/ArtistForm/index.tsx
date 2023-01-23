import { getAdminTextProps } from "@/components/fields/factories";
import FieldWrap from "@/components/fields/FieldWrap";
import BadgeSelect from "@/components/layout/shared/BadgeSelect";
import { Col, Row } from "@/components/shared";
import CtrlFormMediaPicker from "@/components/shared/ctrl-forms/CtrlFormMediaPicker";
import PencilWrap from "@/components/shared/helpers/PencilWrap";
import { onChangeFileEvent } from "@/helpers/onChangeFileEvent";
import { MediaMapper } from "@/services/app/mappers/media-mapper";
import {
  Button,
  Circle,
  Heading,
  Img,
  Input,
  Progress,
  Select,
  SimpleGrid,
  Square,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BiPlusCircle, BiTrashAlt } from "react-icons/bi";
import {
  BsInstagram,
  BsMusicNoteBeamed,
  BsStar,
  BsStarFill,
} from "react-icons/bs";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { useFormContext } from "react-hook-form";
import { useSettingsQuery } from "@/hooks/api/useSettingsQuery";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import { apiClient } from "@/services/clients/api";
import { useMusicsListQuery } from "@/hooks/api/useMusicsListQuery";

const SocialField: React.FC<{
  name: string;
  title: string;
  icon: React.ReactNode;
}> = ({ icon, name, title }) => {
  const form = useFormContext();

  return (
    <Row
      bg={"gray.700"}
      rounded={"100px"}
      alignItems={"center"}
      color={"primary.50"}
      py={1}
      maxW={"100%"}
    >
      <Square size={10} color={"primary.400"} mx={4}>
        {icon}
      </Square>
      <Heading
        minW={250}
        size={"lg"}
        textTransform={"uppercase"}
        fontWeight={"normal"}
      >
        {title}:
      </Heading>
      <Input
        flex={1}
        bg={"transparent"}
        _focus={{}}
        _hover={{}}
        border={0}
        boxShadow={"none"}
        focusBorderColor={"transparent"}
        placeholder={`Digite aqui sua url do ${title}...`}
        fontStyle={"italic"}
        fontSize={"lg"}
        _placeholder={{ color: "primary.100" }}
        {...form.register(name)}
        onChange={(e) => {
          form.setValue(name, e.target.value);
        }}
      />
    </Row>
  );
};

interface ArtistFormProps {}

const ArtistForm: React.FC<ArtistFormProps> = ({}) => {
  const form = useFormContext();

  const { musicalStyles = [] } = useSettingsQuery();

  const formData = form.watch();
  const { query: musics } = useMusicsListQuery(undefined, {
    artist_id: formData.id,
  });
  const showMusic = useDisclosure();

  return (
    <>
      <Col>
        {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        <SimpleGrid gap={4} columns={2}>
          <FieldWrap label={"Nome do Artista"} isInverted>
            <PencilWrap>
              <Input
                {...getAdminTextProps()}
                placeholder={"Insira o nome do artista..."}
                {...form.register("data.fullName")}
              />
            </PencilWrap>
          </FieldWrap>
          <FieldWrap label={"Telefone"} isInverted>
            <PencilWrap>
              <Input
                {...getAdminTextProps()}
                placeholder={"Adicione o Telefone"}
                {...form.register("data.phoneNumber")}
              />
            </PencilWrap>
          </FieldWrap>
          <FieldWrap label={"Voz"} isInverted>
            <PencilWrap>
              <Select
                {...getAdminTextProps()}
                placeholder={"Voz..."}
                {...form.register("data.voice")}
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </Select>
            </PencilWrap>
          </FieldWrap>
          <FieldWrap label={"E-mail"} isInverted>
            <PencilWrap>
              <Input
                {...getAdminTextProps()}
                placeholder={"Adicione um e-mail"}
                {...form.register("data.email")}
              />
            </PencilWrap>
          </FieldWrap>
          <FieldWrap label={"Texto do Artista"} isInverted>
            <PencilWrap>
              <Textarea
                {...getAdminTextProps()}
                placeholder={"Adicione a Descrição do Artista"}
                {...form.register("data.description")}
              />
            </PencilWrap>
          </FieldWrap>

          <FieldWrap label={"Estilo Musical"} isInverted>
            <BadgeSelect
              items={musicalStyles.map((tag) => ({
                label: tag.value,
                value: tag.key,
              }))}
              value={formData.data?.musicalStyles || []}
              isInverted
              _badge={{ rounded: "md", fontSize: "xl" }}
              onChange={(values) => {
                form.setValue("data.musicalStyles", values);
              }}
            />
          </FieldWrap>
        </SimpleGrid>
        <FieldWrap label={"Selecione mais imagens do artista"} isInverted>
          <SimpleGrid gap={2} columns={4} w={"100%"}>
            <CtrlFormMediaPicker
              medias={formData.data?.images || []}
              onChange={(medias) => {
                form.setValue("data.images", medias);
              }}
              render={(props) => {
                return (
                  <Col
                    h={32}
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
                      objectFit={"cover"}
                      src={
                        props.media.isBase64
                          ? props.media.src
                          : apiClient.resolveFileUrl(props.media.src)
                      }
                    />
                    <Col
                      pos={"absolute"}
                      w={"100%"}
                      h={"100%"}
                      zIndex={20}
                      left={0}
                      top={0}
                    >
                      <Row>
                        <Row flex={1} />
                        <Row bg={"darken.400"} roundedBottomLeft={"2xl"}>
                          <Square
                            size={10}
                            color={"primary.300"}
                            cursor={"pointer"}
                            _hover={{ color: "primary.500" }}
                            onClick={() => {
                              props.updateMany(
                                { isMain: false },
                                { isMain: true }
                              );
                            }}
                          >
                            {props.media.isMain ? (
                              <BsStarFill size={24} />
                            ) : (
                              <BsStar size={24} />
                            )}
                          </Square>
                          <Square
                            cursor={"pointer"}
                            size={10}
                            color={"white"}
                            _hover={{ color: "red.400" }}
                            onClick={props.remove}
                          >
                            <BiTrashAlt size={24} />
                          </Square>
                        </Row>
                      </Row>
                    </Col>
                  </Col>
                );
              }}
            />
            <ButtonCTA
              onClick={() => {
                const input = onChangeFileEvent(async (files) => {
                  const medias = await MediaMapper.fromFiles(files);
                  form.setValue("data.images", [
                    ...(formData.data?.images || []),
                    ...medias,
                  ]);
                });

                input.multiple = true;
                input.click();
              }}
              w={"100%"}
              h={20}
              minH={"100%"}
              bg={"primary.500"}
              border={"3px solid transparent"}
              borderColor={"primary.700"}
              _hover={{ color: "primary.50", borderColor: "primary.50" }}
              p={0}
            >
              <Row mx={"auto"} alignItems={"center"} justifyContent={"center"}>
                <BiPlusCircle size={50} />
              </Row>
            </ButtonCTA>
          </SimpleGrid>
          <Row my={2} alignItems={"center"}>
            <Square size={10} color={"primary.500"}>
              <BsStar size={24} />
            </Square>
            <Text
              pl={2}
              fontStyle={"italic"}
              fontSize={"xl"}
              fontWeight={"bold"}
            >
              Clique na estrela para selecionar a foto de perfil
            </Text>
          </Row>
        </FieldWrap>
        <FieldWrap label={"Selecionar Música Principal"} isInverted>
          {musics.isFetching && (
            <Progress
              isIndeterminate
              colorScheme="primary"
              rounded={"xl"}
              mb={2}
            />
          )}
          <SimpleGrid gap={2} columns={5}>
            {musics?.data?.data.map((music) => (
              <Row pos={"relative"}>
                <Circle
                  size={28}
                  bg={"gray.700"}
                  mx={"auto"}
                  border={"4px solid transparent"}
                  borderColor={"primary.500"}
                  color={"primary.500"}
                >
                  <BsMusicNoteBeamed size={40} />
                </Circle>
                <Col w={"100%"} h={"100%"} pos={"absolute"} left={0} top={0}>
                  <Row py={2}>
                    <Row flex={1}></Row>
                    <Square
                      size={10}
                      color={"primary.300"}
                      cursor={"pointer"}
                      _hover={{ color: "primary.500" }}
                      onClick={() => {
                        apiClient
                          .setMusicRequest(music.id, {
                            is_main: !music.is_main,
                          })
                          .then(() => musics.refetch());
                      }}
                    >
                      {music.is_main ? (
                        <BsStarFill size={24} />
                      ) : (
                        <BsStar size={24} />
                      )}
                    </Square>
                  </Row>
                  <Row flex={1}></Row>
                  <Row py={2}>
                    <Row flex={1}></Row>
                  </Row>
                </Col>
              </Row>
            ))}
          </SimpleGrid>
          <Row my={2} alignItems={"center"}>
            <Square size={10} color={"primary.500"}>
              <BsStar size={24} />
            </Square>
            <Text
              pl={2}
              fontStyle={"italic"}
              fontSize={"xl"}
              fontWeight={"bold"}
            >
              Clique na estrela para selecionar a música principal
            </Text>
          </Row>
        </FieldWrap>
        <FieldWrap label={"Links das Redes Sociais"} isInverted>
          <SimpleGrid gap={2}>
            <SocialField
              icon={<AiOutlineYoutube size={32} />}
              name={"data.socialYoutube"}
              title={"YouTube"}
            />
            <SocialField
              icon={<FaTiktok size={24} />}
              name={"data.socialTiktok"}
              title={"Tik Tok"}
            />
            <SocialField
              icon={<BsInstagram size={24} />}
              name={"data.socialInstagram"}
              title={"Instagram"}
            />
          </SimpleGrid>
        </FieldWrap>
      </Col>
    </>
  );
};

export default ArtistForm;
