/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useState } from "react";
import { ColumnValueProps } from "../types";
import ColumnFilter from "./ColumnFilter";
import { BasicInput } from "./form";
import { MdModeEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import CustomButton from "./buttons/CustomButton";

const ColumnValue = <T,>({
  filter,
  changesSave,
  reRenderFn,
  type,
}: ColumnValueProps<T>): ReactElement<any> => {
  const [inputValue, setInputValue] = useState("");
  const [isDisable, setIsDisable] = useState(false);

  const handleEditBtn = () => {
    setIsDisable(false);
    changesSave(true);
  };

  const handleSaveButton = () => {
    setIsDisable(true);
    filter.value = inputValue;
    changesSave(false);
    reRenderFn();
  };

  return (
    <ColumnFilter title="Value">
      {type !== "boolean" && type !== "date" && (
        <BasicInput
          setValue={setInputValue}
          value={filter.value as any}
          disabled={isDisable}
          type={type}
        >
          {isDisable ? (
            <CustomButton Icon={MdModeEdit} onClick={handleEditBtn} />
          ) : (
            <CustomButton Icon={FaSave} onClick={handleSaveButton} />
          )}
        </BasicInput>
      )}
    </ColumnFilter>
  );
};

export default ColumnValue;
