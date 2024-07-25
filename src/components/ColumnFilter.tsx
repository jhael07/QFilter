/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, ReactNode } from "react";

const ColumnFilter = ({
  children,
  title,
}: {
  title: string;
  children: ReactNode;
}): ReactElement<any> => {
  return (
    <div className="column-filter_container">
      <p className="column-filter_text">{title}:</p>
      {children}
    </div>
  );
};

export default ColumnFilter;
