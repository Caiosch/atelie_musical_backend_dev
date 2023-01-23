import CtrlFormSelectBase, {
  CtrlFormSelectBaseContract,
} from "@/components/shared/ctrl-forms/CtrlFormSelectBase";
import { BadgeProps, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import BadgeMusicStyle from "../BadgeMusicStyle";

interface BadgeSelectProps
  extends CtrlFormSelectBaseContract<{
    value: string;
    label: string;
  }> {
  isInverted?: boolean;
  _badge?: BadgeProps;
  _selected?: {
    border?: string;
    bg?: string;
    color?: string;
  };
  _unselected?: {
    border?: string;
    bg?: string;
    color?: string;
  };
}

const BadgeSelect: React.FC<BadgeSelectProps> = ({
  items,
  value,
  isInverted: inverted,
  onChange,
  _badge,
  _selected,
  _unselected,
}) => {
  return (
    <CtrlFormSelectBase
      items={items.map((item) => ({
        value: item.value,
        label: ({ isSelected, index, toggle }) => {
          const bg = useMemo(() => {
            if (inverted) {
              return isSelected
                ? _selected?.bg ?? "gray.800"
                : _unselected?.bg ?? "transparent";
            }

            return isSelected
              ? _selected?.bg ?? "primary.500"
              : _unselected?.bg ?? "transparent";
          }, [isSelected, inverted, _selected, _unselected]);

          const borderColor = useMemo(() => {
            if (inverted) {
              return isSelected
                ? _selected?.border ?? "darken.300"
                : _unselected?.border ?? "darken.300";
            }

            return isSelected
              ? _selected?.border ?? "transparent"
              : _unselected?.border ?? "lighten.200";
          }, [isSelected, inverted, _selected, _unselected]);

          const color = useMemo(() => {
            if (inverted) {
              return isSelected
                ? _selected?.color ?? "primary.500"
                : _unselected?.color ?? "primary.700";
            }

            return isSelected
              ? _selected?.color ?? "white"
              : _unselected?.color ?? "primary.100";
          }, [isSelected, inverted, _selected, _unselected]);

          return (
            <BadgeMusicStyle
              my={2}
              key={`item${index}`}
              mr={2}
              fontSize={"md"}
              border={"1px solid transparent"}
              borderColor={borderColor}
              bg={bg}
              fontFamily={"heading"}
              px={4}
              textAlign={"center"}
              color={color}
              cursor={"pointer"}
              userSelect={"none"}
              onClick={toggle}
              display={"inline-block"}
              textTransform={"uppercase"}
              maxW={"100%"}
              {..._badge}
            >
              <Text as={"span"}>{item.label}</Text>
            </BadgeMusicStyle>
          );
        },
      }))}
      onChange={onChange}
      value={value}
    ></CtrlFormSelectBase>
  );
};

export default BadgeSelect;
