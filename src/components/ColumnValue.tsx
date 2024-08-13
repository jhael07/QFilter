/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useEffect, useState } from "react";
import { ColumnValueProps } from "../types";
import ColumnFilter from "./ColumnFilter";
import { BasicInput } from "./form";
import { OP } from "../lib/types";

const ColumnValue = <T,>(props: ColumnValueProps<T>): ReactElement<any> => {
  const { filter, reRenderFn, type, label } = props;

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    filter.value = inputValue;
    reRenderFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, inputValue]);

  const listOfOperatorsThatDisabledTheInput: OP[] = [
    "IsEmpty",
    "IsNotEmpty",
    "IsNotNull",
    "IsNull",
    "IsUndefined",
    "IsNotUndefined",
  ];
  return (
    <ColumnFilter title={label}>
      <BasicInput
        setValue={setInputValue}
        value={filter.value as any}
        disabled={listOfOperatorsThatDisabledTheInput.includes(filter.operator)}
        type={type}
      >
        {/* {isDisable ? (
            <CustomButton Icon={MdModeEdit} onClick={handleEditBtn} />
          ) : (
            <CustomButton Icon={FaSave} onClick={handleSaveButton} />
          )} */}
      </BasicInput>
    </ColumnFilter>
  );
};

export default ColumnValue;
