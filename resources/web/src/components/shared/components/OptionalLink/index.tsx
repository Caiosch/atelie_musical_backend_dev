import React from "react";
import { Link, LinkProps } from "react-router-dom";

interface OptionalLinkProps extends Partial<LinkProps> {}

export const OptionalLink: React.FC<OptionalLinkProps> = ({
  children,
  to,
  ...rest
}) => {
  if (to) {
    return (
      <Link to={to} {...rest}>
        {children}
      </Link>
    );
  }

  return <>{children}</>;
};
