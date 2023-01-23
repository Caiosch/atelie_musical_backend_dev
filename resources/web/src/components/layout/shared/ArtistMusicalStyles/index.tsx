import { useSettingsQuery } from "@/hooks/api/useSettingsQuery";
import { ApiApp } from "@/services/api/api.app";
import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";
import BadgeMusicStyle from "../BadgeMusicStyle";

interface ArtistMusicalStylesProps extends BoxProps {
  artist: ApiApp.Entities.Artist;
  _badge?: BoxProps;
}

const ArtistMusicalStyles: React.FC<ArtistMusicalStylesProps> = ({
  artist,
  _badge,
  ...rest
}) => {
  const { musicalStyles = [] } = useSettingsQuery();

  if (!artist.data?.musicalStyles || artist.data.musicalStyles.length <= 0)
    return <></>;

  return (
    <Box textAlign={"center"} {...rest}>
      {artist.data.musicalStyles.map((v, keyV) => {
        const musicalStyle = musicalStyles.find((m) => m.key === v);
        return (
          <BadgeMusicStyle
            // _odd={{
            //   bg: "primary.800",
            //   color: "primary.50",
            //   borderColor: "primary.900",
            // }}
            // _even={{
            //   bg: "primary.50",
            //   color: "primary.800",
            //   borderColor: "primary.800",
            // }}
            key={`item${keyV}`}
            bg={musicalStyle?.bg}
            color={musicalStyle?.color ?? "primary.100"}
            border={"2px solid transparent"}
            mr={2}
            mb={2}
            {..._badge}
          >
            {musicalStyle?.value}
          </BadgeMusicStyle>
        );
      })}
    </Box>
  );
};

export default ArtistMusicalStyles;
