/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useState } from "react";
import { QFilterBuilder } from "../lib";
import { ERROR_CODES, QFilterOption } from "../types";
import FilterBodyOperations from "../components/FilterBodyOperations";
import { FilterOperator } from "../lib/types";
import { errorMessage } from "../utils/errors";
import { MdFilterListAlt } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import EmptyFilters from "./EmptyFilters";
import HeadButton from "./buttons/HeadButton";

type QFilterProps<T> = {
  QFilter: QFilterBuilder<T>;
  columns: Array<QFilterOption<T>>;
  dataSource: Array<T>;
};
export const QFilterComponent = <T,>({
  QFilter,
  columns,
  dataSource,
}: QFilterProps<T>): ReactElement<any> => {
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
      setFilterResult(QFilter.build().filter(dataSource));
      setReRender((prev) => !prev);
    } catch (err: any) {
      alert(err.message ?? "One or more conditions are empty or invalid.");
    }
  };

  const handleReset = () => {
    const deleteCount = QFilter.getFilters.length;
    QFilter.getFilters.splice(0, deleteCount);
    setFilterResult(dataSource);
    setReRender((prev) => !prev);
  };

  return (
    <div className="w-full bg-slate-50 p-4 mb-2 font-medium rounded-lg overflow-auto  relative">
      <div className="flex gap-x-4 pt-4 pb-4 mb-4 border-b sticky bg-slate-50 -top-4 z-30">
        <HeadButton title="Filter" Icon={MdFilterListAlt} onClick={handleAddCondition} />
        <HeadButton title="Group" Icon={FaLayerGroup} onClick={handleAddGroup} />
      </div>
      <div className="flex flex-col gap-4  ">
        {filtersArr.length > 0 ? (
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

        <div className="mt-4 gap-4 grid">
          {filterResult ? (
            <Table columns={columns} dataSource={filterResult} />
          ) : (
            <Table
              columns={[{ label: "Name" }, { label: "Company Name" }, { label: "Age" }]}
              dataSource={dataSource}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Table = ({ columns, dataSource }: { columns: any[]; dataSource: any[] }) => {
  return (
    <div className="w-full border border-slate-300 overflow-hidden shadow-sm  rounded-lg">
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
                <td className=" border-r text-left px-3 py-1">{x["company"]?.name}</td>
                <td className=" border-r-0 text-left px-3 py-1">{x["age"]}</td>
              </>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};
