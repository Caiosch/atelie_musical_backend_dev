import { useToast } from "@chakra-ui/react";

export function useAppToast() {
  const toast = useToast({
    position: "bottom-right",
    isClosable: true,
  });

  const showErrors = (texts: [string, string][]) => {
    for (const [title, description] of texts) {
      toast({
        status: "error",
        title,
        description,
      });
    }
  };

  return {
    toast,
    catchError: (title: string, err: any) => {
      toast({
        title,
        description: err?.message ?? `Tente Novamente mais tarde...`,
      });
    },
    showErrors,
  };
}
