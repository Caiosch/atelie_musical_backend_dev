import CommonMasterPage from "@/components/layout/pages/common/CommonMasterPage";
import FooterPage from "@/components/layout/pages/common/FooterPage";
import BusinessSectionHome from "@/components/layout/pages/common/HomePage/BusinessSectionHome";
import CommentsSectionHome from "@/components/layout/pages/common/HomePage/CommentsSectionHome";
import FAQSectionHome from "@/components/layout/pages/common/HomePage/FAQSectionHome";
import HeaderSectionHome from "@/components/layout/pages/common/HomePage/HeaderSectionHome";
import HowReceiveMusicSectionHome from "@/components/layout/pages/common/HomePage/HowReceiveMusicSectionHome";
import HowWorksSectionHome from "@/components/layout/pages/common/HomePage/HowWorksSectionHome";
import MusicsHistoriesSectionHome from "@/components/layout/pages/common/HomePage/MusicsHistoriesSectionHome";
import MusicsPersonalizedSectionHome from "@/components/layout/pages/common/HomePage/MusicsPersonalizedSectionHome";
import OursArtistsSectionHome from "@/components/layout/pages/common/HomePage/OursArtistsSectionHome";
import VideosHistoriesSectionHome from "@/components/layout/pages/common/HomePage/VideosHistoriesSectionHome";
import { Col, Content, Row } from "@/components/shared";
import {
  Button,
  Heading,
  HStack,
  Img,
  SimpleGrid,
  Square,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineRight, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <CommonMasterPage>
      {/* <SimpleGrid gap={2} columns={4}>
        <Link to={"/artists"}>
          <Button>Página dos Artistas</Button>
        </Link>
        <Link to={"/artist/artist-name"}>
          <Button>Página do Artista</Button>
        </Link>
        <Link to={"/music/music-name"}>
          <Button>Página da Musica</Button>
        </Link>
        <Link to={"/music/request"}>
          <Button>Página do Formulário</Button>
        </Link>
      </SimpleGrid> */}
      <HeaderSectionHome />
      <HowWorksSectionHome />
      <VideosHistoriesSectionHome />
      <MusicsHistoriesSectionHome />
      <HowReceiveMusicSectionHome />
      <MusicsPersonalizedSectionHome />
      <OursArtistsSectionHome />
      <CommentsSectionHome />
      <BusinessSectionHome />
      <FAQSectionHome />
      <FooterPage />
    </CommonMasterPage>
  );
};

export default HomePage;
