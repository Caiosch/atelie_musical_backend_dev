import { apiClient } from "@/services/clients/api";
import { useQuery } from "react-query";

export function useSettingsQuery() {
  const query = useQuery("app.settings", () => {
    return apiClient.getSettings().then((res) => res.body);
  });

  const occasions = query.data?.data?.tags?.filter((t) => t.type === "occasion");
  const projects = query.data?.data?.tags?.filter((t) => t.type === "project");
  const sentiments = query.data?.data?.tags?.filter(
    (t) => t.type === "sentiment"
  );
  const musicalStyles = query.data?.data?.tags?.filter(
    (t) => t.type === "musicalStyle"
  );

  const findOccasion = (name: string) => {
    return occasions?.find((o) => o.key === name);
  };

  const filterSentiments = (names: string[]) => {
    return (
      sentiments?.filter((sentiment) => names.includes(sentiment.key)) ?? []
    );
  };

  return {
    ...query,
    occasions,
    projects,
    sentiments,
    musicalStyles,
    findOccasion,
    filterSentiments,
  };
}
