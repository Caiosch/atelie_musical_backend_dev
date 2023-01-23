import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { NavbarButtonProps, NavbarButtonRenderProps } from "..";
import { NavButtonRender } from "./NavButtonRender";

interface NavButtonProps extends NavbarButtonProps {
  render?: (props: NavbarButtonRenderProps) => React.ReactNode;
}

export const NavButton: React.FC<NavButtonProps> = ({ render, ...props }) => {
  const { pathname, ...rest } = useLocation();
  const isActive = useMemo(() => {
    const nextPathname = `${pathname}${rest.hash}`;

    if (props.exact) {
      return nextPathname === props.to;
    } else {
      return nextPathname.startsWith(props.to);
    }
  }, [pathname, props.exact, rest]);

  const Component = render
    ? render({ ...props, isActive })
    : NavButtonRender({ ...props, isActive });

  return <>{Component}</>;
};
