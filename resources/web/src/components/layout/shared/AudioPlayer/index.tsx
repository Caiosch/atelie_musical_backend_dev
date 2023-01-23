import { Col, Row } from "@/components/shared";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Square,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { BsPause, BsPlay } from "react-icons/bs";
import format from "format-duration";

const timeToPercentage = (time: number, duration: number) => {
  return Number(((time / duration) * 100).toFixed(2));
};

const percentageToTime = (duration: number, percentage: number) => {
  return Number(duration * (percentage / 100));
};

const AudioPlayer: React.FC<{
  colorScheme?: "dark" | "light";
  src: string;
}> = ({ colorScheme = "dark", src }) => {
  const [isPlaying, setPlaying] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMoving = useDisclosure();
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audio.src = src;

    audioRef.current = audio;

    const calcRemainingTime = () => {
      const { currentTime, duration } = audio;
      const nextRemaining = duration - currentTime;

      if (duration === Infinity || duration <= 0) return;

      setRemainingTime(() => nextRemaining);
    };

    const onTimeUpdate = () => {
      const { currentTime, duration } = audio;
      const percentage = timeToPercentage(currentTime, duration);

      calcRemainingTime();
      setBarWidth(() => Number(percentage));
    };

    const onCanPlay = () => {
      onTimeUpdate();
    };

    const onDurationChange = () => {
      onTimeUpdate();
    };

    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.pause();
      audio.remove();
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [src]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <Col w={"100%"} maxW={"100%"} justifyContent={"center"}>
      <Row
        bg={colorScheme === "dark" ? "gray.700" : "primary.50"}
        w={"100%"}
        rounded={"3xl"}
        h={"auto"}
        alignItems={"center"}
        px={4}
        pl={2}
      >
        <Square
          size={10}
          color={"primary.600"}
          cursor={"pointer"}
          onClick={() => {
            setPlaying(() => !isPlaying);
          }}
        >
          {isPlaying ? <BsPause size={28} /> : <BsPlay size={28} />}
        </Square>
        {/* <Row
          h={2}
          bg={colorScheme === "dark" ? "lighten.100" : "darken.100"}
          rounded={"2xl"}
          flex={1}
          overflow={"hidden"}
        >
          <Row
            h={"100%"}
            w={`${barWidth}%`}
            bg={"primary.600"}
            rounded={"xl"}
          />
        </Row> */}
        <Slider
          aria-label="slider-ex-2"
          colorScheme="primary"
          value={isMoving.isOpen ? undefined : barWidth}
          max={100}
          defaultValue={0}
          onChangeStart={isMoving.onOpen}
          onChangeEnd={(value) => {
            const { duration } = audioRef.current!;
            const nextTime = percentageToTime(duration, value);
            const nextPercentage = timeToPercentage(nextTime, duration);

            audioRef.current!.currentTime = nextTime;
            setBarWidth(() => nextPercentage);

            isMoving.onClose();
          }}
        >
          <SliderTrack
            bg={colorScheme === "dark" ? "lighten.100" : "darken.100"}
            h={2}
            rounded={"xl"}
          >
            <SliderFilledTrack bg={"primary.600"} />
          </SliderTrack>
          <SliderThumb
            bg={"primary.500"}
            w={2}
            h={2}
            outline={"none"}
            _focus={{ boxShadow: "none" }}
          />
        </Slider>
        <Text
          ml={2}
          fontSize={"xs"}
          fontWeight={"bold"}
          color={colorScheme === "dark" ? "white" : "gray.500"}
        >
          {/* {remainingTime} */}
          {format(remainingTime * 1000)}
        </Text>
      </Row>
    </Col>
  );
};

export default AudioPlayer;
