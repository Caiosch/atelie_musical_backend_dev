import {
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuGroup,
  MenuItem,
  MenuItemProps,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { Col } from "../Col";
import { OptionalLink } from "../OptionalLink";

interface SimpleMenuProps extends MenuButtonProps {
  groups: Array<{
    title: string;
    items: Array<MenuItem>;
  }>;
  leftIcon?: React.ReactNode;
}

interface MenuItem extends MenuItemProps {
  label: (props: { groupIndex: number }) => React.ReactNode;
  to?: string;
  isHidden?: boolean;
}

export const SimpleMenu: React.NextFC<SimpleMenuProps> = ({
  groups,
  ...rest
}) => {
  return (
    <>
      <Menu>
        <MenuButton {...rest} />
        <MenuList
          border={1}
          borderStyle={"solid"}
          rounded={"md"}
          shadow={"xl"}
          borderColor={"gray.300"}
          _dark={{ borderColor: "gray.600" }}
        >
          {groups.map((g, groupIndex) => (
            <MenuGroup key={`group${groupIndex}`} title={g.title}>
              {g.items
                .filter((i) => !i.isHidden)
                .map(({ label, to, ...restItem }, itemIndex) => (
                  <OptionalLink key={`item${itemIndex}${groupIndex}`} to={to}>
                    <Col px={4}>
                      <MenuItem rounded={"sm"} {...restItem}>
                        {label({ groupIndex })}
                      </MenuItem>
                    </Col>
                  </OptionalLink>
                ))}
            </MenuGroup>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};
