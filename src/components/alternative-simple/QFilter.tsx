/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import QFilterBuilder from "../../lib";
import { ERROR_CODES, QFilterOption } from "../../types";
import FilterBodyOperations from "./FilterBodyOperations";
import { FilterOperator } from "../../lib/types";
import { errorMessage } from "../../utils/errors";
import { MdFilterListAlt } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";

type QFilterProps<T> = {
  QFilter: QFilterBuilder<T>;
  columns: Array<QFilterOption<T>>;
  dataSource: Array<T>;
};
export const QFilter = <T,>({
  QFilter,
  columns,
  dataSource,
}: QFilterProps<T>) => {
  const [filterResult, setFilterResult] = useState<any>();
  const [changesNotSave, setChangesNotSave] = useState(false);
  const [_, setReRender] = useState(false);

  const filtersArr = QFilter.getFilters;

  const handleAddCondition = () => {
    QFilter.addConditionUI();
    setReRender((prev) => !prev);
  };

  const handleAddGroup = () => {
    QFilter.group([]);
    setReRender((prev) => !prev);
  };

  const handleFilter = () => {
    try {
      QFilter.getFilters.forEach((x) => {
        const item: FilterOperator<any> = x as any;

        const column = columns.find(
          (col) =>
            col.value === item?.field?.toString() &&
            item.type === "comparisonOperator"
        );

        if (!column) throw Error(errorMessage(ERROR_CODES.EmptyColumn));

        if (!item.operator)
          throw Error(
            errorMessage(ERROR_CODES.EmptyOperator, column.label.toString())
          );

        if (!item.value)
          throw Error(
            errorMessage(ERROR_CODES.EmptyValue, column.label.toString())
          );

        if (item.children && item.children.length === 0)
          throw Error(
            errorMessage(ERROR_CODES.EmptyValue, column.label.toString())
          );
      });

      if (changesNotSave) throw Error("Error: Please save all the filters.");

      setFilterResult(QFilter.build().filter(dataSource));
      setReRender((prev) => !prev);
    } catch (err: any) {
      alert(err.message ?? "One or more conditions are empty or invalid.");
    }
  };

  return (
    <div className="w-full bg-slate-50 p-4 mb-2 font-medium rounded-lg">
      <div className="flex gap-x-2 mt-4 mb-4">
        <button
          className="button-simple flex items-center gap-x-1"
          onClick={handleAddCondition}
        >
          <p className="font-semibold text-slate-500">Filter</p>
          <MdFilterListAlt />
        </button>
        <button
          className="button-simple flex items-center gap-x-2"
          onClick={handleAddGroup}
        >
          <p className="font-semibold text-slate-500">Group</p>
          <FaLayerGroup />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <FilterBodyOperations
          changesSave={setChangesNotSave}
          filters={filtersArr}
          setReRender={setReRender}
          columns={columns}
        />

        <div className="w-full p-2 flex justify-end">
          <button className="button-simple w-20" onClick={handleFilter}>
            Filter
          </button>
        </div>
      </div>

      <div className="mt-4 gap-4 grid">
        {filterResult ? (
          <p>{JSON.stringify(filterResult, null, 2)}</p>
        ) : (
          filtersArr.map((x, i) => {
            return <p key={i}>{JSON.stringify(x, null, 10)}</p>;
          })
        )}
      </div>
    </div>
  );
};
