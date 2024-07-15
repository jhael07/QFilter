/* eslint-disable @typescript-eslint/no-explicit-any */
import { GroupCondition, Join, OP } from "../types";

/**
 * Generates a random UID with only 8 characters.
 * This is used for most of the IDs in the `QFilter` class.
 *
 * @returns {string} A string representing the generated UID.
 */
export const generateUID = (): string => crypto.randomUUID().substring(0, 8);

/**
 * Adds a filter condition to the query.
 * @param {Join<T>} field The field on which to apply the filter.
 * @param {OP} operator The comparison operator for the filter.
 * @param {number | string | boolean} value The value to compare against.
 * @param {string | number} [id=crypto.randomUUID().substring(0, 8)] Optional unique identifier for the filter.
 * @param {string | number | null} [parentId=null] Optional parent identifier for hierarchical filters.
 * @returns {this} The instance of the class with the added filter condition.
 */
export const condition = <T>(
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

/**
 * Groups multiple filter conditions into a logical group.
 * @param {Array<GroupCondition<T> | Array<GroupCondition<T>>>} filters An array of group conditions or nested arrays of group conditions.
 * @returns {this} The instance of the class with the added grouped filter conditions.
 */
export const group = <T>(
  filters: Array<GroupCondition<T> | Array<GroupCondition<T>>>
): Array<GroupCondition<T>> => {
  const id = generateUID();

  const children: any[] = [];

  filters.forEach((item) => {
    if (children.length > 0 && children.at(-1)?.type !== "logicalOperator") {
      children.push(and());
    }
    children.push({ ...item, parentId: id });
  });

  const group = {
    id,
    children,
    type: "group",
  } as any;

  return group;
};

/**
 * Adds a logical AND operator ('&&') to the filters array.
 * @returns {this} The instance of the class with the added logical AND operator.
 */
export const and = <T>(): GroupCondition<T> => {
  return {
    id: generateUID(),
    operator: "&&",
    type: "logicalOperator",
  };
};

/**
 * Adds a logical OR operator ('||') to the filters array.
 * @returns {this} The instance of the class with the added logical OR operator.
 */
export const or = <T>(): GroupCondition<T> => {
  return {
    id: generateUID(),
    operator: "||",
    type: "logicalOperator",
  };
};

/**
 * Adds a logical NOT operator ('!') to the filters array.
 * @returns {this} The instance of the class with the added logical NOT operator.
 */
export const not = <T>(): GroupCondition<T> => {
  return {
    id: generateUID(),
    operator: "!",
    type: "logicalOperator",
  };
};
