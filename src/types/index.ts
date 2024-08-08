/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, ReactNode, SetStateAction } from "react";
import { FilterOperator, FiltersType, Join } from "../lib/types";
import { QFilterBuilder } from "../lib";

type ColumnsQFilter<T> = {
  [Key in Join<T>]?: QFilterOption;
};

interface QFilterOption {
  label: string | number;
  type?: "number" | "text" | "boolean" | "date";
  options?: Array<SelectOption>;
  allowMultiple?: boolean;
  render?:
    | ((item: Readonly<FilterOperator<any>>) => ReactNode)
    | ((
        item: Readonly<FilterOperator<any>>,
        setUpdateValue: (value: string | number | boolean | undefined | null) => void
      ) => ReactNode);
}

type FilterColumnProps<T> = {
  title: string;
  value: string | ReactNode;
  QFilter: QFilterBuilder<T>;
  item?: FilterOperator<T>;
  type?: "input" | "select" | "action";
  options?: Array<QFilterOption>;
};

type QFilterConfig = {
  columns: Array<QFilterOption>;
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
  columns?: ColumnsQFilter<T>;
  operators?: OperatorsConfig;
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

type OperatorsConfig = {
  Equals?: string;
  NotEquals?: string;
  lessThan?: string;
  GreatherThan?: string;
  GreatherThanOrEqual?: string;
  LessThan?: string;
  Contains?: string;
  NotContains?: string;
  StartsWith?: string;
  NotStartsWith?: string;
  EndsWith?: string;
  NotEndsWith?: string;
};

type ComparisonOperatorProps<T> = {
  columns: ColumnsQFilter<T>;
  reRenderFn: Dispatch<SetStateAction<boolean>>;
  item: FilterOperator<T>;
  changesSave: Dispatch<SetStateAction<boolean>>;
  arr: any[];
  i: number;
  operators?: OperatorsConfig;
};

export {
  ERROR_CODES,
  type OperatorsConfig,
  type ComparisonOperatorProps,
  type ColumnsQFilter,
  type SelectOption,
  type FilterBodyOperationsProps,
  type QFilterOption,
  type QFilterConfig,
  type FilterColumnProps,
  type CloseButtonProps,
  type ColumnValueProps,
};
