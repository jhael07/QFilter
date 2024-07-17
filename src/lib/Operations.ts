import type { FilterOperator, FiltersType, OP } from "./types";

class Operations<T> {
  filters: Array<FiltersType<T>>;

  constructor(filters: Array<FiltersType<T>>) {
    this.filters = filters;
  }

  where(
    field: keyof T,
    operator: OP,
    value: number | string | boolean,
    id: string | number = crypto.randomUUID().substring(0, 8),
    parentId: string | number | null = null
  ): this {
    const body: FilterOperator<T> = {
      field,
      operator,
      value,
      id,
      parentId,
      type: "comparisonOperator",
    };

    this.filters.push(body);
    return this;
  }
}

export default Operations;
