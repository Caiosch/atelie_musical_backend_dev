import React from "react";

type LabelProps = {
  item: Item;
  index: number;
  isSelected: boolean;
  toggle: () => void;
  select: () => void;
  selectAll: () => void;
  unselect: () => void;
  unselectAll: () => void;
};
type LabelFn = (props: LabelProps) => React.ReactNode;

interface Item {
  label?: string | LabelFn;
  value: string;
  metadata?: any;
}

export interface CtrlFormSelectBaseProps {
  items: Item[];
  value: string[];
  onChange: (value: string[]) => void;
  render?: LabelFn;
}

export interface CtrlFormSelectBaseContract<T>
  extends Omit<CtrlFormSelectBaseProps, "items"> {
  items: T[];
}

const CtrlFormSelectBase: React.FC<CtrlFormSelectBaseProps> = ({
  items,
  value,
  onChange: onChangeParam,
  render,
}) => {
  const isSelected = (nextValue: string) => {
    return value.find((v) => v === nextValue) !== undefined;
  };

  const onChange = (nextValue: string) => {
    if (isSelected(nextValue)) {
      remove(nextValue);
    } else {
      select(nextValue);
    }
  };

  const select = (nextValue: string) => {
    onChangeParam([...value, nextValue]);
  };

  const remove = (nextValue: string) => {
    onChangeParam(value.filter((v) => v !== nextValue));
  };

  return (
    <>
      {items.map((i, keyI) => {
        const props = {
          item: i,
          isSelected: isSelected(i.value),
          toggle: () => {
            onChange(i.value);
          },
          select: () => {
            select(i.value);
          },
          unselect: () => {
            remove(i.value);
          },
          index: keyI,
          unselectAll: () => {
            onChangeParam([]);
          },
          selectAll: () => {
            onChangeParam(items.map((i) => i.value));
          },
        };

        return (
          <React.Fragment key={`item${keyI}`}>
            {render && render(props)}
            {!render &&
              (typeof i.label === "string" ? i.label : i.label?.(props))}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default CtrlFormSelectBase;
