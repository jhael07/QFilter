/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaLayerGroup } from "react-icons/fa";
import type { FilterOperator, FiltersUI } from "../lib/types";
import { addConditionUI, addGroupUI } from "../lib/utils/operations";
import type { FilterBodyOperationsProps, QFilterOption } from "../types";
import { operators } from "../utils/string";
import SelectComponent from "./SelectComponent";
import { MdFilterListAlt } from "react-icons/md";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { CloseButtonGroup } from "./buttons/CloseButtonGroup";
import ColumnFilter from "./ColumnFilter";
import ColumnValue from "./ColumnValue";
import CloseButton from "./buttons/CloseButton";

const FilterBodyOperations = <T,>(props: FilterBodyOperationsProps<T>): ReactElement<any> => {
  const { filters, setReRender, columns, changesSave } = props;
  const logicalOperatorsOptions = [
    { value: "&&", label: "AND" },
    { value: "||", label: "OR" },
  ] as any;

  return (
    <div className="q-filter-operation-container">
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
            <div style={{width:"100%"}}>
              <div key={x.id} style={{maxWidth:'4.5rem'}} >
                <SelectComponent<T>
                  reRenderFn={setReRender}
                  type="operator"
                  item={x as any}
                  options={logicalOperatorsOptions}
                />
              </div>
            </div>
          );
        }

        if (filter.type === "group" && filter.children)
          return (
            <div key={x.id} className="q-filter-group_container">
              <div className="q-filter-group-header">
                <p>Group:</p>
                <div className="q-filter-group-button">
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
              <div className="q-filter-body ">
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

  const optionsForSelectFromItem = columns.find((col) => col.value === item.field)?.options;
  const defaultOptions = [
    { label: "Equals", value: "Equals" },
    { label: "NotEquals", value: "NotEquals" },
  ];

  return (
    <div className="comparison-operator_container">
      <ColumnFilter title="Column">
        <SelectComponent<T> reRenderFn={reRenderFn} item={item} options={columns} type="column" />
      </ColumnFilter>
      <ColumnFilter title="Operator">
        <SelectComponent<T>
          reRenderFn={reRenderFn}
          type="operator"
          item={item}
          options={optionsForSelectFromItem ? defaultOptions : operatorsOptions}
          valueType={columns.find((col) => col.value === item.field)?.type ?? "text"}
        />
      </ColumnFilter>
      {columns.find((col) => col.value === item.field)?.options ? (
        <ColumnFilter title="Value">
          <SelectComponent<T>
            reRenderFn={reRenderFn}
            type="value"
            item={item}
            options={columns.find((col) => col.value === item.field)?.options}
            valueType={columns.find((col) => col.value === item.field)?.type ?? "text"}
          />
        </ColumnFilter>
      ) : (
        <ColumnValue
          type={columns.find((col) => col.value === item.field)?.type}
          changesSave={changesSave}
          reRenderFn={reRenderFn}
          filter={item}
        />
      )}
      <CloseButton arr={arr as any} i={i} reRenderFn={reRenderFn} />
    </div>
  );
};
