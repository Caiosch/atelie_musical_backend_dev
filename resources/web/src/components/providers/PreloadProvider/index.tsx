import { useSettingsQuery } from "@/hooks/api/useSettingsQuery";
import React from "react";

const PreloadProvider: React.FC<{ children?: React.ReactNode }> = () => {
  useSettingsQuery();

  return <></>;
};

export default PreloadProvider;
