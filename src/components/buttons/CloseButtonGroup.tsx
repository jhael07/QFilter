/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoClose } from "react-icons/io5";
import { CloseButtonProps } from "../../types";
import { ReactElement } from "react";

export const CloseButtonGroup = ({ arr, i, reRenderFn }: CloseButtonProps): ReactElement<any> => {
  const handleDelete = () => {
    if (arr[i - 1]?.type === "logicalOperator") arr.splice(i - 1, 2);
    else arr.splice(i, 1);
    reRenderFn((prev: boolean) => !prev);
  };
  return (
    <button className=" q-filter-group-close button-simple" onClick={handleDelete}>
      <IoClose className="q-filter-close-icon" />
    </button>
  );
};
