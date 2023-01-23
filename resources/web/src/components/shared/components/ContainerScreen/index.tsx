import { Box, BoxProps } from "@chakra-ui/react";

export const ContainerScreen: React.FC<BoxProps> = (props) => {
  return (
    <Box
      display="flex"
      flexDir={"row"}
      w={"100vw"}
      h={"100vh"}
      pos={"relative"}
      {...props}
    />
  );
};
