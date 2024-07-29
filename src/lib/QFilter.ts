/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import QExecute from "./QExecute";
import {
  commonFilterProps,
  FilterGroupOperator,
  FilterLogicalOperator,
  FilterOperator,
  FiltersType,
  QFilterGridify,
} from "./types";

/**
 * Class representing a filter for a dataset.
 * @template T - The type of data being filtered.
 * @extends QExecute<T>
 */
class QFilter<T> extends QExecute<T> {
  private buildFilters?: string;
  private filters: Array<FiltersType<T>> = [];
  private static operators: Record<string, string> = {
    Equals: `data.{field} == {value}`,
    NotEquals: `data.{field} !== {value}`,
    GreaterThan: `data.{field} > {value}`,
    GreaterThanOrEqual: `data.{field} >= {value}`,
    LessThan: `data.{field} < {value}`,
    LessThanOrEqual: `data.{field} <= {value}`,
    StartsWith: `data.{field}.toLowerCase().startsWith({value}.toLowerCase())`,
    NotStartsWith: `!data.{field}.toLowerCase().startsWith({value}.toLowerCase())`,
    EndsWith: `data.{field}.toLowerCase().endsWith({value}.toLowerCase())`,
    NotEndsWith: `!data.{field}.toLowerCase().endsWith({value}.toLowerCase())`,
    Contains: `data.{field}.toLowerCase().includes({value}.toLowerCase())`,
    NotContains: `!data.{field}.toLowerCase().includes({value}.toLowerCase())`,
  };

  /**
   * Creates an instance of QFilter.
   * @param {Array<FiltersType<T>>} filters - An array of filters to be applied.
   */
  constructor(filters: Array<FiltersType<T>>, private onError?: (error: any) => void) {
    super();
    this.filters = filters;
  }

  /**
   * Dynamically generates a filter expression based on the provided filter item.
   * Modifies the `buildFilters` property of the class instance.
   * @param {commonFilterProps<T> | FilterOperator<T> | FilterGroupOperator<T> | FilterLogicalOperator<T>} item The filter item to generate the expression for.
   */
  private generateFilter(
    item:
      | commonFilterProps<T>
      | FilterOperator<T>
      | FilterGroupOperator<T>
      | FilterLogicalOperator<T>
  ): void {
    if (!item) return;

    if (!this.buildFilters) this.buildFilters = "";

    if (item.type === "comparisonOperator") {
      const { field, operator, value } = item as FilterOperator<T>;

      const newVal = typeof value === "string" ? `'${value}'` : value;

      this.buildFilters += QFilter.operators[operator]
        .replaceAll("{field}", field.toString())
        .replaceAll("{value}", newVal?.toString() ?? "");

      return;
    }

    if (item.type === "logicalOperator") {
      this.buildFilters = this.buildFilters.concat(
        ` ${(item as FilterLogicalOperator<T>).operator} `
      );
      return;
    }

    if (item.type === "group") {
      this.buildFilters = this.buildFilters.concat(`(`);
      item.children?.forEach((item) => {
        this.generateFilter(item);
      });

      this.buildFilters = this.buildFilters.concat(`)`);
      return;
    }
  }

  gridify(): QFilterGridify {
    const gridifyCompare: Record<string, string> = {
      Equals: "=",
      NotEquals: "!=",
      LessThan: "<",
      GreaterThan: ">",
      GreaterThanOrEqual: ">=",
      LessThanOrEqual: "<=",
      Contains: "=*",
      NotContains: "!*",
      StartsWith: "^",
      NotStartsWith: "!^",
      EndsWith: "$",
      NotEndsWith: "!$",
    };

    let gridifyFilter: string = "";

    const executeGridify = (filters?: FiltersType<T>[]) => {
      const itemFilters = filters ?? this.filters;
      itemFilters?.forEach((x) => {
        const item = x as FilterOperator<any>;
        if (item.type === "comparisonOperator")
          gridifyFilter +=
            item.field.toString().replaceAll("?", "") + gridifyCompare[item.operator] + item.value;
        if (item.type === "logicalOperator") {
          if ((item.operator as any) === "&&") gridifyFilter += ",";
          if ((item.operator as any) === "||") gridifyFilter += "|";
        }

        if (item.type === "group") {
          gridifyFilter += "(";
          executeGridify(item.children);
          gridifyFilter += ")";
        }
      });
    };

    executeGridify(this.filters);

    return {
      filter: gridifyFilter,
      orderBy: "",
      page: 0,
      pageSize: 0,
    };
  }

  /**
   * Applies the built filters to the provided dataSource and returns filtered results.
   * @param {T[]} dataSource The array of data to filter.
   * @returns {readonly T[]} An array of filtered data matching the applied filters.
   */
  filter(dataSource: T[]): T[] {
    try {
      if (!this.buildFilters) {
        this.buildFilters = "";
        this.filters?.forEach((item) => this.generateFilter(item));
      }
      return this.QExecute(this.buildFilters, dataSource) as T[];
    } catch (err: any) {
      this.onError?.(err);
      return [];
    }
  }
}

export default QFilter;
