import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import LogoItem from "@/components/layout/shared/LogoItem";
import { useAuth } from "@/components/providers/AuthProvider";
import { Col, OptionalLink, Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsPerson, BsPersonPlus } from "react-icons/bs";
import ArtistForm from "../../artists/ArtistForm";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: () => void;
  onRegister?: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
}) => {
  const { user } = useAuth();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay />
        <ModalContent
          minH={"90%"}
          bg={"darken.400"}
          color={"primary.500"}
          backdropFilter={"blur(20px)"}
        >
          <ModalHeader>
            <Col>
              <Row h={20} pt={1}>
                <LogoItem h={"100%"} />
              </Row>
              <Row alignItems={"center"}>
                <Heading size={"2xl"}>Menu Principal</Heading>
              </Row>
            </Col>
          </ModalHeader>
          <ModalCloseButton
            size={"lg"}
            mr={2}
            mt={3}
            colorScheme={"primary"}
            color={"primary.400"}
          />
          <ModalBody>
            <Col>
              <ListView
                items={[
                  { label: "Home", href: "/" },
                  { label: "Criar Música", href: "/music/request" },
                  { label: "Artistas", href: "/artists" },
                  { label: "Músicas", href: "/musics" },
                  {
                    label: (
                      <Row alignItems={"center"} w={"100%"}>
                        <BsPerson size={34} />
                        <Text as={"span"} flex={1} textAlign={"left"} pl={4}>
                          {user ? user.name : "Login"}
                        </Text>
                      </Row>
                    ),
                    onClick: () => {
                      onLogin?.();
                    },
                  },
                  !user && {
                    label: (
                      <Row alignItems={"center"} w={"100%"}>
                        <BsPersonPlus size={34} />
                        <Text as={"span"} flex={1} textAlign={"left"} pl={4}>
                          Cadastrar-se
                        </Text>
                      </Row>
                    ),
                    onClick: () => {
                      onRegister?.();
                    },
                  },
                ].filter((v) => !!v)}
                render={({ label, href, onClick }: any) => {
                  return (
                    <OptionalLink to={href}>
                      <Button
                        h={"100%"}
                        textTransform={"uppercase"}
                        fontSize={"lg"}
                        fontWeight={"bold"}
                        onClick={() => {
                          onClick?.();
                          onClose?.();
                        }}
                        color={"primary.200"}
                        bg={"transparent"}
                        outline={"none"}
                        px={4}
                        py={6}
                        _hover={{ color: "primary.400" }}
                        _active={{ color: "primary.500" }}
                      >
                        {label}
                      </Button>
                    </OptionalLink>
                  );
                }}
              />
            </Col>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MenuModal;
