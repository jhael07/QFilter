type Logic = "AND" | "OR";

type OP =
  | "Equal"
  | "NotEqual"
  | "LessThan"
  | "GreaterThan"
  | "GreaterThanOrEqual"
  | "LessThanOrEqual"
  | "Contains"
  | "NotContains"
  | "StartsWith"
  | "NotStartsWith"
  | "EndsWith"
  | "NotEndsWith";

interface FilterItem<T> {
  field: keyof T;
  operator: OP;
  value: number | string | boolean;
}

interface IFilter<T> {
  id: string;
  logic: Logic;
  filters: Array<FilterItem<T>>;
}

export { type IFilter, type OP, type Logic, type FilterItem };
