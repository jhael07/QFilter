/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from "react";
import { BiBox } from "react-icons/bi";

const EmptyFilters = (): ReactElement<any> => {
  return (
    <div
      className="w-full h-full p-10 rounded-md border border-slate-300 bg-slate-100 
  text-slate-400/70 text-center"
    >
      <BiBox className="text-6xl mx-auto text-slate-300" />
      No filters have been added.
    </div>
  );
};

export default EmptyFilters;
