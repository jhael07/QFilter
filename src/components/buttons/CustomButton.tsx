import { ElementType } from "react";

const CustomButton = ({
  Icon,
  ...rest
}: { Icon: ElementType } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...rest} className="px-2 w-fit ">
      <Icon className="text-slate-500 text-base hover:text-slate-600  duration-300" />
    </button>
  );
};

export default CustomButton;
