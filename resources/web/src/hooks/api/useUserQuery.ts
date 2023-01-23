import { apiClient } from "@/services/clients/api";
import { useQuery } from "react-query";

export function useUserQuery(userId: string | number) {
  const query = useQuery(`app.user.${userId}`, () => {
    return apiClient.findUser(userId);
  });

  return query;
}
