import { apiClient } from "@/services/clients/api";
import { useQuery } from "react-query";
import { usePagination } from "../usePagination";

export function useRequestMusicListQuery(limit = 20, params: any = {}) {
  const pagination = usePagination(1, 1);
  const query = useQuery(
    `app.requests.${pagination.current}.${limit}.${JSON.stringify(params)}`,
    async () => {
      const data = await apiClient
        .getRequests({
          page: pagination.current,
          limit,
          ...params,
        })
        .then((res) => res.body);

      pagination.setLastPage(() => data.meta.last_page);

      return data;
    }
  );

  return {
    query,
    pagination,
  };
}
