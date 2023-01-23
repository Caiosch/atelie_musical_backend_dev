import BadgeSelect from "@/components/layout/shared/BadgeSelect";
import { useAuth } from "@/components/providers/AuthProvider";
import { apiClient } from "@/services/clients/api";
import { BadgeProps, FormLabelProps, useBoolean } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePrice } from "./usePrice";

export function useMusicRequestSubmit() {
  const requestMusicForm = useFormContext();
  const requestMusicFormData = requestMusicForm.watch();
  const { price } = usePrice(requestMusicFormData);
  const [isLoading, loading] = useBoolean();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const isOcasion = (...ocasions: string[]) => {
    return ocasions.includes(requestMusicFormData.data?.ocasions || "");
  };

  const onSubmit = () => {
    loading.on();
    apiClient
      .requestMusic({
        ...requestMusicFormData.data,
        price,
      })
      .then((res) => {
        navigate(`/request/${res.body.data.request.id}/checkout`);
        const id = res.body.data.request.id;
        if (!isAuth) {
          localStorage.setItem("meubemquere:musicId", `${id}`);
        }
      })
      .finally(() => {
        loading.off();
      });
  };

  const BadgeOptions = (
    options: any[],
    key: string,
    inverted: boolean = false,
    isMultiple = true,
    _additionals: any = {}
  ) => {
    return (
      <BadgeSelect
        items={options}
        isInverted={inverted}
        value={
          isMultiple
            ? requestMusicFormData.data?.[key] || []
            : [requestMusicFormData.data?.[key]]
        }
        onChange={(nextOptions) => {
          if (isMultiple) {
            requestMusicForm.setValue(`data.${key}`, nextOptions);
          } else {
            requestMusicForm.setValue(`data.${key}`, nextOptions.pop());
          }
        }}
        {..._additionals}
      />
    );
  };

  return {
    requestMusicForm,
    requestMusicFormData,
    price,
    isLoading,
    onSubmit,
    BadgeOptions,
    isOcasion,
  };
}
