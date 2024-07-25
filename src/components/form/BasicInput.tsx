/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactElement } from "react";
import type { BasicInputProps } from "./types";

const BasicInput = (props: BasicInputProps): ReactElement<any> => {
  const { value, setValue, children, onClick, ...rest } = props;

  return (
    <div className="q-filter-input_container">
      <input
        {...rest}
        className="q-filter-input-value"
        defaultValue={value?.toString()}
        onClick={onClick}
        onChange={(e) => {
          setValue?.(e.target.value);
        }}
      />
      {children}
    </div>
  );
};

export default BasicInput;
