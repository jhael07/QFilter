import { Dispatch, ReactNode, SetStateAction } from "react";

type BasicInputProps = {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLInputElement> | undefined;
  setValue?: Dispatch<SetStateAction<string>>;
  value?: ReactNode | string | number | boolean | null;
} & React.InputHTMLAttributes<HTMLInputElement>;

const BasicInput = ({ value, setValue, children, onClick, ...rest }: BasicInputProps) => {
  return (
    <div className="flex gap-x-2 items-center w-full">
      <input
        {...rest}
        className="border border-slate-300 rounded-md p-1.5 px-2 text-slate-600 outline-none
         disabled:bg-slate-200 disabled:hover:cursor-not-allowed w-full text-sm min-w-[10rem]"
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
