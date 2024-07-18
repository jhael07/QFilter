/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import QFilterBuilder from "../lib";
import { FilterLogicalOperator, FilterOperator } from "../lib/types";

import { HeaderButton } from "./buttons";
import { QFilterConfig } from "../types";
import { logicalOperationCondition } from "../utils/string";
import CloseButton from "./buttons/CloseButton";
import FilterBody from "./FilterBody";

const QfilterComponent = <T,>({
  filterBuilder,
  config,
}: {
  filterBuilder: QFilterBuilder<T>;
  config?: QFilterConfig<T>;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setFiltersChange] = useState(false);

  const filters = filterBuilder.getFilters;

  const handleDelete = (i: number, arr: any[]) => {
    if (i !== 0 && arr[i - 1].type === "logicalOperator") arr.splice(i - 1, 1);
    else if (arr[i + 1]?.type === "logicalOperator") arr.splice(i, 1);
    else arr.splice(i, 1);
    setFiltersChange((prev) => !prev);
  };

  const createGroup = (item: any, children?: boolean) => {
    return (
      <div
        key={item.id}
        className={`p-4 flex flex-col gap-2 first:pl-0 border-l border-slate-300 rounded-md
         bg-slate-400/30 relative ${children ? "ml-[2.5%] w-full" : ""}`}
      >
        <p className="text-slate-800 font-bold w-full">Group: </p>
        <div className=" transition-all duration-300">
          <CloseButton
            onClick={() => {
              filterBuilder.remove(item.id);
              setFiltersChange((prev) => !prev);
            }}
          />
        </div>
        <div className="flex flex-wrap gap-6 items-start">
          {item?.children?.map((item: any, i: number, arr: any[]) => {
            if (item.children) return createGroup(item, true);
            if (item.type === "logicalOperator") {
              return (
                <div key={item.id} className="w-full">
                  <div
                    key={item.id}
                    className="bg-slate-100 text-slate-800 font-semibold p-2 rounded-md shadow-md w-fit 
              px-6 h-fit relative group transition-all  cursor-default"
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <CloseButton onClick={() => {}} />
                    </div>
                    <p>{logicalOperationCondition((item as FilterLogicalOperator<T>).operator)}</p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className=" text-slate-800 font-semibold shadow-md relative group transition-all 
                w-full h-fit"
              >
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <CloseButton onClick={() => handleDelete(i, arr)} />
                </div>
                <div className=" rounded-lg">
                  <FilterBody QFilter={QFilterBuilder as any} item={item as FilterOperator<T>} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className="text-white bg-slate-100 p-4 mx-auto rounded-lg gap-4  overflow-y-scroll overflow-hidden 
   flex flex-col w-full"
    >
      <div className="p-2 flex gap-x-6 relative">
        <HeaderButton
          title="Add Condition"
          onClick={() => {
            // filterBuilder.condition("name", "GreaterThanOrEqual", "e");
            setFiltersChange((prev) => !prev);
          }}
        />
        <HeaderButton title="Add Group" />
      </div>

      {filters.length === 0 ? (
        <div className="text-slate-800">No filters have been applied</div>
      ) : null}
      {filters.map((item, i, arr) => {
        if (item.type === "comparisonOperator") {
          return (
            <div
              key={item.id}
              className=" text-slate-800 font-semibold shadow-md relative group rounded-md
               transition-all w-full   h-fit"
            >
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                <CloseButton onClick={() => handleDelete(i, arr)} />
              </div>
              <div className=" rounded-lg ">
                <FilterBody
                  QFilter={filterBuilder}
                  options={config?.columns}
                  item={item as FilterOperator<T>}
                />
              </div>
            </div>
          );
        }
        if (item.type === "group") {
          return createGroup(item);
        }
        if (item.type === "logicalOperator") {
          return (
            <div
              className="bg-slate-100 text-slate-800 font-semibold p-2 rounded-md shadow-md w-fit border 
            px-6 h-fit relative group transition-all  cursor-default"
            >
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                <CloseButton onClick={() => {}} />
              </div>
              <p>{logicalOperationCondition((item as FilterLogicalOperator<T>).operator)}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default QfilterComponent;
