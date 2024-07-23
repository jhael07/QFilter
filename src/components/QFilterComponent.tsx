/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useRef, useState } from "react";
import { QFilterBuilder } from "../lib";
import { ERROR_CODES, QFilterOption } from "../types";
import FilterBodyOperations from "../components/FilterBodyOperations";
import { FilterOperator } from "../lib/types";
import { errorMessage } from "../utils/errors";
import { MdFilterListAlt } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import EmptyFilters from "./EmptyFilters";
import HeadButton from "./buttons/HeadButton";
import QFilter from "../lib/QFilter";

type QFilterProps<T> = {
  columns: Array<QFilterOption<T>>;
  onFilter: (data: QFilter<T>) => void;
};

/**
 * QFilterComponent
 * @template T - The type of data being filtered.
 * @param {QFilterProps<T>} props - The props for the component.
 * @returns {ReactElement<any>} The filter component.
 */
export const QFilterComponent = <T,>({ columns, onFilter }: QFilterProps<T>): ReactElement<any> => {
  const [changesNotSave, setChangesNotSave] = useState(false);
  const [_, setReRender] = useState(false);

  // Create a ref to hold the builder instance
  const QFilter = useRef<QFilterBuilder<T> | null>(null);

  // Initialize the builder only if it doesn't already exist
  if (!QFilter.current) QFilter.current = new QFilterBuilder<T>();

  const filtersArr = QFilter.current.getFilters;

  const handleAddCondition = () => {
    QFilter.current?.addConditionUI();
    setReRender((prev) => !prev);
  };

  const handleAddGroup = () => {
    QFilter.current?.group([]);
    setReRender((prev) => !prev);
  };

  const validation = (filters?: any[]): void => {
    filters?.forEach((x, _) => {
      const item: FilterOperator<any> = x as any;

      const column = columns.find(
        (col) => col.value === item?.field?.toString() && item.type === "comparisonOperator"
      );

      if (!item.children) {
        if (!column && item.type === "comparisonOperator")
          throw Error(errorMessage(ERROR_CODES.EmptyColumn));

        if (!item.operator)
          throw Error(errorMessage(ERROR_CODES.EmptyOperator, column?.label.toString()));

        if (!item.value)
          throw Error(errorMessage(ERROR_CODES.EmptyValue, column?.label.toString()));
      } else {
        if (item.children && item.children.length === 0)
          throw Error(errorMessage(ERROR_CODES.EmptyValue, column?.label.toString()));

        validation(item.children);
      }
    });

    if (changesNotSave) throw Error("Error: Please save all the filters.");
  };

  const handleFilter = () => {
    try {
      validation();
      console.log(QFilter.current?.build().gridify());
      onFilter(QFilter.current!.build());
    } catch (err: any) {
      alert(err.message ?? "One or more conditions are empty or invalid.");
    }
  };

  const handleReset = () => {
    const deleteCount = QFilter.current?.getFilters.length;
    QFilter.current?.getFilters.splice(0, deleteCount);
    onFilter(QFilter.current!.build());
    setReRender((prev) => !prev);
  };

  return (
    <div className="w-full max-w-7xl bg-slate-50 p-4 mb-2 font-medium rounded-lg   relative">
      <div className="flex gap-x-4 pt-4 pb-4 mb-4 border-b sticky bg-slate-50 -top-4 z-30">
        <HeadButton title="Filter" Icon={MdFilterListAlt} onClick={handleAddCondition} />
        <HeadButton title="Group" Icon={FaLayerGroup} onClick={handleAddGroup} />
      </div>
      <div className="flex flex-col gap-4  ">
        {filtersArr?.length > 0 ? (
          <FilterBodyOperations
            changesSave={setChangesNotSave}
            filters={filtersArr}
            setReRender={setReRender}
            columns={columns}
          />
        ) : (
          <EmptyFilters />
        )}
      </div>

      <div className="sticky -bottom-4 w-full bg-slate-50 pb-4">
        <div className="w-full p-2 flex justify-end gap-x-4 border-t pt-4 mt-6">
          <button className="button-simple w-20" onClick={handleReset}>
            Reset
          </button>
          <button className="button-simple w-20" onClick={handleFilter}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
