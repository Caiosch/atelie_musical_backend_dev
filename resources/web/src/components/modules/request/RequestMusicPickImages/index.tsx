import { Col, Row } from "@/components/shared";
import CtrlFormMediaPicker, {
  FormMedia,
  useMediaPicker,
} from "@/components/shared/ctrl-forms/CtrlFormMediaPicker";
import React, { useState } from "react";
import { useStateList } from "react-use";
import { useList } from "react-use";

const RequestMusicPickImages: React.FC = () => {
  const { props } = useMediaPicker();

  return <></>;
};

export default RequestMusicPickImages;
