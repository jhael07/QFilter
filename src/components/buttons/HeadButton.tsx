import React, { ElementType } from "react";

const HeadButton = ({
  title,
  Icon,
  ...rest
}: { Icon: ElementType; title: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className="button-simple flex items-center gap-x-1.5" {...rest}>
      <p className="font-semibold text-slate-500">{title}</p>
      <Icon />
    </button>
  );
};

export default HeadButton;
