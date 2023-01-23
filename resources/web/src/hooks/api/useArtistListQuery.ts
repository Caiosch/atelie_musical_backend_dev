import { apiClient } from "@/services/clients/api";
import { useState, useMemo } from "react";
import { useQuery } from "react-query";
import { usePagination } from "../usePagination";
import { useSettingsQuery } from "./useSettingsQuery";

export type ArtistFilter = ReturnType<typeof useArtistListQuery>;

export function useArtistListQuery(limit = 99999) {
  const { musicalStyles = [] } = useSettingsQuery();
  const pagination = usePagination(1, 1);
  const query = useQuery(
    `app.artists.${pagination.current}.${limit}`,
    async () => {
      const data = await apiClient
        .getArtists({
          page: pagination.current,
          limit,
        })
        .then((res) => res.body);

      pagination.setLastPage(() => data.meta.last_page);

      return data;
    }
  );

  const [musicalStylesFilter, setMusicalStyles] = useState<any[]>([]);
  const [musicVoicesFilter, setMusicVoices] = useState<any[]>([]);

  const nextArtists = useMemo(() => {
    const artists = query;
    if (!artists.data?.data) return [];

    let nextArtists = [...artists.data.data];

    if (musicalStylesFilter.length <= 0 && musicVoicesFilter.length <= 0)
      return nextArtists;

    if (musicalStylesFilter.length > 0) {
      nextArtists = nextArtists.filter(
        (a) =>
          !!musicalStylesFilter?.find((key) =>
            a.data?.musicalStyles?.includes(key)
          )
      );
    }

    if (musicVoicesFilter.length > 0) {
      nextArtists = nextArtists.filter(
        (a) => a.voice_gender === musicVoicesFilter[0]
      );
    }

    return nextArtists;
  }, [musicalStylesFilter, musicVoicesFilter, query?.data, musicalStyles]);

  return {
    query,
    pagination,
    setMusicalStyles,
    setMusicVoices,
    nextArtists,
    musicalStylesFilter,
    musicVoicesFilter,
    musicalStyles,
  };
}
