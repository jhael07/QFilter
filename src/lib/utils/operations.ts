/* eslint-disable @typescript-eslint/no-explicit-any */
import { GroupCondition, Join, OP } from "../types";

/**
 * Generates a random UID with only 8 characters.
 * This is used for most of the IDs in the `QFilter` class.
 *
 * @returns {string} A string representing the generated UID.
 */
export const generateUID = (): string => crypto.randomUUID().substring(0, 8);

export const where = <T>(
  field: Join<T>,
  operator: OP,
  value: number | string | boolean | undefined | null,
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

export const group = <T>(
  filters: Array<GroupCondition<T> | Array<GroupCondition<T>>>
): Array<GroupCondition<T>> => {
  const id = generateUID();

  const group = {
    id,
    children: filters?.map((filter: any) => ({ ...filter, parentId: id })) as any,
    type: "group",
  } as any;

  return group;
};

export const and = <T>(): GroupCondition<T> => {
  return {
    id: generateUID(),
    operator: "&&",
    type: "logicalOperator",
  };
};

export const or = <T>(): GroupCondition<T> => {
  return {
    id: generateUID(),
    operator: "||",
    type: "logicalOperator",
  };
};

export const not = <T>(): GroupCondition<T> => {
  return {
    id: generateUID(),
    operator: "!",
    type: "logicalOperator",
  };
};
