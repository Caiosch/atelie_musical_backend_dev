import { apiClient } from "@/services/clients/api";
import { useQuery } from "react-query";

export function useArtistQuery(artistId: string | number) {
  const query = useQuery(`app.artist.${artistId}`, () => {
    return apiClient.findArtist(artistId);
  });

  return query;
}
