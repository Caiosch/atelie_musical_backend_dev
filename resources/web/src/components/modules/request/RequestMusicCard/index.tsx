import { Col, Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import { Square, Text } from "@chakra-ui/react";
import React from "react";
import { BsInfoCircle, BsMusicNote, BsMusicNoteList } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineStar } from "react-icons/ai";
import { FaCalendarCheck } from "react-icons/fa";
import { MdQueueMusic } from "react-icons/md";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import { Link } from "react-router-dom";
import { ApiApp } from "@/services/api/api.app";
import { RequestMusicMapper } from "@/services/app/mappers/request-mapper";

interface RequestMusicCardProps {
  requestMusic: ApiApp.Entities.RequestMusic;
  to?: string;
}

const RequestMusicCard: React.FC<RequestMusicCardProps> = ({
  requestMusic,
  to,
}) => {
  return (
    <Col
      p={4}
      roundedTopRight={"3xl"}
      roundedBottomLeft={"3xl"}
      bg={"gray.700"}
      shadow={"lg"}
      color={"primary.50"}
    >
      <ListView
        items={RequestMusicMapper.toLabelList(requestMusic)}
        render={(v) => {
          return (
            <Row alignItems={"center"}>
              <Row alignItems={"center"}>
                <Square size={8}>{v.icon}</Square>
                <Text fontWeight={"bold"} px={2}>
                  {v.label}:
                </Text>
                <Text flex={1} color={"primary.400"} fontWeight={"bold"}>
                  {v.value}
                </Text>
              </Row>
            </Row>
          );
        }}
      />
      <Row h={4} />
      <Row alignItems={"center"} justifyContent={"center"} mt={"auto"}>
        <Link to={to || `/accpanel/request/${requestMusic.id}`}>
          <ButtonCTA
            px={8}
            py={2}
            fontSize={"sm"}
            bg={"primary.500"}
            color={"primary.50"}
          >
            Acompanhar Pedido
          </ButtonCTA>
        </Link>
      </Row>
    </Col>
  );
};

export default RequestMusicCard;
