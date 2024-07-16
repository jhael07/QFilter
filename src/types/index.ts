import { ReactNode } from "react";
import { Join } from "../lib/types";

type QFilterOption = {
  label: string | number;
  value: string | number | readonly string[] | undefined;
};

type FilterColumnProps = {
  title: string;
  value: string | ReactNode;
  type?: "input" | "select" | "action";
  options?: Array<QFilterOption>;
};

type QFilterColumn<T> = {
  label: string;
  dataIndex: Join<T>;
  type: "number" | "string" | "boolean" | "date";
  selectMultiple?: boolean;
  options?: Array<QFilterOption>;
  renderComponent?: (column: QFilterColumn<T>) => ReactNode;
};

type QfilterComponentProps<T> = {
  columns: Array<QFilterColumn<T>>;
};

export {
  type FilterColumnProps,
  type QFilterOption,
  type QFilterColumn,
  type QfilterComponentProps,
};
