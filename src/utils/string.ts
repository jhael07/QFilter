import { LogicalOperator } from "../lib/types";

const logicalOperationCondition = (type: LogicalOperator) => {
  if (type === "&&") return "And";
  if (type === "||") return "Or";
  if (type === "!") return "Not";
};

export { logicalOperationCondition };
