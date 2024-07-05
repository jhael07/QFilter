import type { FilterItem } from "../types";

export const executeFilters = <T>(filter: FilterItem<T>, dataSource: T, dataOutput: Array<T>) => {
  if (filter.operator === "Equal")
    if (dataSource[filter.field] === filter.value) dataOutput.push(dataSource);
  if (filter.operator === "Contains") {
    if (typeof dataSource[filter.field] !== "string")
      throw Error("Invalid Query: Key 'Contains' only works on type string.");

    if (
      (dataSource[filter.field] as string)
        .toString()
        .toLowerCase()
        .includes(filter.value.toString().toLowerCase())
    )
      dataOutput.push(dataSource);
  }
  if (filter.operator === "NotContains") {
    if (typeof dataSource[filter.field] !== "string")
      throw Error("Invalid Query: Key 'Contains' only works on type string.");

    if (
      !(dataSource[filter.field] as string)
        .toString()
        .toLowerCase()
        .includes(filter.value.toString().toLowerCase())
    )
      dataOutput.push(dataSource);
  }
};
