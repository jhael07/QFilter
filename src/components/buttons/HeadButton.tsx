import { ButtonHTMLAttributes, ElementType } from "react";

const HeadButton = ({
  title,
  Icon,
  ...rest
}: { Icon: ElementType; title: string } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className="q-filter-header-btn button-simple" {...rest}>
      <p className="q-filter-header-text">{title}</p>
      <Icon />
    </button>
  );
};

export default HeadButton;
