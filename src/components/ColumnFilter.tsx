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
    <div className="w-full grid gap-1 ">
      <p className="text-slate-500">{title}:</p>
      {children}
    </div>
  );
};

export default ColumnFilter;
