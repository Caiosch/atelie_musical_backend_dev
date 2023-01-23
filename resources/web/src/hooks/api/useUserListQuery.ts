import { apiClient } from "@/services/clients/api";
import { useQuery } from "react-query";
import { usePagination } from "../usePagination";

export function useUserListQuery(limit = 20) {
  const pagination = usePagination(1, 1);
  const query = useQuery(
    `app.users.${pagination.current}.${limit}`,
    async () => {
      const data = await apiClient
        .getUsers({
          page: pagination.current,
          limit,
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
