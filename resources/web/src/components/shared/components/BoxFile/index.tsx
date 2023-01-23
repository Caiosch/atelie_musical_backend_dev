import { Box, BoxProps, Input } from "@chakra-ui/react";
import React, { ChangeEvent, useRef } from "react";

interface BoxFileProps extends Omit<BoxProps, "onChange"> {
  onChange: (files: File[]) => void;
}

export const BoxFile: React.NextFC<BoxFileProps> = ({
  onChange,
  children,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Input
        type={"file"}
        ref={inputRef}
        display={"none"}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const files = Array.from(e.target.files || []);
          onChange(files);
        }}
      />
      <Box
        onClick={() => {
          inputRef.current?.click();
        }}
        {...rest}
      >
        {children}
      </Box>
    </>
  );
};
