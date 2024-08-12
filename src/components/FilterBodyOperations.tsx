/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaLayerGroup } from "react-icons/fa";
import type { FiltersUI, Join } from "../lib/types";
import { addConditionUI, addGroupUI } from "../lib/utils/operations";
import type { ComparisonOperatorProps, FilterBodyOperationsProps } from "../types";
import { OPERATORS } from "../utils/string";
import SelectComponent from "./SelectComponent";
import { MdFilterListAlt } from "react-icons/md";
import { ReactElement } from "react";
import { CloseButtonGroup } from "./buttons/CloseButtonGroup";
import ColumnFilter from "./ColumnFilter";
import ColumnValue from "./ColumnValue";
import CloseButton from "./buttons/CloseButton";

const FilterBodyOperations = <T,>(props: FilterBodyOperationsProps<T>): ReactElement<any> => {
  const {
    filters,
    setReRender,
    columns,
    changesSave,
    operators,
    columnsConfig,
    logicalOperators,
    headerButtons,
  } = props;
  const logicalOperatorsOptions = [
    { value: "&&", label: logicalOperators?.["AND"] ?? "AND" },
    { value: "||", label: logicalOperators?.["OR"] ?? "OR" },
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
              columnsConfig={columnsConfig}
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
                <p>{headerButtons?.Group ?? "Group"}:</p>
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
  const {
    item,
    columns,
    reRenderFn,
    changesSave,
    arr,
    i,
    operators: OperatorsConfig,
    columnsConfig,
  } = props;

  const operatorsOptions = Object.keys(OPERATORS).map((x) => {
    const operatorAlias = (OperatorsConfig as any)?.[x] ?? x;
    const IsValid = operatorAlias !== "" ? true : false;
    return {
      value: x,
      label: IsValid ? operatorAlias : x,
    };
  }) as any;

  const colItem = columns?.[item.field as Join<T>];

  const defaultOptions = [
    { value: "Equals", label: OperatorsConfig?.["Equals"] ?? "Equals" },
    { value: "NotEquals", label: OperatorsConfig?.["NotEquals"] ?? "Not Equals" },
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
      <ColumnFilter title={columnsConfig?.["Column"] ?? "Column"}>
        <SelectComponent<T>
          reRenderFn={reRenderFn}
          item={item}
          options={columnsOptions}
          type="column"
        />
      </ColumnFilter>
      <ColumnFilter title={columnsConfig?.["Operator"] ?? "Operator"}>
        <SelectComponent<T>
          changesSave={changesSave}
          reRenderFn={reRenderFn}
          type="operator"
          item={item}
          options={colItem?.options ? defaultOptions : operatorsOptions}
          valueType={colItem?.type ?? "text"}
        />
      </ColumnFilter>

      {colItem?.render ? (
        <ColumnFilter title={columnsConfig?.["Value"] ?? "Value"}>
          {colItem.render?.(item as any, handleRenderUpdate)}
        </ColumnFilter>
      ) : colItem?.options ? (
        <ColumnFilter title={columnsConfig?.["Value"] ?? "Value"}>
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
          label={columnsConfig?.["Value"] ?? "Value"}
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
