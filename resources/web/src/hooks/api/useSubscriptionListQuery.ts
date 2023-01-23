import { apiClient } from "@/services/clients/api";
import { useQuery } from "react-query";
import { usePagination } from "../usePagination";

export function useSubscriptionListQuery(limit = 20) {
  const pagination = usePagination(1, 1);
  const query = useQuery(
    `app.subscription.${pagination.current}.${limit}`,
    async () => {
      const data = await apiClient
        .getSubscriptions({
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
