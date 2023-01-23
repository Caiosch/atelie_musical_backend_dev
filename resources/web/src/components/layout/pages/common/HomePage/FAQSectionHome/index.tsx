import CardCollapseItem from "@/components/layout/shared/CardCollapseItem";
import { Col, Content, Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import { Circle, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

const FAQSectionHome: React.FC = () => {
  return (
    <>
      <Col bg={"primary.100"}>
        <Content pb={20} px={8} w={800}>
          <Col mt={20} mb={12} justifyContent={"center"}>
            <Heading size={"2xl"} color={"secondary.400"} textAlign={"center"}>
              Perguntas Frequentes
            </Heading>
          </Col>
          <SimpleGrid gap={8} fontWeight={"bold"}>
            {/* <CardCollapseItem
              title={
                "Se eu não gostar de algo na minha canção, posso pedir alguma alteração?"
              }
              description={[
                "Sim, com certeza!",
                "O nosso objetivo é que fique satisfeito e encantado com a sua canção. Se não gostou de algum detalhe, nos envie um e-mail para hello@meubemquere.com para iniciarmos o processo de revisão. A partir do momento que receber sua música, tem 48h para fazer o pedido de revisão.",
                "Na maioria das vezes, as revisões não tem custo adicional, mas se for algo complexo, pode ser cobrada uma taxa extra para compensar as horas a mais que o artista terá que se dedicar. Será analisado caso a caso.",
              ]}
            /> */}
            <CardCollapseItem
              title={"Quanto custa uma música?"}
              description={[
                "Nós temos 4 opções de músicas, com diferentes durações e arranjos:",
                <Col gap={1}>
                  <ListView
                    items={[
                      { label: "3 min Acústica", price: "R$ 1.200" },
                      { label: "3 min Banda", price: "R$ 1.800" },
                      { label: "1 min Acústica", price: "R$ 700" },
                      { label: "1 min Banda", price: "R$ 1000" },
                      { label: "Vídeo 3 min", price: "R$ 400" },
                      { label: "Vídeo 1 min", price: "R$ 250" },
                      { label: "Apps de música", price: "R$ 100" },
                    ]}
                    render={({ label, price }) => (
                      <Row
                        bg={"secondary.400"}
                        px={3}
                        py={2}
                        rounded={"3xl"}
                        color={"primary.100"}
                        fontSize={"lg"}
                        alignItems={"center"}
                        fontWeight={"normal"}
                      >
                        <Text flex={1}>{label}</Text>
                        <Text>{price}</Text>
                      </Row>
                    )}
                  />
                </Col>,
                "",
                "A duração da música pode variar 30 segundos.",
                "",
                "O arranjo Banda é composto por voz + pelo menos 3 instrumentos: por exemplo violão, bateria e baixo",
                "A instrumentação é uma escolha do artista, baseada na referência musical que nos enviar.",
                "",
                "O arranjo Acústico é composto por voz + 1 instrumento, por exemplo violão ou piano, dependendo do artista que escolher.",
              ]}
            />
            <CardCollapseItem
              title={"Em quanto tempo recebo minha música?"}
              description={[""]}
            />
            <CardCollapseItem
              title={
                "Se eu não gostar de algo na minha música, posso pedir alguma alteração?"
              }
              description={[""]}
            />
            <CardCollapseItem
              title={'Vocês usam uma música "pré-feita" e só trocam a letra?'}
              description={[""]}
            />
            <CardCollapseItem
              title={"A plataforma revisa a minha música antes da entrega?"}
              description={[
                "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI.",
                "Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum",
                "E mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.",
              ]}
            />
          </SimpleGrid>
        </Content>
      </Col>
    </>
  );
};

export default FAQSectionHome;
