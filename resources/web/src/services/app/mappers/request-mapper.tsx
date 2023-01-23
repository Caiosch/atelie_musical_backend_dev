import {
  getDurationConfig,
  getMusicExtras,
  getMusicRequestStatusConfig,
  getSongTypeConfig,
} from "@/configs/app";
import { ApiApp } from "@/services/api/api.app";
import { AiOutlineStar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { BsMusicNote, BsInfoCircle } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaCalendarCheck } from "react-icons/fa";
import { MdQueueMusic } from "react-icons/md";

export abstract class RequestMusicMapper {
  public static toLabelList(requestMusic: ApiApp.Entities.RequestMusic) {
    return [
      {
        icon: <BsMusicNote size={20} />,
        label: "Id",
        value: `#${requestMusic.id}`,
      },
      requestMusic.artist_id && {
        icon: <CgProfile size={20} />,
        label: "Artista",
        value: requestMusic.artist?.full_name,
      },
      requestMusic.data?.duration && {
        icon: <BiTime size={20} />,
        label: "Tempo da Música",
        value: getDurationConfig(requestMusic.data.duration)?.label,
      },
      requestMusic.data?.songType && {
        icon: <MdQueueMusic size={20} />,
        label: "Estilo",
        value: getSongTypeConfig(requestMusic.data.songType)?.label,
      },
      requestMusic.data?.extras && {
        icon: <AiOutlineStar size={20} />,
        label: "Extras",
        value: getMusicExtras(requestMusic).join(" & "),
      },
      {
        icon: <FaCalendarCheck size={20} />,
        label: "Previsão de Entrega",
        value: new Date(requestMusic.delivery_date).toLocaleDateString(),
      },
      {
        icon: <BsInfoCircle size={20} />,
        label: "Status",
        value: getMusicRequestStatusConfig(requestMusic.status)?.label,
      },
      requestMusic.data?.musicReference && {
        label: "Referência",
        value: requestMusic.data.musicReference,
        flexDir: "column",
      },
      {
        label: "Proposta da Música",
        value: requestMusic.data?.about,
        flexDir: "column",
      },
    ].filter((v) => !!v);
  }
}
