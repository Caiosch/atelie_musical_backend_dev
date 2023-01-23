declare namespace React {
  export type NextFC<T = {}> = React.FunctionComponent<
    { children?: React.ReactNode } & T
  >;
}
