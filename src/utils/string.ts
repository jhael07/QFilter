import { LogicalOperator } from "../lib/types";

const logicalOperationCondition = (type: LogicalOperator) => {
  if (type === "&&") return "And";
  if (type === "||") return "Or";
  if (type === "!") return "Not";
};

export { logicalOperationCondition };

export enum OPERATORS {
  "Equals" = "Equals",
  "NotEquals" = "NotEquals",
  "LessThan" = "LessThan",
  "GreaterThan" = "GreaterThan",
  "GreaterThanOrEqual" = "GreaterThanOrEqual",
  "LessThanOrEqual" = "LessThanOrEqual",
  "Contains" = "Contains",
  "NotContains" = "NotContains",
  "StartsWith" = "StartsWith",
  "NotStartsWith" = "NotStartsWith",
  "EndsWith" = "EndsWith",
  "NotEndsWith" = "NotEndsWith",
  "IsEmpty" = "IsEmpty",
  "IsNotEmpty" = "IsNotEmpty",
  "IsNull" = "IsNull",
  "IsNotNull" = "IsNotNull",
  "IsDateGreaterThan" = "IsDateGreaterThan",
  "IsDateGreaterThanOrEqual" = "IsDateGreaterThanOrEqual",
  "IsDateLessThan" = "IsDateLessThan",
  "IsDateLessThanOrEqual" = "IsDateLessThanOrEqual",
  "IsDateEqualTo" = "IsDateEqualTo",
  "IsDateNotEqualTo" = "IsDateNotEqualTo",
  "IsUndefined" = "IsUndefined",
  "IsNotUndefined" = "IsNotUndefined",
}

export type OperatorsType = {
  Equals: string;
  NotEquals: string;
  LessThan: string;
  GreaterThan: string;
  GreaterThanOrEqual: string;
  LessThanOrEqual: string;
  Contains: string;
  NotContains: string;
  StartsWith: string;
  NotStartsWith: string;
  EndsWith: string;
  NotEndsWith: string;
  IsEmpty: string;
  IsNotEmpty: string;
  IsNull: string;
  IsNotNull: string;
  IsDateGreaterThan: string;
  IsDateGreaterThanOrEqual: string;
  IsDateLessThan: string;
  IsDateLessThanOrEqual: string;
  IsDateEqualTo: string;
  IsDateNotEqualTo: string;
  IsUndefined: string;
  IsNotUndefined: string;
};
