import React from "react";
import { NavButton } from "./NavButton";

export interface NavbarButtonProps extends NavButton {
  subLinks?: NavButton[];
}

export interface NavButton {
  label: React.ReactNode;
  to: string;
  icon?: React.ReactNode;
  exact?: boolean;
  onClick?: () => void;
  isHidden?: boolean;
}

export interface NavbarButtonRenderProps extends NavbarButtonProps {
  isActive: boolean;
}

export interface BoxNavProps {
  buttons: NavbarButtonProps[];
  render?: (props: NavbarButtonRenderProps) => React.ReactNode;
}

export const BoxNav: React.FC<BoxNavProps> = ({ buttons, render }) => {
  return (
    <>
      {buttons
        .filter((b) => !b.isHidden)
        .map((button, keyButton) => (
          <NavButton {...button} render={render} key={`button${keyButton}`} />
        ))}
    </>
  );
};
