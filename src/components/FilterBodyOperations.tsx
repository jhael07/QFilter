/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaLayerGroup } from "react-icons/fa";
import type { FilterOperator, FiltersUI } from "../lib/types";
import { addConditionUI, addGroupUI } from "../lib/utils/operations";
import type { FilterBodyOperationsProps, QFilterOption } from "../types";
import { operators } from "../utils/string";
import CloseButton from "./buttons/CloseButton";
import ColumnFilter from "./ColumnFilter";
import ColumnValue from "./ColumnValue";
import SelectComponent from "./SelectComponent";
import { MdFilterListAlt } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";
import { CloseButtonGroup } from "./buttons/CloseButtonGroup";

const FilterBodyOperations = <T,>(props: FilterBodyOperationsProps<T>) => {
  const { filters, setReRender, columns, changesSave } = props;
  const logicalOperatorsOptions = [
    { value: "&&", label: "AND" },
    { value: "||", label: "OR" },
  ] as any;

  return (
    <div className="grid mx-auto gap-4 w-full">
      {filters?.map((x, i, arr) => {
        const filter: FiltersUI<T> = x as any;
        if (filter.type === "comparisonOperator")
          return (
            <ComparisonOperator
              key={x.id}
              arr={arr}
              i={i}
              changesSave={changesSave}
              columns={columns ?? []}
              item={x as any}
              reRenderFn={() => setReRender((prev) => !prev)}
            />
          );

        if (filter.type === "logicalOperator") {
          return (
            <div key={x.id} className="w-fit max-w-[4.5rem] ">
              <SelectComponent<T>
                reRenderFn={setReRender}
                type="operator"
                item={x as any}
                options={logicalOperatorsOptions}
              />
            </div>
          );
        }

        if (filter.type === "group" && filter.children)
          return (
            <div
              key={x.id}
              className="p-4 pt-6 bg-slate-100 border-l border-t rounded-lg   grid gap-4 relative"
            >
              <div className="w-full flex justify-between items-center pb-4 border-b">
                <p>Group:</p>
                <div className="flex gap-x-3 text-sm font-medium">
                  <button
                    className="button-simple"
                    onClick={() => {
                      addConditionUI(filter.children ?? []);
                      setReRender((prev) => !prev);
                    }}
                  >
                    <MdFilterListAlt />
                  </button>
                  <button
                    className="button-simple"
                    onClick={() => {
                      addGroupUI(filter.children ?? []);
                      setReRender((prev) => !prev);
                    }}
                  >
                    <FaLayerGroup />
                  </button>

                  <CloseButtonGroup
                    arr={arr}
                    i={i}
                    reRenderFn={() => setReRender((prev) => !prev)}
                  />
                </div>
              </div>
              <div className="ml-2 flex flex-col gap-4">
                <FilterBodyOperations {...props} filters={filter.children} />
              </div>
            </div>
          );
      })}
    </div>
  );
};

export default FilterBodyOperations;

type ComparisonOperatorProps<T> = {
  columns: Array<QFilterOption<T>>;
  reRenderFn: Dispatch<SetStateAction<boolean>>;
  item: FilterOperator<T>;
  changesSave: Dispatch<SetStateAction<boolean>>;
  arr: any[];
  i: number;
};
const ComparisonOperator = <T,>(props: ComparisonOperatorProps<T>) => {
  const { item, columns, reRenderFn, changesSave, arr, i } = props;

  const operatorsOptions = Object.keys(operators).map((x) => ({
    value: x,
    label: x,
  })) as any;

  return (
    <div className="w-full gap-4 flex flex-wrap lg:flex-nowrap justify-center items-end relative">
      <ColumnFilter title="Column">
        <SelectComponent<T>
          reRenderFn={reRenderFn}
          item={item}
          options={columns}
        />
      </ColumnFilter>
      <ColumnFilter title="Operator">
        <SelectComponent<T>
          reRenderFn={reRenderFn}
          type="operator"
          item={item}
          options={operatorsOptions}
        />
      </ColumnFilter>
      <ColumnValue
        type={columns.find((col) => col.value === item.field)?.type}
        changesSave={changesSave}
        reRenderFn={reRenderFn}
        filter={item}
      />
      <CloseButton arr={arr as any} i={i} reRenderFn={reRenderFn} />
    </div>
  );
};
