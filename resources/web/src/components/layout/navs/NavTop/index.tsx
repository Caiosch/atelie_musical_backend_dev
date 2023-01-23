import LoginModal from "@/components/modules/modals/LoginModal";
import MenuModal from "@/components/modules/modals/MenuModal";
import PasswordRecoveryModal from "@/components/modules/modals/PasswordRecoveryModal";
import RegisterModal from "@/components/modules/modals/RegisterModal";
import { useAuth } from "@/components/providers/AuthProvider";
import { Col, Content, OptionalLink, Row } from "@/components/shared";
import { ListView } from "@/components/shared/helpers/ListView";
import {
  Button,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import ButtonCTA from "../../shared/ButtonCTA";
import LogoItem from "../../shared/LogoItem";

// import { Container } from './styles';

const NavTop: React.FC = () => {
  const showLogin = useDisclosure();
  const showRegister = useDisclosure();
  const showMenu = useDisclosure();
  const showRecovery = useDisclosure();
  const showMenuBg = useDisclosure();
  const isShowMenu = useBreakpointValue([1, 1, 1, 0, 0, 0]);
  const { isAuth, user, username, dashboardPath } = useAuth();
  const to = useNavigate();

  const onScroll = () => {
    const distanceTop =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;

    if (distanceTop > 30) {
      showMenuBg.onOpen();
    } else {
      showMenuBg.onClose();
    }
  };

  useEffect(() => {
    onScroll();

    window.addEventListener("scroll", onScroll);
  }, []);

  const loginButton = useMemo(() => {
    if (isAuth && user) {
      return {
        label: (
          <Row alignItems={"center"}>
            <BsPerson size={28} />
            <Col pl={4}>{username}</Col>
          </Row>
        ),
        onClick: () => {
          showLogin.onOpen();
        },
      };
    } else {
      return {
        label: <BsPerson size={28} />,
        onClick: () => {
          showLogin.onOpen();
        },
      };
    }
  }, [isAuth, user]);

  return (
    <>
      <LoginModal
        {...showLogin}
        onRegisterRequest={() => {
          showLogin.onClose();
          setTimeout(() => {
            showRegister.onOpen();
          }, 100);
        }}
        onRecoveryRequest={() => {
          showRegister.onClose();
          showLogin.onClose();

          setTimeout(() => {
            showRecovery.onOpen();
          }, 100);
        }}
        onSubmit={(user) => {
          showLogin.onClose();
          to(user.role === "admin" ? "/admin" : "/accpanel");
        }}
        onLogout={() => {
          to("/");
          showLogin.onClose();
        }}
      />
      <PasswordRecoveryModal
        {...showRecovery}
        onSubmit={() => {
          showRecovery.onClose();
        }}
      />
      <RegisterModal
        {...showRegister}
        onLoginRequest={() => {
          showRegister.onClose();
          setTimeout(() => {
            showLogin.onOpen();
          }, 100);
        }}
      />
      <MenuModal
        {...showMenu}
        onLogin={() => {
          showRegister.onClose();
          setTimeout(() => {
            showLogin.onOpen();
          }, 100);
        }}
        onRegister={() => {
          showLogin.onClose();
          setTimeout(() => {
            showRegister.onOpen();
          }, 100);
        }}
      />
      <Col
        h={20}
        w={"100%"}
        pos={"absolute"}
        left={0}
        top={0}
        zIndex={1000}
        alignItems={"center"}
        justifyContent={"center"}
        bg={showMenuBg.isOpen ? "primary.900" : "transparent"}
        shadow={showMenuBg.isOpen ? "lg" : "none"}
        transition={"all .2s ease-in-out"}
      >
        <Content h={"100%"}>
          <Row h={"100%"} w={"100%"} alignItems={"center"} px={4} gap={4}>
            <Row h={"100%"} py={2}>
              <LogoItem h={"100%"} />
            </Row>
            <Row flex={1} h={"100%"} />
            {!!isShowMenu && (
              <>
                <Link to={`/music/request`}>
                  <ButtonCTA bg={"transparent"} color={"primary.50"} px={0}>
                    Criar Música
                  </ButtonCTA>
                </Link>
                <IconButton
                  aria-label="Show Menu"
                  colorScheme="primary"
                  variant={"ghost"}
                  onClick={showMenu.onOpen}
                >
                  <AiOutlineMenu size={26} />
                </IconButton>
              </>
            )}
            {!isShowMenu && (
              <Row px={4} h={"100%"}>
                <ListView
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Criar Música", href: "/music/request" },
                    { label: "Artistas", href: "/artists" },
                    { label: "Músicas", href: "/musics" },
                    loginButton,
                  ]}
                  render={({ label, href, onClick }: any) => {
                    return (
                      <OptionalLink to={href}>
                        <Button
                          h={"100%"}
                          textTransform={"uppercase"}
                          fontSize={"sm"}
                          fontWeight={"bold"}
                          onClick={onClick}
                          color={"primary.200"}
                          bg={"transparent"}
                          outline={"none"}
                          px={4}
                          _hover={{ color: "primary.400" }}
                          _active={{ color: "primary.500" }}
                        >
                          {label}
                        </Button>
                      </OptionalLink>
                    );
                  }}
                />
              </Row>
            )}
          </Row>
        </Content>
      </Col>
    </>
  );
};

export default NavTop;
