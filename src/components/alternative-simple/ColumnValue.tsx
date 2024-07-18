/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ColumnValueProps } from "../../types";
import ColumnFilter from "./ColumnFilter";
import { BasicInput } from "../form";
import { CustomButton } from "../buttons";
import { MdModeEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";

const ColumnValue = <T,>({ filter, changesSave, reRenderFn }: ColumnValueProps<T>) => {
  const [inputValue, setInputValue] = useState("");
  const [isDisable, setIsDisable] = useState(true);

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
      <BasicInput setValue={setInputValue} value={filter.value as any} disabled={isDisable}>
        {isDisable ? (
          <CustomButton Icon={MdModeEdit} onClick={handleEditBtn} />
        ) : (
          <CustomButton Icon={FaSave} onClick={handleSaveButton} />
        )}
      </BasicInput>
    </ColumnFilter>
  );
};

export default ColumnValue;
