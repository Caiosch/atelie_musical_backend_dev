import OnlyUserRole from "@/components/layout/shared/OnlyUserRole";
import UserRoute from "@/components/modules/permissions/UserRoute";
import AddArtistAdminPage from "@/pages/admin/AddArtistAdminPage";
import HomeAdminPage from "@/pages/admin/HomeAdminPage";
import ShowRequestMusicAdminPage from "@/pages/admin/ShowRequestMusicAdminPage";
import ShowUserAdminPage from "@/pages/admin/ShowUserAdminPage";
import ArtistPage from "@/pages/common/ArtistPage";
import ArtistsPage from "@/pages/common/ArtistsPage";
import CheckoutPage from "@/pages/common/CheckoutPage";
import HomePage from "@/pages/common/HomePage";
import MusicPage from "@/pages/common/MusicPage";
import MusicsPage from "@/pages/common/MusicsPage";
import RequestMusicPage from "@/pages/common/RequestMusicPage";
import ResetPasswordPage from "@/pages/common/ResetPasswordPage";
import HomeUserPage from "@/pages/user/HomeUserPage";
import ShowRequestMusicUserPage from "@/pages/user/ShowRequestMusicUserPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

const CommonRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/artists"} element={<ArtistsPage />} />
        <Route path={"/artist/:artistId"} element={<ArtistPage />} />
        <Route path={"/music/request"} element={<RequestMusicPage />} />
        <Route path={"/musics"} element={<MusicsPage />} />
        <Route path={"/music/:musicId"} element={<MusicPage />} />
        <Route
          path={"/reset-password/:token"}
          element={<ResetPasswordPage />}
        />
        <Route
          path={"/request/:requestId/checkout"}
          element={<CheckoutPage />}
        />
        <Route path={"/checkout"} element={<CheckoutPage />} />
        <Route
          path={`/accpanel`}
          element={
            <OnlyUserRole role={"user"} redirect={"/"}>
              <HomeUserPage />
            </OnlyUserRole>
          }
        />
        <Route
          path={`/accpanel/request/:requestId`}
          element={
            <OnlyUserRole role={"user"} redirect={"/"}>
              <ShowRequestMusicUserPage />
            </OnlyUserRole>
          }
        />
        <Route
          path={"/admin"}
          element={
            <OnlyUserRole role={"admin"} redirect={"/"}>
              <HomeAdminPage />
            </OnlyUserRole>
          }
        />
        <Route
          path={"/admin/artists/new"}
          element={
            <OnlyUserRole role={"admin"} redirect={"/"}>
              <AddArtistAdminPage />
            </OnlyUserRole>
          }
        />
        <Route
          path={"/admin/users/:userId"}
          element={
            <OnlyUserRole role={"admin"} redirect={"/"}>
              <ShowUserAdminPage />
            </OnlyUserRole>
          }
        />
        <Route
          path={"/admin/requests/:requestId"}
          element={
            <OnlyUserRole role={"admin"} redirect={"/"}>
              <ShowRequestMusicAdminPage />
            </OnlyUserRole>
          }
        />
      </Routes>
    </>
  );
};

export default CommonRoutes;
