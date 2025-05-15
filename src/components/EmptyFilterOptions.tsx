/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from "react";
import { BiBox } from "react-icons/bi";

const EmptyFiltersOptions = (): ReactElement<any> => {
  return (
    <div className="w-full h-full p-2 py-8 rounded-md text-slate-400 text-center">
      <BiBox className="text-6xl mx-auto text-slate-300" />
      <p className="text-sm">No filters match the search keyword</p>
    </div>
  );
};

export default EmptyFiltersOptions;
