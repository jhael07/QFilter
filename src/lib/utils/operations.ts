import type { FilterItem } from "../types";

export const equalOperation = <T>(filter: FilterItem<T>, dataSource: T, dataOutput: Array<T>) => {
  if (filter.operator === "Equal")
    if (dataSource[filter.field] === filter.value) return dataOutput.push(dataSource);
};
export const notEqualOperation = <T>(
  filter: FilterItem<T>,
  dataSource: T,
  dataOutput: Array<T>
) => {
  if (filter.operator === "Equal")
    if (dataSource[filter.field] !== filter.value) return dataOutput.push(dataSource);
};

export const notContainOperation = <T>(
  filter: FilterItem<T>,
  dataSource: T,
  dataOutput: Array<T>
) => {
  if (
    !(dataSource[filter.field] as string)
      .toString()
      .toLowerCase()
      .includes(filter.value.toString().toLowerCase())
  )
    dataOutput.push(dataSource);
};

export const containOperation = <T>(filter: FilterItem<T>, dataSource: T, dataOutput: Array<T>) => {
  if (
    (dataSource[filter.field] as string)
      .toString()
      .toLowerCase()
      .includes(filter.value.toString().toLowerCase())
  )
    dataOutput.push(dataSource);
};

export const greaterThan = <T>(filter: FilterItem<T>, dataSource: T, dataOutput: Array<T>) => {
  numberConditions(filter, dataSource, dataOutput, ">");
};

export const lessThan = <T>(filter: FilterItem<T>, dataSource: T, dataOutput: Array<T>) => {
  numberConditions(filter, dataSource, dataOutput, "<");
};

export const lessThanOrEqual = <T>(filter: FilterItem<T>, dataSource: T, dataOutput: Array<T>) => {
  numberConditions(filter, dataSource, dataOutput, "<=");
};

export const greaterThanOrEqual = <T>(
  filter: FilterItem<T>,
  dataSource: T,
  dataOutput: Array<T>
) => {
  numberConditions(filter, dataSource, dataOutput, ">=");
};

export const numberConditions = <T>(
  filter: FilterItem<T>,
  dataSource: T,
  dataOutput: Array<T>,
  type: ">" | ">=" | "<" | "<="
) => {
  if (type === ">")
    if (Number(dataSource[filter.field]) > Number(filter.value)) dataOutput.push(dataSource);

  if (type === ">=")
    if (Number(dataSource[filter.field]) >= Number(filter.value)) dataOutput.push(dataSource);

  if (type === "<")
    if (Number(dataSource[filter.field]) < Number(filter.value)) dataOutput.push(dataSource);

  if (type === "<=")
    if (Number(dataSource[filter.field]) <= Number(filter.value)) dataOutput.push(dataSource);
};

export const endsWith = <T>(filter: FilterItem<T>, dataSource: T, dataOutput: Array<T>) => {
  if (
    (dataSource[filter.field] as string)
      .toString()
      .toLowerCase()
      .endsWith(String(filter.value).toLowerCase())
  )
    dataOutput.push(dataSource);
};

export const notEndsWith = <T>(filter: FilterItem<T>, dataSource: T, dataOutput: Array<T>) => {
  if (
    !(dataSource[filter.field] as string)
      .toString()
      .toLowerCase()
      .endsWith(String(filter.value).toLowerCase())
  )
    dataOutput.push(dataSource);
};

export const startsWith = <T>(filter: FilterItem<T>, dataSource: T, dataOutput: Array<T>) => {
  if (
    (dataSource[filter.field] as string)
      .toString()
      .toLowerCase()
      .startsWith(String(filter.value).toLowerCase())
  )
    dataOutput.push(dataSource);
};
export const notStartsWith = <T>(filter: FilterItem<T>, dataSource: T, dataOutput: Array<T>) => {
  if (
    !(dataSource[filter.field] as string)
      .toString()
      .toLowerCase()
      .startsWith(String(filter.value).toLowerCase())
  )
    dataOutput.push(dataSource);
};
