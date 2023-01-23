import { ApiApp } from "@/services/api/api.app";
import { apiClient } from "@/services/clients/api";
import { BsCameraVideo } from "react-icons/bs";
import { IoMdMicrophone } from "react-icons/io";

export const appConfig = {
  MAX_MUSIC_IMAGES: 60,
  BASE_PRICE: 1200,
  BASE_DAYS: 3,
  EXPRESS_PRICE: 588.98,
};

export enum SongTypeNames {
  Acustic = "acustic",
  Band = "band",
}

export const resolveArtistAvatar = (artist: ApiApp.Entities.Artist) => {
  const nextUrl =
    artist.data?.images?.find((i) => i.isMain)?.src ||
    artist.data?.images?.[0]?.src!;
  return apiClient.resolveFileUrl(nextUrl);
};

export const songTypesConfig = {
  items: [
    { label: "Acústico", value: SongTypeNames.Acustic },
    { label: "Banda", value: SongTypeNames.Band },
  ],
  configs: {
    [SongTypeNames.Acustic]: {
      price: 400,
      label: "Acústico",
      plusDeadline: 2,
    },
    [SongTypeNames.Band]: {
      price: 800,
      label: "Banda",
      plusDeadline: 3,
    },
  },
};

export const getSongTypeConfig = (
  name: string
): typeof songTypesConfig.configs["acustic"] => {
  // @ts-ignore
  return songTypesConfig.configs[name];
};

export enum DurationNames {
  Min1 = "1min",
  Min3 = "3min",
}

export enum MusicRequestStatus {
  WaitingPayment = "waiting_payment",
  WaitingImages = "waiting_images",
  Finished = "finished",
  WaitingProduction = "waiting_production",
}

export const musicRequestStatusConfig = {
  items: [
    {
      label: "Aguardando envio de imagens",
      value: MusicRequestStatus.WaitingImages,
    },
    { label: "Aguardando pagamento", value: MusicRequestStatus.WaitingPayment },
    { label: "Finalizado", value: MusicRequestStatus.Finished },
    {
      label: "Aguardando produção",
      value: MusicRequestStatus.WaitingProduction,
    },
  ],
  configs: {
    [MusicRequestStatus.WaitingImages]: {
      label: "Aguardando envio de imagens",
    },
    [MusicRequestStatus.WaitingPayment]: {
      label: "Aguardando Pagamento",
    },
    [MusicRequestStatus.Finished]: {
      label: "Finalizado",
    },
    [MusicRequestStatus.WaitingProduction]: {
      label: "Aguardando Produção",
    },
  },
};

export const getMusicExtras = (request: ApiApp.Entities.RequestMusic) => {
  return [
    request.data?.extras?.includes(MusicRequestNames.MusicPlatform) &&
      "Apps de Música",
    request.data?.extras?.includes(MusicRequestNames.MusicPlatform) &&
      "Vídeo Cantado",
  ].filter((v) => !!v) as string[];
};

export const getMusicRequestStatusConfig = (
  name: string
): typeof musicRequestStatusConfig.configs["finished"] => {
  // @ts-ignore
  return musicRequestStatusConfig.configs[name];
};

export const durationsConfig = {
  items: [
    { label: "3 Minutos", value: DurationNames.Min3 },
    { label: "1 Minuto", value: DurationNames.Min1 },
  ],
  configs: {
    [DurationNames.Min3]: {
      price: 1000,
      label: "3 minutos",
      plusDeadline: 3,
    },
    [DurationNames.Min1]: {
      price: 650,
      label: "1 minuto",
      plusDeadline: 2,
    },
  },
};

export const getDurationConfig = (
  name: string
): typeof durationsConfig.configs["1min"] => {
  // @ts-ignore
  return durationsConfig.configs[name];
};

export enum MusicRequestNames {
  MusicPlatform = "extra:music-platforms",
  VideoLetters = "extra:video-letters",
}

const appsMusicPrice = 100;
const singerVideo = 100;

export const musicRequestExtrasConfig = {
  items: [
    {
      title: "Apps de Música",
      price: appsMusicPrice,
      icon: <BsCameraVideo size={50} />,
      description: [
        "A gente publica no Spotify, Apple Music, Deezer...",
        "Pra você ouvir quando quiser e compartilhar com os amigos! Bora?",
      ],
      plusDeadline: 2,
      value: MusicRequestNames.MusicPlatform,
    },
    {
      title: "Vídeo q canta",
      price: singerVideo,
      icon: <IoMdMicrophone size={50} />,
      description: [
        "Um vídeo com as fotos e letra acompanhando a música, deixam tudo ainda melhor!",
      ],
      plusDeadline: 3,
      value: MusicRequestNames.VideoLetters,
    },
  ],
  configs: {
    [MusicRequestNames.MusicPlatform]: {
      price: appsMusicPrice,
      label: "Apps de Música",
      plusDeadline: 2,
    },
    [MusicRequestNames.VideoLetters]: {
      price: singerVideo,
      label: "Vídeo exclusivo",
      plusDeadline: 3,
    },
  },
};

export const getMusicRequestExtreConfig = (
  name: string
): typeof musicRequestExtrasConfig.configs["extra:music-platforms"] => {
  // @ts-ignore
  return musicRequestExtrasConfig.configs[name];
};
