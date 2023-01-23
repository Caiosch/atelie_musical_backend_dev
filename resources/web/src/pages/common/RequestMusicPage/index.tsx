import CommonMasterPage from "@/components/layout/pages/common/CommonMasterPage";
import FooterPage from "@/components/layout/pages/common/FooterPage";
import ScrollCheckpointNavigator from "@/components/layout/shared/ScrollCheckpointNavigator";
import RequestMusicPageForm from "@/components/modules/request/RequestMusicPageForm";
import { usePredefinedArtist } from "@/hooks/helpers/usePredefinedArtist";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  FaCheck,
  FaEdit,
  FaGift,
  FaHeart,
  FaMicrophone,
  FaMusic,
  FaStar,
  FaUser,
} from "react-icons/fa";

const RequestMusicPage: React.FC = () => {
  const form = useForm({
    defaultValues: {
      data: {
        choiceArtist: false,
      },
    },
  });

  const { currentArtist, remove } = usePredefinedArtist();

  useEffect(() => {
    if (currentArtist) {
      form.setValue("data", {
        choiceArtist: true,
        // @ts-ignore
        artistId: `${currentArtist}`,
      });

      remove();
    }
  }, [currentArtist]);

  return (
    <CommonMasterPage>
      <FormProvider {...form}>
        <RequestMusicPageForm />
      </FormProvider>
      <ScrollCheckpointNavigator
        items={[
          { icon: <FaUser />, queryElement: "#form-user" },
          { icon: <FaGift />, queryElement: "#form-gifted" },
          { icon: <FaHeart />, queryElement: "#form-love" },
          { icon: <FaEdit />, queryElement: "#form-pencil" },
          { icon: <FaMicrophone />, queryElement: "#form-artists" },
          { icon: <FaMusic />, queryElement: "#form-music" },
          { icon: <FaStar />, queryElement: "#form-additionals" },
          { icon: <FaCheck />, queryElement: "#form-finish" },
        ]}
      />
      <FooterPage isInverted />
    </CommonMasterPage>
  );
};

export default RequestMusicPage;
