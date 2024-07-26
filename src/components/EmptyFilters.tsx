/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from "react";
import { BiBox } from "react-icons/bi";

const EmptyFilters = (): ReactElement<any> => {
  return (
    <div
      className="q-filter-empty-filters"
    >
      <BiBox className="q-filter-empty-filters-text" />
      No filters have been added.
    </div>
  );
};

export default EmptyFilters;
