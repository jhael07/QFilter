/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { QFilterBuilder } from "@/lib";
import { ERROR_CODES, QFilterOption } from "@/types";
import FilterBodyOperations from "@/components/FilterBodyOperations";
import { FilterOperator } from "@/lib/types";
import { errorMessage } from "@/utils/errors";
import { MdFilterListAlt } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { BiBox } from "react-icons/bi";

type QFilterProps<T> = {
  QFilter: QFilterBuilder<T>;
  columns: Array<QFilterOption<T>>;
  dataSource: Array<T>;
};
export const QFilterComponent = <T,>({
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

  const validation = (filters?: any[]): void => {
    filters?.forEach((x, _) => {
      const item: FilterOperator<any> = x as any;

      const column = columns.find(
        (col) =>
          col.value === item?.field?.toString() &&
          item.type === "comparisonOperator"
      );

      if (!item.children) {
        if (!column && item.type === "comparisonOperator")
          throw Error(errorMessage(ERROR_CODES.EmptyColumn));

        if (!item.operator)
          throw Error(
            errorMessage(ERROR_CODES.EmptyOperator, column?.label.toString())
          );

        if (!item.value)
          throw Error(
            errorMessage(ERROR_CODES.EmptyValue, column?.label.toString())
          );
      } else {
        if (item.children && item.children.length === 0)
          throw Error(
            errorMessage(ERROR_CODES.EmptyValue, column?.label.toString())
          );

        validation(item.children);
      }
    });

    if (changesNotSave) throw Error("Error: Please save all the filters.");
  };

  const handleFilter = () => {
    try {
      validation();
      setFilterResult(QFilter.build().filter(dataSource));
      setReRender((prev) => !prev);
    } catch (err: any) {
      alert(err.message ?? "One or more conditions are empty or invalid.");
    }
  };

  return (
    <div className="w-full bg-slate-50 p-4 mb-2 font-medium rounded-lg overflow-auto">
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
        {filtersArr.length > 0 ? (
          <FilterBodyOperations
            changesSave={setChangesNotSave}
            filters={filtersArr}
            setReRender={setReRender}
            columns={columns}
          />
        ) : (
          <div className="w-full p-4 rounded-md border border-slate-300 bg-slate-100 text-slate-400/70 text-center">
            <BiBox className="text-6xl mx-auto text-slate-300" />
            No filters have been added.
          </div>
        )}

        <div className="w-full p-2 flex justify-end">
          <button className="button-simple w-20" onClick={handleFilter}>
            Filter
          </button>
        </div>
      </div>

      <div className="mt-4 gap-4 grid">
        {filterResult ? (
          <Table columns={columns} dataSource={filterResult} />
        ) : (
          <Table
            columns={[
              { label: "Name" },
              { label: "Company Name" },
              { label: "Age" },
            ]}
            dataSource={dataSource}
          />
        )}
      </div>
    </div>
  );
};

const Table = ({
  columns,
  dataSource,
}: {
  columns: any[];
  dataSource: any[];
}) => {
  return (
    <div className="w-full border border-slate-200 overflow-hidden shadow-sm  rounded-lg">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            {columns.map((x) => {
              return (
                <th
                  className="last:border-r-0 border-r text-left px-2 pb-1.5 border-b p-3"
                  key={x.label}
                >
                  {x.label}
                </th>
              );
            })}
          </tr>
        </thead>

        {dataSource.map((x: any) => (
          <tbody>
            <tr className="w-full border-b">
              <>
                <td className=" border-r text-left px-3 py-1.5">{x["name"]}</td>
                <td className=" border-r text-left px-3 py-1">
                  {x["company"]?.name}
                </td>
                <td className=" border-r-0 text-left px-3 py-1">{x["age"]}</td>
              </>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};
