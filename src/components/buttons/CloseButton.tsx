import { IoClose } from "react-icons/io5";

const CloseButton = ({ ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      className="  rounded-full h-6 w-6 bg-red-600 hover:bg-red-700 flex items-center text-center
 justify-center absolute -top-2 -right-2 transition-all"
    >
      <IoClose className="text-white " />
    </button>
  );
};

export default CloseButton;
