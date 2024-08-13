/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import { FilterOperator, Join, OP } from "../lib/types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaInbox } from "react-icons/fa";
import { SelectOption } from "../types";
import EmptyFiltersOptions from "./EmptyFilterOptions";

type SelectComponent<T> = {
  options?: Array<SelectOption>;
  item: FilterOperator<T>;
  reRenderFn: Dispatch<SetStateAction<boolean>>;
  allowMultiple?: boolean;
  type?: "column" | "operator" | "value";
  valueType?: "number" | "text" | "date" | "boolean";
};

const SelectComponent = <T,>(props: SelectComponent<T>): ReactElement<any> => {
  const { options, allowMultiple = false, type = "column" } = props;

  const [selectedValue, setSelectedValue] = useState<{
    hideOptions: boolean;
    value?: string | string[] | number | number[] | boolean | boolean[] | null;
  }>({ hideOptions: true, value: props.item.field?.toString() ?? "" });

  const [labelValue, setLabelValue] = useState<string | number>();
  const [filter, setFilter] = useState<string>("");

  const operatorText = [
    "Equals",
    "NotEquals",
    "Contains",
    "NotContains",
    "StartsWith",
    "NotStartsWith",
    "EndsWith",
    "NotEndsWith",
    "IsEmpty",
    "IsNotEmpty",
    "IsNull",
    "IsNotNull",
    "IsUndefined",
    "IsNotUndefined",
  ];

  const operatorNumber = [
    "Equals",
    "NotEquals",
    "LessThan",
    "LessThanOrEqual",
    "GreaterThan",
    "GreaterThanOrEqual",
  ];

  const operatorDate = [
    "IsDateGreaterThan",
    "IsDateGreaterThanOrEqual",
    "IsDateLessThan",
    "IsDateLessThanOrEqual",
    "IsDateEqualTo",
    "IsDateNotEqualTo",
  ];

  const optionsFilter = options?.filter((option) => {
    if (type !== "operator") return option;
    if (props.valueType === "number") {
      return operatorNumber.includes(option?.value?.toString() ?? "");
    }
    if (props.valueType === "text") {
      return operatorText.includes(option?.value?.toString() ?? "");
    }
    if (props.valueType === "date") {
      return operatorDate.includes(option?.value?.toString() ?? "");
    }

    return option;
  });

  useEffect(() => {
    if (type === "value") {
      setLabelValue("");
    } else {
      setLabelValue(
        props.item.type === "logicalOperator"
          ? props.options?.find((x) => x.value === props.item.operator)?.label
          : labelValue ?? selectedValue?.value?.toString()
      );
    }
  }, []);

  const optionsSelectArr = optionsFilter?.filter((x) =>
    x.label
      ?.toString()
      .toLowerCase()
      .includes(filter?.toString().toLowerCase() ?? "")
  );

  const handleOnClick = () => {
    setSelectedValue((prev) => ({
      ...prev,
      hideOptions: !prev?.hideOptions,
    }));
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div onClick={handleOnClick} className="q-filter-select-container">
        <input
          type="text"
          autoComplete="none"
          autoCapitalize="none"
          autoCorrect="none"
          style={{ width: "100%" }}
          className="q-filter-outline-none q-filter-bg-transparent "
          value={labelValue ?? ""}
          onChange={(e) => {
            setLabelValue(e.target.value);
            setFilter(e.target.value);
          }}
        />

        <button className="q-filter-select-arrow">
          {!selectedValue?.hideOptions ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>

      {!(selectedValue?.hideOptions ?? true) && (
        <div className="q-filter-empty-option">
          {!options ? (
            <div className="q-filter-empty-option-container">
              <FaInbox className="q-filter-text-5xl" />
              No data
            </div>
          ) : null}

          {optionsSelectArr && optionsSelectArr?.length > 0 ? (
            optionsSelectArr?.map((x, i) => {
              const handleOnClick = () => {
                if (type === "column") props.item.field = x.value as Join<T>;
                if (type === "operator") props.item.operator = x.value as OP;
                if (type === "value") props.item.value = x.value;

                setSelectedValue((prev) => ({
                  hideOptions: !prev.hideOptions,
                  value: x.value,
                }));
                setLabelValue(x.label);
                setFilter("");
                props.reRenderFn((prev) => !prev);
              };

              return (
                <div key={i}>
                  {!allowMultiple ? (
                    <button key={i} onClick={handleOnClick} className="q-filter-select_input">
                      {x.label}
                    </button>
                  ) : (
                    <div key={i} className="py-2 pl-2 flex gap-x-2">
                      <input
                        type="checkbox"
                        name={x.value?.toString()}
                        checked={((selectedValue.value as string[]) ?? []).includes(
                          x.value?.toString() ?? ""
                        )}
                        onChange={(e) => {
                          setSelectedValue((prev) => {
                            let values: string[] = (prev.value as string[]) ?? ([] as []);

                            if (e.target.checked) values.push(e.target.name);
                            else values = values.filter((p) => p !== e.target.name);

                            return { ...prev, value: values };
                          });
                        }}
                      />
                      {x.label}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <EmptyFiltersOptions />
          )}
        </div>
      )}
    </div>
  );
};

export default SelectComponent;
