import {
  appConfig,
  durationsConfig,
  musicRequestExtrasConfig,
  MusicRequestNames,
  songTypesConfig,
} from "@/configs/app";
import { toBRL } from "@/helpers/currency/toBRL";
import { useMemo } from "react";

export function usePrice(requestMusicFormData: any = {}) {
  const price = useMemo(() => {
    const data = requestMusicFormData.data || {};
    // @ts-ignore
    const songType = songTypesConfig.configs[data.songType];
    // @ts-ignore
    const duration = durationsConfig.configs[data.duration];

    const songTypeLabel = `${songType?.label || "Música"}`;
    const durationLabel = `${duration?.label || "Tempo"}`;
    // @ts-ignore
    const musicLabel = `${songTypeLabel} (${durationLabel})`;
    const extras: any[] = [];
    const deadlines: any[] = [];
    const basePrice =
      appConfig.BASE_PRICE + (songType?.price || 0) + (duration?.price || 0);

    let total = basePrice;
    let totalDeadline = appConfig.BASE_DAYS;

    for (const dataExtra of data.extras || []) {
      const requestConfigData: any =
        // @ts-ignore
        musicRequestExtrasConfig.configs[dataExtra];
      totalDeadline = totalDeadline + requestConfigData.plusDeadline;
      total = total + requestConfigData.price;
      extras.push({
        label: requestConfigData.label,
        price: toBRL(requestConfigData.price),
      });
    }

    for (const dataExtra of data.extras || []) {
      const requestConfigData: any =
        // @ts-ignore
        musicRequestExtrasConfig.configs[dataExtra];

      deadlines.push({
        label: `${requestConfigData.label}`,
        price: `${
          dataExtra === MusicRequestNames.MusicPlatform
            ? totalDeadline
            : `+ ${requestConfigData.plusDeadline}`
        } dias úteis`,
      });
    }

    if (data.deliveryType === "express") {
      total += appConfig.EXPRESS_PRICE;
    }

    const priceDisplay = [
      {
        label: "Música",
        values: [{ label: musicLabel }],
        price: toBRL(basePrice),
      },
      {
        label: "Extras",
        values: extras,
      },
      {
        label: "Prazo",
        values: deadlines,
      },
      {
        label: "Total",
        price: `${toBRL(total)}`,
        description: `Ou 4x de ${toBRL(total / 4)}`,
      },
    ];

    const priceData = {
      total,
      totalDeadline,
      display: priceDisplay,
    };

    return priceData;
  }, [requestMusicFormData]);

  return { price };
}
