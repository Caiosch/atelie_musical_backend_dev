import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import { Col } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface MusicLyricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  paragraphs: string[][];
  title: string;
  artistName: string;
}

const MusicLyricsModal: React.FC<MusicLyricsModalProps> = ({
  isOpen,
  onClose,
  paragraphs,
  artistName,
  title,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"lg"}>
        <ModalOverlay />
        <ModalContent
          rounded={"2xl"}
          overflow={"hidden"}
          bgColor={"primary.500"}
          my={8}
          mx={4}
        >
          <ModalHeader textAlign={"center"} color={"white"}>
            <Heading size={"2xl"} mb={4}>
              {title}
            </Heading>
            <Heading
              size={"sm"}
              fontWeight={100}
              color={"black"}
              textTransform={"uppercase"}
            >
              {artistName}
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ListView
              items={paragraphs}
              render={(lines) => (
                <Col mb={4}>
                  <ListView
                    items={lines}
                    render={(text) => (
                      <Text
                        fontWeight={"bold"}
                        fontStyle={"italic"}
                        textAlign={"center"}
                      >
                        {text}
                      </Text>
                    )}
                  />
                </Col>
              )}
            />
          </ModalBody>

          <ModalFooter gap={4}>
            <ButtonCTA
              bg={"red.500"}
              color={"white"}
              w={"100%"}
              onClick={onClose}
            >
              Fechar
            </ButtonCTA>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MusicLyricsModal;
