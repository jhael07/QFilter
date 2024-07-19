import { ERROR_CODES } from "../types";

export const errorMessage = (code: ERROR_CODES, column?: string): string => {
  if (code === ERROR_CODES.EmptyColumn)
    return `Error ${ERROR_CODES.EmptyColumn}: Column cannot be empty.`;
  if (code === ERROR_CODES.EmptyOperator)
    return `Error ${ERROR_CODES.EmptyOperator}: Please select an operator for the column ${column}.`;
  if (code === ERROR_CODES.EmptyValue)
    return `Error ${ERROR_CODES.EmptyValue}: Column ${column} cannot have an empty value.`;
  if (code === ERROR_CODES.GroupEmpty)
    return `Error ${ERROR_CODES.GroupEmpty}: Group cannot be empty.`;

  return `UKNOWN ERROR`;
};
