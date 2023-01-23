import LogoItem from "@/components/layout/shared/LogoItem";
import { Col, Content, Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import SocialLinks from "@/components/shared/helpers/SocialLinks";
import { Button, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

interface FooterPageProps {
  isInverted?: boolean;
}

const FooterPage: React.FC<FooterPageProps> = ({ isInverted }) => {
  return (
    <Col
      w={"100%"}
      minH={["auto", "auto", 300, 300, 300]}
      bg={isInverted ? "primary.100" : "gray.600"}
      color={isInverted ? "gray.700" : "primary.100"}
    >
      <Content flex={1}>
        <Row
          h={10}
          flexDir={["row-reverse"]}
          display={["none", "none", "flex", "flex", "flex"]}
        >
          <Row>
            <ListView
              items={[
                { to: "/", label: "Home" },
                { to: "/music/request", label: "Criar Música" },
                { to: "/artists", label: "Artistas" },
                { to: "/musics", label: "Músicas" },
              ]}
              render={(link) => (
                <Button
                  bg={"transparent"}
                  border={0}
                  _focus={{}}
                  _hover={{ borderColor: "primary.500" }}
                  rounded={0}
                  _active={{}}
                  color={isInverted ? "gray.700" : "primary.50"}
                  borderTop={"4px solid transparent"}
                  textTransform={"uppercase"}
                >
                  {link.label}
                </Button>
              )}
            />
          </Row>
        </Row>
        <Row
          flex={1}
          alignItems={"center"}
          flexDir={["row", "row", "row", "row", "row", "row"]}
          pt={8}
        >
          <Col flex={1}>
            <LogoItem mx={"auto"} maxW={"100%"} h={20} my={4} />
          </Col>
          <Col flex={1}>
            <SimpleGrid
              gap={1}
              borderLeft={["1px solid transparent", null, null, 0, null, null]}
              borderColor={"primary.50"}
              pl={[4, 2, 0, 0, 0, 0]}
              flex={1}
              columns={[1, 1, 1, 1, 1, 1]}
            >
              <ListView
                items={[
                  {
                    label: "Política de privacidade",
                    to: "/pages/politica-de-privacidade",
                  },
                  { label: "Termos de Uso", to: "/pages/termos-de-uso" },
                  {
                    label: "Política de Revisão",
                    to: "/pages/politica-de-revisao",
                  },
                  { label: "Trabalhe Conosco", to: "/pages/trabalhe-conosco" },
                  { label: "Contato", to: "/pages/contato" },
                ]}
                render={(link) => (
                  <Link to={link.to} style={{ flex: 1 }}>
                    <Row
                      textTransform={"uppercase"}
                      fontWeight={[
                        "normal",
                        "bold",
                        "normal",
                        "normal",
                        "normal",
                      ]}
                      fontSize={["xs", "md", "lg", "lg", "lg"]}
                      flex={1}
                      color={isInverted ? "gray.700" : "primary.50"}
                      justifyContent={[
                        "start",
                        "start",
                        "start",
                        "start",
                        "start",
                        "start",
                      ]}
                    >
                      {link.label}
                    </Row>
                  </Link>
                )}
              />
            </SimpleGrid>
            <Col flex={1} alignItems={"center"} justifyContent={"center"}></Col>
          </Col>
        </Row>
        <SocialLinks
          py={2}
          size={20}
          facebookLink="https://facebook.com"
          youtubeLink="https://youtube.com"
          instagramLink="https://instagram.com"
          linkedinLink="https://linkedin.com"
        />
      </Content>
      <Row
        alignItems={"center"}
        justifyContent={["center", "center", "end", "end", "end", "end"]}
        py={2}
        bg={"red.900"}
        color={"primary.100"}
      >
        <Text fontSize={["7px", "7px", "xs", "xs", "xs"]} textAlign={"center"}>
          Meu Bemquerê 2022. All rights reserved | BEMQUERE PRODUÇÕES ARTÍSTICAS
          LTDA. | CNPJ - 44.141.958/0001-78
        </Text>
      </Row>
    </Col>
  );
};

export default FooterPage;
