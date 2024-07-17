import { Dispatch, ReactNode, SetStateAction } from "react";

const BasicInput = ({
  value,
  setValue,
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLInputElement> | undefined;
  setValue?: Dispatch<SetStateAction<string>>;
  value?: ReactNode | string | number | boolean | null;
}) => {
  return (
    <div className="flex gap-x-4 items-center w-full">
      <input
        className="border border-slate-300 rounded-md p-1.5 px-2 text-slate-600 outline-none 
    w-full text-sm"
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
