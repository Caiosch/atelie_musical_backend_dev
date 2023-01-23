import { Box, BoxProps } from "@chakra-ui/react";

export const Row: React.FC<BoxProps> = (props) => {
  return <Box display="flex" flexDir={"row"} {...props} />;
};
