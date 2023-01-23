import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function usePredefinedArtist() {
  const [currentArtist, setCurrentArtist] = useState<number>();
  const navigate = useNavigate();

  useEffect(() => {
    const artistId = localStorage.getItem("atelie:artist");
    if (artistId) {
      setCurrentArtist(() => Number(artistId));
    }
  }, []);

  const setArtist = (artistId: number, redirect = true) => {
    localStorage.setItem("atelie:artist", String(artistId));
    redirect && navigate("/music/request");
  };

  const remove = () => {
    localStorage.removeItem("atelie:artist");
  };

  return {
    currentArtist,
    set: setArtist,
    remove,
  };
}
