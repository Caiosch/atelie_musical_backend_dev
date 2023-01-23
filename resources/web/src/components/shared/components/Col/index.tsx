import { Box, BoxProps } from "@chakra-ui/react";

export const Col: React.FC<BoxProps> = (props) => {
  return <Box display="flex" flexDir={"column"} {...props} />;
};
