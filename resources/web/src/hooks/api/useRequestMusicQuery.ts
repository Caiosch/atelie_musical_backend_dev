import { apiClient } from "@/services/clients/api";
import { useQuery } from "react-query";

export function useRequestMusicQuery(requestId: string | number) {
  const query = useQuery(`app.request.${requestId}`, () => {
    return apiClient.findRequestMusic(requestId);
  });

  return query;
}
