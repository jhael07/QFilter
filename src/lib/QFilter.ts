/* eslint-disable @typescript-eslint/ban-types */
import QExecute from "./QExecute";
import {
  commonFilterProps,
  FilterGroupOperator,
  FilterLogicalOperator,
  FilterOperator,
  FiltersType,
} from "./types";

class QFilter<T> extends QExecute<T> {
  buildFilters?: string;
  private filters: Array<FiltersType<T>> = [];

  constructor(filters: Array<FiltersType<T>>) {
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

      if (operator === "Equal" || operator === "===") {
        this.buildFilters = this.buildFilters.concat(
          `data.${field.toString()} === ${typeof value === "string" ? `'${value}'` : value}`
        );
        return;
      }
      if (operator === "NotEqual" || operator === "!==") {
        this.buildFilters = this.buildFilters.concat(
          `data.${field.toString()} !== ${typeof value === "string" ? `'${value}'` : value}`
        );
        return;
      }
      if (operator === "GreaterThan" || operator === ">") {
        this.buildFilters = this.buildFilters.concat(`data.${field.toString()} > ${value}`);
        return;
      }

      if (operator === "GreaterThanOrEqual" || operator === ">=") {
        this.buildFilters = this.buildFilters.concat(`data.${field.toString()} >= ${value}`);
        return;
      }

      if (operator === "LessThan" || operator === "<") {
        this.buildFilters = this.buildFilters.concat(`data.${field.toString()} < ${value}`);
        return;
      }

      if (operator === "LessThanOrEqual" || operator === "<=") {
        this.buildFilters = this.buildFilters.concat(`data.${field.toString()} <= ${value}`);
        return;
      }
      if (operator === "StartsWith") {
        this.buildFilters = this.buildFilters.concat(
          `data.${field.toString()}.startsWith('${value}')`
        );
        return;
      }
      if (operator === "NotStartsWith") {
        this.buildFilters = this.buildFilters.concat(
          `!data.${field.toString()}.startsWith('${value}')`
        );
        return;
      }
      if (operator === "EndsWith") {
        this.buildFilters = this.buildFilters.concat(
          `data.${field.toString()}.endsWith('${value}')`
        );
        return;
      }
      if (operator === "NotEndsWith") {
        this.buildFilters = this.buildFilters.concat(
          `!data.${field.toString()}.endsWith('${value}')`
        );
        return;
      }
      if (operator === "Contains") {
        this.buildFilters = this.buildFilters.concat(
          `data.${field.toString()}.toLowerCase().includes('${value?.toString().toLowerCase()}')`
        );
        return;
      }
      if (operator === "NotContains") {
        this.buildFilters = this.buildFilters.concat(
          `!data.${field.toString()}.toLowerCase().includes('${value?.toString().toLowerCase()}')`
        );
        return;
      }
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

  /**
   * Applies the built filters to the provided dataSource and returns filtered results.
   * @param {T[]} dataSource The array of data to filter.
   * @returns {readonly T[]} An array of filtered data matching the applied filters.
   */
  filter(dataSource: T[]): readonly T[] {
    if (!this.buildFilters) {
      this.buildFilters = "";
      this.filters?.forEach((item) => this.generateFilter(item));
    }
    return this.ApplyFilters(this.buildFilters, dataSource);
  }
}

export default QFilter;
