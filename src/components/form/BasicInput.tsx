import { ReactNode } from "react";

const BasicInput = ({
  value,
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLInputElement> | undefined;
  value?: ReactNode | string | number | boolean | null;
}) => {
  return (
    <div className="flex gap-x-4 items-center w-full">
      <input
        className="border border-slate-300 rounded-md p-1.5 px-2 text-slate-600 outline-none 
    w-full text-sm"
        defaultValue={value?.toString()}
        onClick={onClick}
      />
      {children}
    </div>
  );
};

export default BasicInput;
