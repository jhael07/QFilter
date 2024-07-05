import { FilterItem } from "../types";

const errorMessage = (key: string, type: "string" | "number" | "boolean") =>
  `Invalid Query: Key '${key}' only works on type ${type}`;

export const queryError = <T>(
  filter: FilterItem<T>,
  dataSource: T,
  type: "string" | "number" | "boolean"
) => {
  if (typeof dataSource[filter.field] !== type)
    throw Error(errorMessage(filter.operator.toString(), "string"));
};
