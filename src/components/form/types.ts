import { Dispatch, ReactNode, SetStateAction } from "react";

export type BasicInputProps = {
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLInputElement> | undefined;
  setValue?: Dispatch<SetStateAction<string>>;
  value?: ReactNode | string | number | boolean | null;
} & React.InputHTMLAttributes<HTMLInputElement>;
