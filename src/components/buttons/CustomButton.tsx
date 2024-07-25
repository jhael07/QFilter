/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementType, ReactElement } from "react";

const CustomButton = ({
  Icon,
  ...rest
}: {
  Icon: ElementType;
} & React.ButtonHTMLAttributes<HTMLButtonElement>): ReactElement<any> => {
  return (
    <button {...rest} className="q-filter-custom-button ">
      <Icon className="text-slate-500 text-base hover:text-slate-600  duration-300" />
    </button>
  );
};

export default CustomButton;
