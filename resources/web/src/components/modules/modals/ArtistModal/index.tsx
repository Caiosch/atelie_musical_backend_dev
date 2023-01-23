import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  useBoolean,
} from "@chakra-ui/react";
import React from "react";
import ArtistForm from "../../artists/ArtistForm";

interface ArtistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void | Promise<void>;
}

const ArtistModal: React.FC<ArtistModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [isLoading, loading] = useBoolean();
  const save = async () => {
    loading.on();
    await onSave?.()
      ?.then?.(() => {})
      ?.catch?.(() => {})
      ?.finally(() => {
        loading.off();
      });

    loading.off();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay bg={"lighten.800"} />
        <ModalContent minH={"90%"} rounded={"50px"} mx={4} my={2}>
          <ModalHeader>
            <Heading size={"2xl"} color={"primary.500"}>
              Adicionar Artista
            </Heading>
          </ModalHeader>
          <ModalCloseButton size={"lg"} mr={8} />
          <ModalBody>
            <ArtistForm />
          </ModalBody>

          <ModalFooter>
            <ButtonCTA
              textTransform={"uppercase"}
              color={"gray.700"}
              bg={"primary.500"}
              fontSize={"2xl"}
              fontWeight={"bold"}
              mx={"auto"}
              rounded={"1000px"}
              h={16}
              _hover={{ boxShadow: "lg" }}
              onClick={save}
              isLoading={isLoading}
            >
              Salvar
            </ButtonCTA>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ArtistModal;
