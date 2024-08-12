/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, ReactNode, SetStateAction } from "react";
import { FilterOperator, FiltersType, Join } from "../lib/types";
import { QFilterBuilder } from "../lib";
import QFilter from "@/lib/QFilter";

type ColumnsQFilter<T> = {
  [Key in Join<T>]?: QFilterOption;
};

interface QFilterOption {
  label: string | number;
  type?: "number" | "text";
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
  logicalOperators?: LogicalOperatorsConfig;
  operators?: OperatorsConfig;
  columns?: ColumnsConfig;
  headerButtons?: HeaderButtons;
  FooterButtons?: FooterButtons;
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
  label: string;
};

type LogicalOperatorsConfig = {
  AND?: string;
  OR?: string;
};

type FilterBodyOperationsProps<T> = {
  filters: FiltersType<T>[];
  setReRender: Dispatch<SetStateAction<boolean>>;
  changesSave: Dispatch<SetStateAction<boolean>>;
  columns?: ColumnsQFilter<T>;
  operators?: OperatorsConfig;
  columnsConfig?: ColumnsConfig;
  logicalOperators?: LogicalOperatorsConfig;
  headerButtons?: HeaderButtons;
  FooterButtons?: FooterButtons;
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

type HeaderButtons = {
  Filter?: string;
  Group?: string;
};

type FooterButtons = {
  Reset?: string;
  Apply?: string;
};

type QFilterProps<T> = {
  columns: ColumnsQFilter<T>;
  onFilter: (QFilter: QFilter<T>) => void;
  onReset?: () => void;
  onClose?: () => void;
  onError: (error: any) => void;
  config?: {
    logicalOperators?: LogicalOperatorsConfig;
    operators?: OperatorsConfig;
    columns?: ColumnsConfig;
    headerButtons?: HeaderButtons;
    FooterButtons?: FooterButtons;
  };
};

type OperatorsConfig = {
  Equals?: string;
  NotEquals?: string;
  GreaterThan?: string;
  GreaterThanOrEqual?: string;
  LessThan?: string;
  LessThanOrEqual?: string;
  Contains?: string;
  NotContains?: string;
  StartsWith?: string;
  NotStartsWith?: string;
  EndsWith?: string;
  NotEndsWith?: string;
};

type ColumnsConfig = {
  Column?: string;
  Operator?: string;
  Value?: string;
};

type ComparisonOperatorProps<T> = {
  columns: ColumnsQFilter<T>;
  reRenderFn: Dispatch<SetStateAction<boolean>>;
  item: FilterOperator<T>;
  changesSave: Dispatch<SetStateAction<boolean>>;
  arr: any[];
  i: number;
  operators?: OperatorsConfig;
  columnsConfig?: ColumnsConfig;
};

export {
  ERROR_CODES,
  type QFilterProps,
  type ColumnsConfig,
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
