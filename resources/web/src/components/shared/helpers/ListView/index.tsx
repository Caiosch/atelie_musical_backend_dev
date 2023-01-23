import React from "react";

interface ListViewProps<T> {
  items: T[];
  render: (props: T, index: number) => React.ReactNode;
}

export function ListView<T>(props: ListViewProps<T>) {
  return (
    <>
      {props.items.map((i, keyI) => (
        <React.Fragment key={`item${keyI}`}>
          {props.render(i, keyI)}
        </React.Fragment>
      ))}
    </>
  );
}
