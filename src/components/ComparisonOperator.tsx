/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComparisonOperatorProps } from "@/types";
import CloseButton from "./buttons/CloseButton";
import SelectComponent from "./SelectComponent";
import { OPERATORS } from "../utils/string";
import ColumnFilter from "./ColumnFilter";
import ColumnValue from "./ColumnValue";
import { Join } from "@/lib/types";

const ComparisonOperator = <T,>(props: ComparisonOperatorProps<T>) => {
  const { item, columns, reRenderFn, arr, i, operators: OperatorsConfig, columnsConfig } = props;

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
          reRenderFn={reRenderFn}
          filter={item}
        />
      )}
      <CloseButton arr={arr as any} i={i} reRenderFn={reRenderFn} />
    </div>
  );
};

export default ComparisonOperator;
