import CommonMasterPage from "@/components/layout/pages/common/CommonMasterPage";
import FooterPage from "@/components/layout/pages/common/FooterPage";
import MenuTopSpacing from "@/components/layout/shared/MenuTopSpacing";
import MusicListItem from "@/components/modules/music/MusicListItem";
import { Col, Content } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import MusicsFilterComponent from "@/components/shared/helpers/MusicsFilterComponent";
import { useMusicsListQuery } from "@/hooks/api/useMusicsListQuery";
import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

const MusicsPage: React.FC = () => {
  const musicsFilter = useMusicsListQuery();
  const { nextMusics: musics } = musicsFilter;

  return (
    <CommonMasterPage>
      <Col bg={"white"} color={"gray-text"} py={4} pl={4}>
        <MenuTopSpacing />
        <Content>
          <Col gap={4}>
            <Heading color={"primary.500"}>Músicas</Heading>
            <Col>
              <ListView
                items={[
                  "Ouça aqui exemplos de <strong> músicas que já criamos!</strong>",
                  "Você pode filtrar por estilo musical, ocasiões ou vozes.",
                  "Aperta o play e aproveita!",
                ]}
                render={(v) => (
                  <Text
                    color={"gray.800"}
                    fontWeight={500}
                    fontStyle={"italic"}
                    fontSize={"sm"}
                    dangerouslySetInnerHTML={{ __html: v }}
                  ></Text>
                )}
              />
            </Col>
          </Col>
        </Content>
        <Content>
          <Col>
            <MusicsFilterComponent isInverted {...musicsFilter} />
          </Col>
        </Content>
      </Col>
      <Col
        py={4}
        minH={"60vh"}
        bg={"secondary.600"}
        color={"primary.50"}
        px={4}
      >
        <Content pt={8}>
          <SimpleGrid gap={8} columns={[1, 1, 2, 2, 2, 2, 2]}>
            <ListView
              items={musics}
              render={(music) => <MusicListItem music={music} />}
            />
          </SimpleGrid>
        </Content>
      </Col>
      <FooterPage isInverted />
    </CommonMasterPage>
  );
};

export default MusicsPage;
