import { useToast } from "@chakra-ui/react";

export function useValidatorHelper() {
  const toast = useToast({
    position: "bottom-right",
    variant: "left-accent",
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
    showErrors,
  };
}
