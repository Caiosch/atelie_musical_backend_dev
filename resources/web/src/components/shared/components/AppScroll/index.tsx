import React, { useEffect, useRef } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface AppScrollProps extends BoxProps {
  bgTransparent?: boolean;
  isMini?: boolean;
  saveAs?: string;
}

const history: Record<
  string,
  {
    scrollTop?: number;
  }
> = {};

export const AppScroll: React.FC<AppScrollProps> = ({
  children,
  bgTransparent,
  isMini,
  saveAs,
  ...rest
}) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const transparentize = (color: string) => {
    return bgTransparent ? "transparent" : color;
  };

  const mini = (size: any) => {
    return isMini ? 1 : size;
  };

  useEffect(() => {
    let timer = setTimeout(() => {}, 0);
    const saveScroll = (saveAs: string) => {
      const scrollTop = boxRef.current?.scrollTop;

      if (!history?.[saveAs]) {
        history[saveAs] = {};
      }

      history[saveAs].scrollTop = Number(scrollTop || 0);

      // console.log("Save", saveAs, history[saveAs].scrollTop);
    };

    const loadScroll = (saveAs: string) => {
      if (history[saveAs]) {
        const scrollTop = history[saveAs].scrollTop;
        // console.log("Load", saveAs, scrollTop);
        boxRef.current?.scroll({
          top: scrollTop,
        });
      }
    };

    if (saveAs) {
      const historyFind = history?.[saveAs];

      if (!historyFind) {
        saveScroll(saveAs);
      } else {
        loadScroll(saveAs);
      }

      boxRef.current?.addEventListener("scroll", (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          saveScroll(saveAs);
        }, 100);
      });
    }
  }, [saveAs]);

  return (
    <Box
      w="100%"
      h="100%"
      pos="absolute"
      overflowY="auto"
      ref={boxRef}
      sx={{
        "&::-webkit-scrollbar": {
          width: mini(3),
          height: mini(3),
          bg: transparentize("gray.100"),
        },
        "&::-webkit-scrollbar-track": {
          width: 4,
        },
        "&::-webkit-scrollbar-thumb": {
          background: "gray.300",
          border: "4px solid transparent",
          borderColor: "gray.100",
          rounded: "xl",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "gray.400",
        },
        _dark: {
          "&::-webkit-scrollbar": {
            bg: transparentize("gray.800"),
          },
          "&::-webkit-scrollbar-thumb": {
            background: "gray.600",
            borderColor: transparentize("gray.800"),
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "gray.400",
          },
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
