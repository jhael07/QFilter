/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { FilterOperator, Join } from "../lib/types";
import QFilterBuilder from "../lib";

type QFilterOption<T> = { label: string | number; value: Join<T> };

type FilterColumnProps<T> = {
  title: string;
  value: string | ReactNode;
  QFilter: QFilterBuilder<T>;
  item?: FilterOperator<T>;
  type?: "input" | "select" | "action";
  options?: Array<QFilterOption<T>>;
};

type QFilterColumn<T> = {
  label: string;
  dataIndex: Join<T>;
  type: "number" | "string" | "boolean" | "date";
  selectMultiple?: boolean;
  options?: Array<QFilterOption<T>>;
  renderComponent?: (column: QFilterColumn<T>) => ReactNode;
};

// type QfilterComponentProps<T> = {
//   columns: Array<QFilterColumn<T>>;
// };

type QFilterConfig<T> = {
  columns: Array<QFilterOption<T>>;
};

export { type QFilterOption, type QFilterConfig, type FilterColumnProps };
