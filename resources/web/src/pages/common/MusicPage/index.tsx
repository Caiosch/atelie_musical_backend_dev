import CommonMasterPage from "@/components/layout/pages/common/CommonMasterPage";
import FooterPage from "@/components/layout/pages/common/FooterPage";
import AudioPlayer from "@/components/layout/shared/AudioPlayer";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import MenuTopSpacing from "@/components/layout/shared/MenuTopSpacing";
import MusicLyricsModal from "@/components/modules/music/MusicLyricsModal";
import { Col, Content } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import SocialLinks from "@/components/shared/helpers/SocialLinks";
import { resolveArtistAvatar } from "@/configs/app";
import { useMusicQuery } from "@/hooks/api/useMusicQuery";
import { apiClient } from "@/services/clients/api";
import {
  Circle,
  Container,
  Heading,
  HStack,
  Img,
  Square,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import {
  BsCameraVideo,
  BsInstagram,
  BsLinkedin,
  BsSpotify,
  BsYoutube,
} from "react-icons/bs";
import { FaEnvelopeOpenText, FaFacebook } from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";
import { VscChevronDown } from "react-icons/vsc";
import { useParams } from "react-router-dom";

const MusicPage: React.FC = () => {
  const { musicId } = useParams();
  const showLyrics = useDisclosure();
  const { data: music } = useMusicQuery(musicId!);

  if (!music) return <></>;

  return (
    <>
      <MusicLyricsModal
        isOpen={showLyrics.isOpen}
        onClose={showLyrics.onClose}
        title={music.name}
        artistName={music.artist?.full_name ?? "Artista Não Definido"}
        paragraphs={music.lyrics?.split("\n\n").map((paragraph) => {
          return paragraph.split("\n");
        })}
      />
      <CommonMasterPage>
        <Col px={8}>
          <MenuTopSpacing />
          <Content>
            <Col w={"100%"} gap={8}>
              <Heading
                textAlign={"center"}
                w={700}
                maxW={"100%"}
                mx={"auto"}
                size={"2xl"}
                lineHeight={"130%"}
              >
                Olha que coisa linda, uma{" "}
                <Text as={"span"} color={"primary.500"}>
                  música
                </Text>{" "}
                feita só pra você!
              </Heading>
              {music.video_file && (
                <Col
                  h={[200, 300, 340, 380, 420, 420]}
                  w={"100%"}
                  roundedTopLeft={"3xl"}
                  roundedBottomRight={"3xl"}
                  bg={"black"}
                  border={"2px solid transparent"}
                  borderColor={"primary.500"}
                  shadow={"lg"}
                  overflow={"hidden"}
                >
                  <video
                    src={apiClient.resolveFileUrl(music.video_file.src)}
                    controls
                    style={{ width: "100%", height: "100%" }}
                  />
                </Col>
              )}
              <Col gap={4} w={400} maxW={"100%"} mx={"auto"}>
                <ListView
                  items={[
                    {
                      label: "Ver Letra da Música",
                      button: {
                        color: "primary.500",
                        bg: "transparent",
                        fontSize: "lg",
                        onClick: showLyrics.onOpen,
                      },
                      icon: (
                        <Square mb={1}>
                          <VscChevronDown size={32} />
                        </Square>
                      ),
                    },
                    {
                      label: "Baixar Música",
                      button: {
                        color: "primary.50",
                        bg: "secondary.500",
                        fontSize: "xl",
                      },
                      href: `${apiClient.resolveFileUrl(music.file?.src)}`,
                      icon: <MdLibraryMusic size={32} />,
                    },
                    music.link_music_app && {
                      label: "Músicas nos Apps",
                      button: {
                        color: "primary.50",
                        bg: "gray.700",
                        fontSize: "xl",
                      },
                      href: music.link_music_app,
                      icon: <BsSpotify size={24} />,
                    },
                    music.video_file && {
                      label: "Baixar Vídeo",
                      button: {
                        color: "primary.50",
                        bg: "purple.800",
                        fontSize: "xl",
                      },
                      href: `${apiClient.resolveFileUrl(
                        music.video_file?.src
                      )}`,
                      icon: <BsCameraVideo size={24} />,
                    },
                  ].filter((v) => !!v)}
                  render={({ button, icon, label, href }: any) => (
                    <ButtonCTA
                      as={href ? "a" : "button"}
                      fontSize={"lg"}
                      bg={"transparent"}
                      color={"primary.500"}
                      display={"flex"}
                      alignItems={"center"}
                      fontWeight={"bold"}
                      rightIcon={icon}
                      target={"_blank"}
                      href={href}
                      textAlign={"center"}
                      {...(button as any)}
                    >
                      {label}
                    </ButtonCTA>
                  )}
                />
              </Col>
              <Col color={"gray.800"}>
                <Text
                  textAlign={"center"}
                  fontWeight={"bold"}
                  fontStyle={"italic"}
                >
                  Compartilhar:
                </Text>
                <SocialLinks
                  facebookLink="https://facebook.com"
                  youtubeLink="https://youtube.com"
                  instagramLink="https://instagram.com"
                  linkedinLink="https://linkedin.com"
                />
              </Col>
            </Col>
          </Content>
        </Col>
        <Col mt={14}>
          <Col>
            <Heading
              size={"lg"}
              textAlign={"center"}
              maxW={"100%"}
              w={600}
              mx={"auto"}
            >
              Também tem um recado do{" "}
              <Text as={"span"} color={"primary.500"}>
                artista
              </Text>{" "}
              pra você {";)"}
            </Heading>
            <Heading
              size={"lg"}
              textAlign={"center"}
              maxW={"100%"}
              w={700}
              mx={"auto"}
              mt={2}
              mb={4}
            >
              Dá o play!
            </Heading>
            {music.artist && (
              <Col mt={40} bg={"primary.500"} color={"gray.800"} pb={10}>
                <Circle
                  size={64}
                  bg={"gray.700"}
                  mx={"auto"}
                  mt={-32}
                  p={1}
                  shadow={"lg"}
                >
                  <Img
                    w={"100%"}
                    h={"100%"}
                    objectFit={"cover"}
                    rounded={"50%"}
                    src={resolveArtistAvatar(music.artist)}
                  />
                </Circle>
                <Content>
                  <Col mt={4} gap={4} px={8}>
                    <Heading textTransform={"uppercase"} textAlign={"center"}>
                      {music.artist.full_name}
                    </Heading>
                    <Col mx={"auto"} w={400} maxW={"100%"} gap={6}>
                      {music.file?.src && (
                        <AudioPlayer
                          src={apiClient.resolveFileUrl(music.file.src)}
                        />
                      )}
                      <Col
                        px={4}
                        py={2}
                        rounded={"3xl"}
                        roundedTopRight={0}
                        bg={"white"}
                        shadow={"lg"}
                      >
                        <Text fontStyle={"italic"} fontWeight={"bold"}>
                          Lorem Ipsum é simplesmente uma simulação de texto da
                          indústria tipográfica e de impressos, e vem sendo
                          utilizado desde o século XVI, quando um impressor.
                        </Text>
                      </Col>
                    </Col>
                  </Col>
                </Content>
              </Col>
            )}
          </Col>
        </Col>
        <FooterPage />
      </CommonMasterPage>
    </>
  );
};

export default MusicPage;
