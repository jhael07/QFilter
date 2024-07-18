import { Dispatch, SetStateAction, useState } from "react";
import { FilterOperator, Join, OP } from "../../lib/types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaInbox } from "react-icons/fa";

const SelectComponent = <T,>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: {
    options?: Array<{
      label: string | number;
      value: string | number | boolean | undefined | null;
    }>;
    item: FilterOperator<T>;
    reRenderFn: Dispatch<SetStateAction<boolean>>;
    allowMultiple?: boolean;
    type?: "column" | "operator" | "value";
  }
) => {
  const { options, allowMultiple = false, type = "column" } = props;

  const [selectedValue, setSelectedValue] = useState<{
    hideOptions: boolean;
    value?: string | string[] | number | number[] | boolean | boolean[] | null;
  }>({ hideOptions: true });

  const [labelValue, setLabelValue] = useState<string | number>();

  return (
    <div className="w-full relative">
      <div
        onClick={() => {
          setSelectedValue((prev) => ({ ...prev, hideOptions: !prev?.hideOptions }));
        }}
        onBlur={() => {
          setSelectedValue((prev) => ({
            ...prev,
            hideOptions: true,
          }));
        }}
        className="border min-h-[2.1rem] bg-white hover:bg-slate-50 border-slate-300 rounded-md p-1.5 px-2 
    text-slate-600 outline-none text-left w-full text-sm relative overflow-hidden"
      >
        {props.item.type === "logicalOperator"
          ? props.options?.find((x) => x.value === props.item.operator)?.label
          : labelValue ?? selectedValue?.value}

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
          {options?.map((x, i) => (
            <>
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
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectComponent;
