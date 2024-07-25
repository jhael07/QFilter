import { ERROR_CODES } from "../types";

/**
 *
 * ### errorMessage
 *
 * Returns a formatted error message for invalid query errors.
 * This function provides a standardized error message based on common JavaScript engine errors encountered during query insertion.
 *
 * @param {ERROR_CODES} code - The error code from the ```ERROR_CODES``` enum that represents the specific error encountered.
 * @param {string} column - The column where the issue occurred.
 * @returns {string} A formatted error message describing the issue.
 */
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
