import { usePredefinedArtist } from "@/hooks/helpers/usePredefinedArtist";
import React from "react";
import { Col } from "../../components";

const PredefineArtistAndRequest: React.FC<{
  artistId: number;
  children?: React.ReactNode;
}> = ({ artistId, children }) => {
  const { set } = usePredefinedArtist();

  return (
    <Col
      onClick={() => {
        set(artistId, true);
      }}
    >
      {children}
    </Col>
  );
};

export default PredefineArtistAndRequest;
