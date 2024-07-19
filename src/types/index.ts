/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, ReactNode, SetStateAction } from "react";
import { FilterOperator, FiltersType, Join } from "../lib/types";
import { QFilterBuilder } from "../lib";

type QFilterOption<T> = {
  label: string | number;
  value: Join<T>;
  type?: "number" | "text" | "boolean" | "date";
  options?: Array<SelectOption>;
  allowMultiple?: boolean;
};

type FilterColumnProps<T> = {
  title: string;
  value: string | ReactNode;
  QFilter: QFilterBuilder<T>;
  item?: FilterOperator<T>;
  type?: "input" | "select" | "action";
  options?: Array<QFilterOption<T>>;
};

// type QFilterColumn<T> = {
//   label: string;
//   dataIndex: Join<T>;
//   type: "number" | "string" | "boolean" | "date";
//   selectMultiple?: boolean;
//   options?: Array<QFilterOption<T>>;
//   renderComponent?: (column: QFilterColumn<T>) => ReactNode;
// };

// type QfilterComponentProps<T> = {
//   columns: Array<QFilterColumn<T>>;
// };

type QFilterConfig<T> = {
  columns: Array<QFilterOption<T>>;
};

type CloseButtonProps = {
  arr: any[];
  i: number;
  reRenderFn: Dispatch<SetStateAction<boolean>>;
};

type ColumnValueProps<T> = {
  filter: FilterOperator<T>;
  changesSave: Dispatch<SetStateAction<boolean>>;
  reRenderFn: Function;
  type?: "number" | "text" | "boolean" | "date";
  options?: Array<SelectOption>;
  allowMultiple?: boolean;
};

type FilterBodyOperationsProps<T> = {
  filters: FiltersType<T>[];
  setReRender: Dispatch<SetStateAction<boolean>>;
  changesSave: Dispatch<SetStateAction<boolean>>;
  columns?: Array<QFilterOption<T>>;
};

type SelectOption = {
  label: string | number;
  value: string | number | boolean | undefined | null;
};

enum ERROR_CODES {
  EmptyColumn = 1,
  EmptyOperator = 2,
  EmptyValue = 3,
  StartWithLogicalOperator = 4,
  GroupEmpty = 5,
}

export {
  ERROR_CODES,
  type SelectOption,
  type FilterBodyOperationsProps,
  type QFilterOption,
  type QFilterConfig,
  type FilterColumnProps,
  type CloseButtonProps,
  type ColumnValueProps,
};