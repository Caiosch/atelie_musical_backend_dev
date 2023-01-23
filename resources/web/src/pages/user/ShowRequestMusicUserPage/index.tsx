import AuthRequestMusicMasterPage from "@/components/layout/pages/auth/AuthRequestMusicMasterPage";
import { useRequestMusicQuery } from "@/hooks/api/useRequestMusicQuery";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MusicFinish from "./src/MusicFinish";
import WaitingImages from "./src/WaitingImages";
import WaitingPayment from "./src/WaitingPayment";
import WaitingProduction from "./src/WaitingProduction";

const ShowRequestMusicUserPage: React.FC = () => {
  const { requestId } = useParams();
  const { data: requestMusic, refetch } = useRequestMusicQuery(requestId!);
  if (!requestMusic) return <></>;

  return (
    <AuthRequestMusicMasterPage requestMusic={requestMusic}>
      {/*
        Compondo
        Gravando
        Editando
        Publicando
      */}
      {requestMusic.status === "waiting_payment" && (
        <WaitingPayment requestMusic={requestMusic} onPay={refetch} />
      )}
      {requestMusic.status === "waiting_images" && (
        <WaitingImages requestMusic={requestMusic} />
      )}
      {requestMusic.status === "waiting_production" && (
        <WaitingProduction requestMusic={requestMusic} />
      )}
      {requestMusic.status === "finished" && (
        <MusicFinish requestMusic={requestMusic} />
      )}
      {/* <WaitingPayment />
      <WaitingImages />
      <WaitingProduction /> */}
      {/* <MusicFinish /> */}
    </AuthRequestMusicMasterPage>
  );
};

export default ShowRequestMusicUserPage;
