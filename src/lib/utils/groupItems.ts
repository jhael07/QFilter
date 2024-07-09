import { GroupCondition, OP } from "../types";

const generateUID = () => crypto.randomUUID().substring(0, 8);

export const where = <T>(
  field: keyof T,
  operator: OP,
  value: number | string | boolean,
  id: string | number = crypto.randomUUID().substring(0, 8),
  parentId: string | number | null = null
): GroupCondition<T> => {
  const body: GroupCondition<T> = {
    field,
    operator,
    value,
    id,
    parentId,
    type: "comparisonOperator",
  };

  return body;
};

export const group = <T>(filters: Array<GroupCondition<T>>): Array<GroupCondition<T>> => {
  const id = crypto.randomUUID().substring(0, 8);

  const allFilters: Array<GroupCondition<T>> = [];

  allFilters.push({
    id,
    operator: "(",
    type: "startGroup",
  });

  filters.forEach((child) =>
    allFilters.push({ ...child, parentId: id, id: crypto.randomUUID().substring(0, 8) })
  );
  allFilters.push({
    id: crypto.randomUUID(),
    operator: ")",
    type: "endGroup",
  });

  return allFilters;
};

export const and = <T>(parentId: string | number | null = null): GroupCondition<T> => {
  return {
    id: generateUID(),
    parentId,
    operator: "&&",
    type: "logicalOperator",
  };
};

export const or = <T>(parentId: string | number | null = null): GroupCondition<T> => {
  return {
    id: generateUID(),
    parentId,
    operator: "||",
    type: "logicalOperator",
  };
};

export const not = <T>(parentId: string | number | null = null): GroupCondition<T> => {
  return {
    id: generateUID(),
    parentId,
    operator: "!",
    type: "logicalOperator",
  };
};
