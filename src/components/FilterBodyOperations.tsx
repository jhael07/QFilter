/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaLayerGroup } from "react-icons/fa";
import type { FiltersUI, Join } from "../lib/types";
import { addConditionUI, addGroupUI } from "../lib/utils/operations";
import type { ComparisonOperatorProps, FilterBodyOperationsProps } from "../types";
import { operators } from "../utils/string";
import SelectComponent from "./SelectComponent";
import { MdFilterListAlt } from "react-icons/md";
import { ReactElement } from "react";
import { CloseButtonGroup } from "./buttons/CloseButtonGroup";
import ColumnFilter from "./ColumnFilter";
import ColumnValue from "./ColumnValue";
import CloseButton from "./buttons/CloseButton";

const FilterBodyOperations = <T,>(props: FilterBodyOperationsProps<T>): ReactElement<any> => {
  const { filters, setReRender, columns, changesSave, operators } = props;
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
              operators={operators}
              key={x.id}
              arr={arr}
              i={i}
              changesSave={changesSave}
              columns={columns ?? {}}
              item={x as any}
              reRenderFn={() => setReRender((prev) => !prev)}
            />
          );

        if (filter.type === "logicalOperator") {
          return (
            <div key={x.id} style={{ width: "100%" }}>
              <div key={x.id} style={{ maxWidth: "4.5rem" }}>
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

const ComparisonOperator = <T,>(props: ComparisonOperatorProps<T>) => {
  const { item, columns, reRenderFn, changesSave, arr, i, operators: OperatorsConfig } = props;

  const operatorsOptions = Object.keys(operators).map((x) => {
    const operatorAlias = (OperatorsConfig as any)?.[x];
    const IsValid = operatorAlias && operatorAlias !== "" ? true : false;
    console.log({ operatorAlias, x, OperatorsConfig });
    return {
      value: x,
      label: IsValid ? operatorAlias : x,
    };
  }) as any;

  const colItem = columns?.[item.field as Join<T>];

  const defaultOptions = [
    { label: "Equals", value: "Equals" },
    { label: "NotEquals", value: "NotEquals" },
  ];

  const columnsOptions = Object.entries<any>(columns).map((item) => ({
    label: item[1].label,
    value: item[0],
  }));

  const handleRenderUpdate = (value: string | number | boolean | undefined | null) => {
    item.value = value;
    reRenderFn((prev) => !prev);
  };

  return (
    <div className="comparison-operator_container">
      <ColumnFilter title="Column">
        <SelectComponent<T>
          reRenderFn={reRenderFn}
          item={item}
          options={columnsOptions}
          type="column"
        />
      </ColumnFilter>
      <ColumnFilter title="Operator">
        <SelectComponent<T>
          reRenderFn={reRenderFn}
          type="operator"
          item={item}
          options={colItem?.options ? defaultOptions : operatorsOptions}
          valueType={colItem?.type ?? "text"}
        />
      </ColumnFilter>

      {colItem?.render ? (
        <ColumnFilter title="Value">
          {colItem.render?.(item as any, handleRenderUpdate)}
        </ColumnFilter>
      ) : colItem?.options ? (
        <ColumnFilter title="Value">
          <SelectComponent<T>
            reRenderFn={reRenderFn}
            type="value"
            item={item}
            options={colItem?.options}
            valueType={colItem?.type ?? "text"}
          />
        </ColumnFilter>
      ) : (
        <ColumnValue
          type={colItem?.type}
          changesSave={changesSave}
          reRenderFn={reRenderFn}
          filter={item}
        />
      )}
      <CloseButton arr={arr as any} i={i} reRenderFn={reRenderFn} />
    </div>
  );
};
