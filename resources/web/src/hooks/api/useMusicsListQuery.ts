import { apiClient } from "@/services/clients/api";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { usePagination } from "../usePagination";
import { useSettingsQuery } from "./useSettingsQuery";

export type MusicFilter = ReturnType<typeof useMusicsListQuery>;

export function useMusicsListQuery(limit = 100000, filter: any = {}) {
  const {
    musicalStyles = [],
    sentiments = [],
    ocasions = [],
  } = useSettingsQuery();
  const pagination = usePagination(1, 1);
  const query = useQuery(
    `app.musics.${pagination.current}.${limit}.${JSON.stringify(filter)}`,
    async () => {
      const data = await apiClient
        .getMusics({
          page: pagination.current,
          limit,
          ...filter,
        })
        .then((res) => res.body);

      pagination.setLastPage(() => data.meta.last_page);

      return data;
    }
  );

  const [musicalStylesFilter, setMusicalStyles] = useState<any[]>([]);
  const [musicalOcasionsFilter, setMusicalOcasions] = useState<any[]>([]);
  const [musicVoicesFilter, setMusicVoices] = useState<any[]>([]);

  const nextMusics = useMemo(() => {
    let nextMusics = query.data?.data ? [...query.data?.data] : [];

    if (
      musicalOcasionsFilter.length <= 0 &&
      musicalStylesFilter.length <= 0 &&
      musicVoicesFilter.length <= 0
    ) {
      return nextMusics;
    }

    if (musicalOcasionsFilter.length > 0) {
      nextMusics = nextMusics.filter((music) => {
        return !!musicalOcasionsFilter.includes(music.ocasion);
      });
    }

    if (musicalStylesFilter.length > 0) {
      nextMusics = nextMusics.filter((m) => {
        return !!musicalStylesFilter.find((key) => {
          return m.artist.data?.musicalStyles?.includes(key);
        });
      });
    }

    if (musicVoicesFilter.length > 0) {
      nextMusics = nextMusics.filter((m) => {
        return m.artist.voice_gender === musicVoicesFilter[0];
      });
    }

    return nextMusics;
  }, [
    musicalStylesFilter,
    musicalStyles,
    ocasions,
    musicalOcasionsFilter,
    query,
  ]);

  return {
    query,
    pagination,
    musicalStylesFilter,
    musicVoicesFilter,
    musicalOcasionsFilter,
    musicalStyles,
    sentiments,
    ocasions,
    nextMusics,
    setMusicalStyles,
    setMusicalOcasions,
    setMusicVoices,
  };
}
