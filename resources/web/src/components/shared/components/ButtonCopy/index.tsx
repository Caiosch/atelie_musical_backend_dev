import { IconButton, useClipboard } from "@chakra-ui/react";
import React from "react";
import { AiOutlineCheck, AiOutlineCopy } from "react-icons/ai";

const ButtonCopy: React.FC<{ value: string }> = ({ value }) => {
  const { onCopy, hasCopied } = useClipboard(value || "");

  return (
    <>
      <IconButton
        aria-label="Copiar"
        pos={"absolute"}
        right={2}
        size={"xs"}
        opacity={hasCopied ? 1 : 0}
        onClick={onCopy}
        colorScheme={hasCopied ? "green" : "gray"}
        variant={hasCopied ? "ghost" : "solid"}
        _groupHover={{ opacity: 1 }}
      >
        {hasCopied ? <AiOutlineCheck /> : <AiOutlineCopy />}
      </IconButton>
    </>
  );
};

export default ButtonCopy;
