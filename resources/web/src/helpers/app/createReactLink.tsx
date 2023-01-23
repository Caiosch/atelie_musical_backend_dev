import { Link, LinkProps } from "react-router-dom";

type DefaultProps = LinkProps &
  React.RefAttributes<HTMLAnchorElement> & {
    children?: React.ReactNode;
  };

export const createReactLink = <
  T extends Partial<DefaultProps> = Partial<DefaultProps>
>(
  next: (props: T) => string
): ((props: T & Partial<LinkProps>) => JSX.Element) => {
  const Element = (props: T) => {
    return (
      <Link style={{ maxWidth: "100%" }} to={next(props)} {...props}>
        {props.children}
      </Link>
    );
  };

  return Element;
};
