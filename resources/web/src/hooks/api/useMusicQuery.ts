import { apiClient } from "@/services/clients/api";
import { useQuery } from "react-query";

export function useMusicQuery(musicId: string | number) {
  const query = useQuery(`app.music.${musicId}`, () => {
    return apiClient.findMusic(musicId);
  });

  return query;
}
