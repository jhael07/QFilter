import type { FilterItem } from "../types";
import { queryError } from "./errors";
import {
  containOperation,
  endsWith,
  equalOperation,
  greaterThan,
  greaterThanOrEqual,
  lessThan,
  lessThanOrEqual,
  notContainOperation,
  notEndsWith,
  notEqualOperation,
  notStartsWith,
  startsWith,
} from "./operations";

export const executeFilters = <T>(filter: FilterItem<T>, dataSource: T, dataOutput: Array<T>) => {
  if (filter.operator === "Equal") return equalOperation<T>(filter, dataSource, dataOutput);
  if (filter.operator === "NotEqual") return notEqualOperation<T>(filter, dataSource, dataOutput);

  if (filter.operator === "Contains") {
    queryError(filter, dataSource, "string");
    return containOperation(filter, dataSource, dataOutput);
  }

  if (filter.operator === "NotContains") {
    queryError(filter, dataSource, "string");
    return notContainOperation(filter, dataSource, dataOutput);
  }

  if (filter.operator === "GreaterThan") {
    queryError(filter, dataSource, "number");
    return greaterThan(filter, dataSource, dataOutput);
  }

  if (filter.operator === "GreaterThanOrEqual") {
    queryError(filter, dataSource, "number");
    return greaterThanOrEqual(filter, dataSource, dataOutput);
  }

  if (filter.operator === "LessThan") {
    queryError(filter, dataSource, "number");
    return lessThan(filter, dataSource, dataOutput);
  }

  if (filter.operator === "LessThanOrEqual") {
    queryError(filter, dataSource, "number");
    return lessThanOrEqual(filter, dataSource, dataOutput);
  }

  if (filter.operator === "EndsWith") {
    queryError(filter, dataSource, "string");
    return endsWith(filter, dataSource, dataOutput);
  }

  if (filter.operator === "NotEndsWith") {
    queryError(filter, dataSource, "string");
    return notEndsWith(filter, dataSource, dataOutput);
  }

  if (filter.operator === "StartsWith") {
    queryError(filter, dataSource, "string");
    return startsWith(filter, dataSource, dataOutput);
  }

  if (filter.operator === "NotStartsWith") {
    queryError(filter, dataSource, "string");
    return notStartsWith(filter, dataSource, dataOutput);
  }
};
