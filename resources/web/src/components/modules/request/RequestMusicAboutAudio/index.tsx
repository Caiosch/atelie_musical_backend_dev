import AudioPlayer from "@/components/layout/shared/AudioPlayer";
import { Col, Row } from "@/components/shared";
import { FormMedia } from "@/components/shared/ctrl-forms/CtrlFormMediaPicker";
import { toBase64 } from "@/helpers/toBase64";
import { AudioController } from "@/services/controllers/AudioController";
import {
  Circle,
  Collapse,
  Heading,
  IconButton,
  Progress,
  Text,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { BsPlay, BsStop, BsTrash } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";

interface RequestMusicAboutAudioProps {
  onChange?: (media: FormMedia | undefined) => void;
  value?: FormMedia;
}

const RequestMusicAboutAudio: React.FC<RequestMusicAboutAudioProps> = ({
  onChange,
  value,
}) => {
  const audioController = useRef(new AudioController());
  const canPlay = useDisclosure();
  const [isPlaying, playing] = useBoolean();
  const [isLoading, loading] = useBoolean();
  const [error, setError] = useState<string>();

  const showError = (message: string) => {
    setError(() => message);

    setTimeout(() => {
      setError(() => undefined);
    }, 3000);
  };

  const toggle = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  const play = () => {
    playing.on();
    audioController.current.start();
  };

  const stop = () => {
    playing.off();
    audioController.current.stop().then(async (blob) => {
      if (!blob) {
        showError("Não foi possível gravar!");
        return;
      }

      loading.on();

      onChange?.({
        isBase64: true,
        src: await toBase64(blob),
        type: blob.type,
        size: blob.size.toString(),
      });

      loading.off();

      // setSource(() => blob);
    });
  };

  const remove = () => {
    onChange?.(undefined);
  };

  const BtnToggle = () => {
    return (
      <Circle
        pos={"absolute"}
        right={4}
        bottom={4}
        size={16}
        border={"1px solid transparent"}
        borderColor={"gray.800"}
        color={"gray.800"}
        cursor={"pointer"}
        userSelect={"none"}
        zIndex={40}
        onClick={canPlay.onToggle}
        as={"button"}
        disabled={!!value}
        opacity={value ? 0.3 : 1}
      >
        <FaMicrophone size={28} />
      </Circle>
    );
  };

  if (!canPlay.isOpen) {
    return <BtnToggle />;
  }

  return (
    <Col
      pos={"absolute"}
      bottom={0}
      left={0}
      zIndex={20}
      w={"100%"}
      h={"100%"}
      p={4}
      alignItems={"center"}
      justifyContent={"center"}
      rounded={"2xl"}
      bg={"lighten.50"}
    >
      <BtnToggle />

      <Col w={300} maxW={"100%"}>
        <Col bg={"gray.800"} rounded={"2xl"} color={"primary.50"}>
          <Collapse in={isLoading}>
            <Progress
              isIndeterminate
              h={1}
              rounded={"xl"}
              colorScheme={"primary"}
              mb={2}
              mt={4}
              bg={"lighten.100"}
            />
          </Collapse>
          <Row
            p={4}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={2}
          >
            {!value && (
              <IconButton
                aria-label="Play/Stop"
                variant={"ghost"}
                colorScheme={isPlaying ? "red" : "primary"}
                fontSize={"4xl"}
                onClick={toggle}
              >
                {isPlaying ? <BsStop /> : <BsPlay />}
              </IconButton>
            )}
            {value && (
              <IconButton
                aria-label="Play/Stop"
                variant={"ghost"}
                colorScheme={"red"}
                fontSize={"2xl"}
                onClick={remove}
              >
                <BsTrash />
              </IconButton>
            )}
            <Text
              flex={1}
              color={value ? "green.400" : "primary.300"}
              fontWeight={"bold"}
              fontSize={"xs"}
            >
              {value
                ? "Para enviar o audio basta prosseguir..."
                : "Clique no play para iniciar a gravar!"}
            </Text>
          </Row>
          <Collapse in={!!error} animateOpacity>
            <Row pb={2} px={4}>
              <Text color={"red.500"}>{error}</Text>
            </Row>
          </Collapse>
        </Col>
        <Collapse in={!!value} animateOpacity>
          {value && (
            <Row mt={2} w={"100%"}>
              <AudioPlayer src={value.src} />
            </Row>
          )}
        </Collapse>
      </Col>
    </Col>
  );
};

export default RequestMusicAboutAudio;
