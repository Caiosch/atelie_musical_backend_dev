import React from "react";
import { theme } from "@/configs";
import { ChakraProvider } from "@chakra-ui/react";

export const ThemeProvider: React.NextFC = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
