const HeaderButton = ({
  title,
  ...rest
}: { title: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      className="bg-primary-900 p-2 rounded-md hover:bg-orange-400 shadow-sm transition-all hover:text-secondary-950 font-semibold"
    >
      {title}
    </button>
  );
};

export default HeaderButton;
