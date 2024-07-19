/* eslint-disable @typescript-eslint/no-explicit-any */
type OP =
  | "Equals"
  | "NotEquals"
  | "LessThan"
  | "GreaterThan"
  | "GreaterThanOrEqual"
  | "LessThanOrEqual"
  | "Contains"
  | "NotContains"
  | "StartsWith"
  | "NotStartsWith"
  | "EndsWith"
  | "NotEndsWith"
  | ComparisonOperator;

type FilterType = "group" | "logicalOperator" | "comparisonOperator";

type FilterGroup = "(" | ")";

type LogicalOperator = "&&" | "||" | "!";

type ComparisonOperator = "===" | "!==" | ">" | "<" | ">=" | "<=";

type commonFilterProps<T> = {
  id: string | number;
  parentId?: string | number | null;
  type: FilterType;
  children?: Array<GroupCondition<T>>;
};

type FilterLogicalOperator<T> = {
  operator: LogicalOperator;
} & commonFilterProps<T>;

type FilterGroupOperator<T> = {
  operator: FilterGroup;
} & commonFilterProps<T>;

type FilterOperator<T> = {
  operator: OP;
  value: string | number | boolean | undefined | null;
  field: keyof T | string;
} & commonFilterProps<T>;

type FilterBuild<T> = FilterGroupOperator<T> | FilterLogicalOperator<T> | FilterOperator<T>;

type AddFilterFn<T> = (
  id: string | number,
  field: keyof T,
  operator: OP,
  value: number | string | boolean,
  parentId: string | number
) => FilterOperator<T>;

type GroupCondition<T> =
  | FilterOperator<T>
  | FilterGroupOperator<T>
  | FilterLogicalOperator<T>
  | commonFilterProps<T>;

type BuildResult<T> = { conditions: Readonly<string>; result: ReadonlyArray<T> };

type FiltersType<T> =
  | FilterOperator<T>
  | FilterGroupOperator<T>
  | FilterLogicalOperator<T>
  | commonFilterProps<T>;

type FiltersUI<T> = FilterOperator<T>;

export {
  type FiltersType,
  type BuildResult,
  type commonFilterProps,
  type GroupCondition,
  type OP,
  type FilterType,
  type FilterGroup,
  type LogicalOperator,
  type ComparisonOperator,
  type FilterLogicalOperator,
  type FilterGroupOperator,
  type FilterOperator,
  type FilterBuild,
  type AddFilterFn,
  type FiltersUI,
};

export type Join<T> = T extends object
  ? T extends Array<any>
    ? "length"
    : {
        [K in keyof T]-?: `${Exclude<K, symbol>}${
          | ""
          | `${undefined extends T[K] | null ? "?" : ""}.${Join<NonNullable<T[K]>>}`}`;
      }[keyof T]
  : never;
