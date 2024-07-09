/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FilterGroupOperator,
  FilterLogicalOperator,
  FilterOperator,
  GroupCondition,
  OP,
} from "./types";

class QFilter<T> {
  private filters: Array<FilterOperator<T> | FilterGroupOperator<T> | FilterLogicalOperator<T>> =
    [];
  private buildFilters: string = "";
  private generateUID(): string {
    return crypto.randomUUID().substring(0, 8);
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

  removeFilter(id: string | number): this {
    const result = this.filters.filter((item) => item.id !== id);
    this.filters = result;
    return this;
  }

  group(filters: Array<GroupCondition<T> | Array<GroupCondition<T>>>) {
    const id = this.generateUID();
    this.filters.push({
      id,
      operator: "(",
      type: "startGroup",
    });

    filters.forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((grandChildren) => this.filters.push({ ...grandChildren, parentId: id }));
      } else {
        this.filters.push({ ...child, parentId: id });
      }
    });

    this.filters.push({
      id,
      operator: ")",
      type: "endGroup",
    });

    return this;
  }

  // startGroup(
  //   parentId: string | number | null = null,
  //   id: string | number = this.generateUID()
  // ): this {
  //   this.filters.push({
  //     id,
  //     operator: "(",
  //     type: "startGroup",
  //     parentId,
  //   });
  //   return this;
  // }

  // endGroup(
  //   parentId: string | number | null = null,
  //   id: string | number = this.generateUID()
  // ): this {
  //   this.filters.push({
  //     id,
  //     parentId,
  //     operator: ")",
  //     type: "endGroup",
  //   });
  //   return this;
  // }

  removeGroup(groupId: string | number): this {
    const result = this.filters.filter((item) => item.parentId !== groupId);
    const removeGroup = this.filters.filter((item) => item.id !== groupId);
    this.filters = result;
    this.filters = removeGroup;

    // const nodes: any[] = [];

    // const findNodes = (parentId: string | number) =>
    //   this.filters.filter((item) => item.parentId == parentId && item.type == "startGroup");

    // let count = 0;

    // do {
    //   const nodesToRemove = findNodes(groupId);
    //   count = nodesToRemove.length;
    //   nodesToRemove.forEach((x) => {
    //     nodes.push(x as any);
    //     // const childNodes = findNodes(x.id);
    //     // childNodes.forEach((c) => nodes.push(c as any));
    //   });
    // } while (count > 0);

    return this;
  }

  and(parentId: string | number | null = null): this {
    this.filters.push({
      id: this.generateUID(),
      parentId,
      operator: "&&",
      type: "logicalOperator",
    });

    return this;
  }

  or(parentId: string | number | null = null): this {
    this.filters.push({
      id: this.generateUID(),
      parentId,
      operator: "||",
      type: "logicalOperator",
    });
    return this;
  }

  not(parentId: string | number | null = null): this {
    this.filters.push({
      id: this.generateUID(),
      parentId,
      operator: "!",
      type: "logicalOperator",
    });
    return this;
  }

  build(): string {
    this.filters.forEach((item) => {
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
            `data.${field.toString()}.toLowerCase().includes('${value.toString().toLowerCase()}')`
          );
          return;
        }
        if (operator === "NotContains") {
          this.buildFilters = this.buildFilters.concat(
            `!data.${field.toString()}.toLowerCase().includes('${value.toString().toLowerCase()}')`
          );
          return;
        }
      }

      if (item.operator === "(") {
        this.buildFilters = this.buildFilters.concat(` ${item.operator}`);
        return;
      }

      if (item.operator === ")") {
        this.buildFilters = this.buildFilters.concat(`${item.operator} `);
        return;
      }

      if (item.type === "logicalOperator") {
        this.buildFilters = this.buildFilters.concat(` ${item.operator} `);
        return;
      }
    });

    return this.buildFilters;
  }
}

export default QFilter;
