import { IoClose } from "react-icons/io5";
import type { CloseButtonProps } from "../../types";
import { ReactElement } from "react";

const CloseButton = ({
  arr,
  i,
  reRenderFn,
}: CloseButtonProps): ReactElement<any> => {
  const handleDelete = () => {
    if (arr[i - 1]?.type === "logicalOperator") {
      arr.splice(i - 1, 2);
    } else if (arr[i + 1]?.type === "logicalOperator") {
      arr.splice(i, 2);
    } else arr.splice(i, 1);

    reRenderFn((prev: boolean) => !prev);
  };
  return (
    <button className="absolute right-0 top-0 group" onClick={handleDelete}>
      <IoClose className="text-base text-slate-700  h-fit group-hover:text-red-500" />
    </button>
  );
};

export default CloseButton;
