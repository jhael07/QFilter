/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import { FilterOperator, Join, OP } from "../lib/types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaInbox } from "react-icons/fa";
import { SelectOption } from "../types";
import EmptyFiltersOptions from "./EmptyFilterOptions";

const SelectComponent = <T,>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: {
    options?: Array<SelectOption>;
    item: FilterOperator<T>;
    reRenderFn: Dispatch<SetStateAction<boolean>>;
    allowMultiple?: boolean;
    type?: "column" | "operator" | "value";
    valueType?: "number" | "text" | "date" | "boolean";
  }
): ReactElement<any> => {
  const { options, allowMultiple = false, type = "column" } = props;

  const [selectedValue, setSelectedValue] = useState<{
    hideOptions: boolean;
    value?: string | string[] | number | number[] | boolean | boolean[] | null;
  }>({ hideOptions: true, value: props.item.field?.toString() ?? "" });

  const [labelValue, setLabelValue] = useState<string | number>();
  const [filter, setFilter] = useState<string>("");

  const operatorNumber = [
    "Contains",
    "NotContains",
    "StartsWith",
    "NotStartsWith",
    "EndsWith",
    "NotEndsWith",
  ];

  const operatorText = ["LessThan", "LessThanOrEqual", "GreaterThan", "GreaterThanOrEqual"];

  const optionsFilter = options?.filter((option) => {
    // if (props.options[0].)
    // return operatorSelect.includes(option.label.toString());
    if (props.valueType === "number") return !operatorNumber.includes(option.label.toString());
    if (props.valueType === "text") return !operatorText.includes(option.label.toString());
    // if (props.valueType && ) return !operatorText.includes(option.label.toString());

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
      .toString()
      .toLowerCase()
      .includes(filter?.toString().toLowerCase() ?? "")
  );

  return (
    <div className="w-full relative">
      <div
        onClick={() => {
          setSelectedValue((prev) => ({
            ...prev,
            hideOptions: !prev?.hideOptions,
          }));
        }}
        className="border min-h-[2.1rem] bg-white hover:bg-slate-50 border-slate-300 rounded-md p-1.5 px-2 
    text-slate-600 outline-none text-left w-full text-sm relative overflow-hidden"
      >
        <input
          type="text"
          autoComplete="none"
          autoCapitalize="none"
          autoCorrect="none"
          className="outline-none bg-transparent"
          value={labelValue ?? ""}
          onChange={(e) => {
            setLabelValue(e.target.value);
            setFilter(e.target.value);
          }}
        />

        <button className="absolute right-0 top-0 hover:bg-slate-100 bg-slate-100 h-full px-1 border-l border-l-slate-200">
          {!selectedValue?.hideOptions ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>

      {!(selectedValue?.hideOptions ?? true) && (
        <div
          className="absolute w-full border max-h-[11rem] overflow-y-scroll option-scroll
   border-slate-300 shadow-md top-10 bg-white z-50 rounded-md overflow-hidden flex flex-col"
        >
          {!options ? (
            <div className="w-full  min-h-[10rem] text-sm flex flex-col gap-2 items-center justify-center text-slate-400">
              <FaInbox className="text-5xl" />
              No data
            </div>
          ) : null}

          {optionsSelectArr && optionsSelectArr?.length > 0 ? (
            optionsSelectArr?.map((x, i) => (
              <div key={i}>
                {!allowMultiple ? (
                  <button
                    key={i}
                    onClick={() => {
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
                    }}
                    className="w-full text-left p-1.5 px-2 last:border-b-0 border-b hover:bg-slate-50 text-sm text-slate-500 "
                  >
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
            ))
          ) : (
            <EmptyFiltersOptions />
          )}
        </div>
      )}
    </div>
  );
};

export default SelectComponent;
