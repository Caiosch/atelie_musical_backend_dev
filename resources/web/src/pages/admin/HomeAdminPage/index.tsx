import CommonMasterPage from "@/components/layout/pages/common/CommonMasterPage";
import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import MenuTopSpacing from "@/components/layout/shared/MenuTopSpacing";
import OnlyUserRole from "@/components/layout/shared/OnlyUserRole";
import AdminCardLg from "@/components/modules/cards/AdminCardLg";
import ArtistModal from "@/components/modules/modals/ArtistModal";
import { Col, Content, Row, TableGenerator } from "@/components/shared";
import { musicRequestStatusConfig } from "@/configs/app";
import { toBRL } from "@/helpers/currency/toBRL";
import { useArtistListQuery } from "@/hooks/api/useArtistListQuery";
import { useRequestMusicListQuery } from "@/hooks/api/useRequestMusicListQuery";
import { useSubscriptionListQuery } from "@/hooks/api/useSubscriptionListQuery";
import { useUserListQuery } from "@/hooks/api/useUserListQuery";
import { apiClient } from "@/services/clients/api";
import { Badge, Heading, IconButton, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BiDetail, BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";

const HomeAdminPage: React.FC = () => {
  const addArtist = useDisclosure();
  const artistForm = useForm();

  const musics = useRequestMusicListQuery(8);
  const pendingMusics = useRequestMusicListQuery(50, { pending: true });
  const artists = useArtistListQuery(2);
  const users = useUserListQuery(10);
  const subscriptions = useSubscriptionListQuery(10);

  return (
    <CommonMasterPage>
      <OnlyUserRole role={"admin"} redirect={"/"}>
        <FormProvider {...artistForm}>
          <ArtistModal
            {...addArtist}
            onSave={async () => {
              const { data } = artistForm.getValues() || {};
              if (!data) return;

              if (data.id) {
                await apiClient.updateArtist(data.id, data).then(() => {
                  addArtist.onClose();
                  artists.query.refetch();
                });
              } else {
                await apiClient.addArtist(data).then(() => {
                  addArtist.onClose();
                  artists.query.refetch();
                });
              }
            }}
          />
        </FormProvider>
        <Col bg={"gray.700"} minH={"100vh"} color={"primary.500"}>
          <MenuTopSpacing />
          <Content>
            <Col>
              <Row>
                <Heading size={"2xl"} textTransform={"uppercase"}>
                  Dashboard
                </Heading>
              </Row>
            </Col>
            <Col gap={12} pt={8}>
              <AdminCardLg
                title={"Lista de Pedidos"}
                pagination={musics.pagination}
              >
                <TableGenerator
                  columns={[
                    {
                      name: "firstName",
                      label: () => "Nome do Cliente",
                    },
                    {
                      name: "requestDate",
                      label: () => "Data do Pedido",
                    },
                    {
                      name: "deliveryDate",
                      label: () => "Data de Entrega",
                    },
                    {
                      name: "status",
                      label: () => "Status",
                    },
                    {
                      name: "total",
                      label: () => "Total",
                    },
                    {
                      name: "actions",
                      label: () => "Ações",
                    },
                  ]}
                  items={
                    musics.query.data?.data?.map((request) => ({
                      firstName: `${request.data.name}`,
                      requestDate: `${new Date(
                        request.created_at
                      ).toLocaleDateString()}`,
                      deliveryDate: `${new Date(
                        request.delivery_date
                      ).toLocaleDateString()}`,
                      status: `${
                        musicRequestStatusConfig.configs?.[request.status].label
                      }`,
                      total: `${toBRL(request.data.price?.total || 0)}`,
                      actions: (
                        <Link to={`/admin/requests/${request.id}`}>
                          <IconButton
                            aria-label="Gerenciar Pedido"
                            rounded={"2xl"}
                            bg={"primary.500"}
                            color={"primary.900"}
                            colorScheme={"primary"}
                            size={"xs"}
                          >
                            <BiDetail size={17} />
                          </IconButton>
                        </Link>
                      ),
                    })) ?? []
                  }
                />
              </AdminCardLg>
              <AdminCardLg
                title={"Lista de Usuários"}
                pagination={users.pagination}
              >
                <TableGenerator
                  columns={[
                    {
                      name: "fullName",
                      label: () => "Nome",
                    },
                    {
                      name: "email",
                      label: () => "E-mail",
                    },
                    {
                      name: "phoneNumber",
                      label: () => "Telefone",
                    },
                    {
                      name: "createdAt",
                      label: () => "Data de Cadastro",
                    },
                    {
                      name: "actions",
                      label: () => "Ações",
                    },
                    {
                      name: "profile",
                      label: () => "Perfil",
                    },
                  ]}
                  items={
                    users.query.data?.data?.map((currentUser) => ({
                      fullName: `${currentUser.name}`,
                      email: `${currentUser.email}`,
                      phoneNumber: currentUser.phone_number,
                      profile: (
                        <>
                          <Badge
                            rounded={"lg"}
                            bg={
                              currentUser.role === "admin"
                                ? "primary.500"
                                : "lighten.200"
                            }
                            color={"gray.900"}
                            textTransform={"uppercase"}
                            fontWeight={"bold"}
                            ml={4}
                          >
                            {currentUser.role}
                          </Badge>
                        </>
                      ),
                      createdAt: new Date(
                        currentUser.created_at
                      ).toLocaleString(),
                      actions: (
                        <Link to={`/admin/users/${currentUser.id}`}>
                          <IconButton
                            aria-label="Gerenciar Usuário"
                            rounded={"2xl"}
                            bg={"primary.500"}
                            color={"primary.900"}
                            colorScheme={"primary"}
                            size={"xs"}
                          >
                            <BiDetail size={17} />
                          </IconButton>
                        </Link>
                      ),
                    })) ?? []
                  }
                />
              </AdminCardLg>
              <AdminCardLg
                title={"Lista de Inscrições"}
                pagination={users.pagination}
              >
                <TableGenerator
                  columns={[
                    {
                      name: "name",
                      label: () => "Nome",
                    },
                    {
                      name: "email",
                      label: () => "E-mail",
                    },
                    {
                      name: "phoneNumber",
                      label: () => "Telefone",
                    },
                    {
                      name: "createdAt",
                      label: () => "Data de Cadastro",
                    },
                  ]}
                  items={
                    subscriptions.query.data?.data?.map((subscription) => ({
                      name: `${subscription.name}`,
                      email: `${subscription.email}`,
                      phoneNumber: subscription.phone_number,
                      createdAt: new Date(
                        subscription.created_at
                      ).toLocaleString(),
                    })) ?? []
                  }
                />
              </AdminCardLg>
              <AdminCardLg
                title={"Lista de Artistas"}
                pagination={artists.pagination}
                _rightHeader={
                  <>
                    <ButtonCTA
                      onClick={() => {
                        addArtist.onOpen();
                        artistForm.setValue("data", {});
                      }}
                      bg={"transparent"}
                      color={"primary.50"}
                      fontFamily={"heading"}
                      textTransform={"uppercase"}
                      px={4}
                    >
                      Adicionar Artista
                    </ButtonCTA>
                  </>
                }
              >
                <TableGenerator
                  columns={[
                    {
                      name: "fullName",
                      label: () => "Nome",
                    },
                    {
                      name: "email",
                      label: () => "E-mail",
                    },
                    {
                      name: "phoneNumber",
                      label: () => "Telefone",
                    },
                    {
                      name: "createdAt",
                      label: () => "Data de Cadastro",
                    },
                    {
                      name: "actions",
                      label: () => "Ações",
                    },
                  ]}
                  items={
                    artists.query.data?.data?.map((artist) => ({
                      fullName: `${artist.full_name}`,
                      email: `${artist.email}`,
                      phoneNumber: `${artist.phone_number}`,
                      createdAt: new Date(artist.created_at).toLocaleString(),
                      actions: (
                        <>
                          <Row>
                            <IconButton
                              aria-label="Editar Artista"
                              rounded={"2xl"}
                              bg={"primary.500"}
                              color={"primary.900"}
                              colorScheme={"primary"}
                              size={"xs"}
                              onClick={() => {
                                artistForm.setValue("data", {
                                  id: artist.id,
                                  fullName: artist.full_name,
                                  phoneNumber: artist.phone_number,
                                  voice: artist.voice_gender,
                                  email: artist.email,
                                  description: artist.description,
                                  musicalStyles:
                                    artist.data?.musicalStyles || [],
                                  images: artist.data?.images || [],
                                  musics: artist.data?.musics || [],
                                  socialYoutube: artist.social_youtube,
                                  socialTiktok: artist.social_tiktok,
                                  socialInstagram: artist.social_instagram,
                                });
                                addArtist.onOpen();
                              }}
                            >
                              <BiEdit size={17} />
                            </IconButton>
                          </Row>
                        </>
                      ),
                    })) ?? []
                  }
                />
              </AdminCardLg>
              <AdminCardLg
                title={"Pedidos não finalizados"}
                pagination={pendingMusics.pagination}
                _rightHeader={
                  <>
                    <Badge
                      rounded={"lg"}
                      bg={"primary.500"}
                      color={"gray.900"}
                      textTransform={"uppercase"}
                      fontWeight={"bold"}
                      ml={4}
                    >
                      Usuários q não se cadastraram
                    </Badge>
                  </>
                }
              >
                <TableGenerator
                  columns={[
                    {
                      name: "firstName",
                      label: () => "Nome do Cliente",
                    },
                    {
                      name: "email",
                      label: () => "E-mail",
                    },
                    {
                      name: "requestDate",
                      label: () => "Data do Pedido",
                    },
                    {
                      name: "total",
                      label: () => "Total",
                    },
                  ]}
                  items={
                    pendingMusics.query.data?.data?.map((request) => ({
                      firstName: `${request.data.name}`,
                      email: `${request.data?.email}`,
                      requestDate: `${new Date(
                        request.created_at
                      ).toLocaleDateString()}`,
                      total: `${toBRL(request.data.price?.total || 0)}`,
                    })) ?? []
                  }
                />
              </AdminCardLg>
            </Col>
          </Content>
        </Col>
      </OnlyUserRole>
    </CommonMasterPage>
  );
};

export default HomeAdminPage;
