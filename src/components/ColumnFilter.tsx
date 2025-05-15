/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, ReactNode } from "react";

type ColumnFilterProps = {
  title: string;
  children: ReactNode;
};

const ColumnFilter = ({ children, title }: ColumnFilterProps): ReactElement<any> => {
  return (
    <div className="column-filter_container">
      <p className="column-filter_text">{title}:</p>
      {children}
    </div>
  );
};

export default ColumnFilter;
