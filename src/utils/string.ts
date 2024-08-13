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
