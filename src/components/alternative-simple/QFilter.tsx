import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import QFilterBuilder from "../../lib";
import { FilterOperator, FiltersUI } from "../../lib/types";
import { QFilterOption } from "../../types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BasicInput } from "../form";
import { CustomButton } from "../buttons";
import { MdModeEdit } from "react-icons/md";
import { FaInbox } from "react-icons/fa";

export const QFilter = <T,>({
  QFilter,
  columns,
}: {
  QFilter: QFilterBuilder<T>;
  columns: Array<QFilterOption<T>>;
}) => {
  const filtersArr = QFilter.getFilters;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setReRender] = useState(false);

  const [inputValue, setInputValue] = useState("");

  return (
    <div className="w-full bg-slate-50 p-2 mb-2 font-bold">
      QFilter
      <div className="flex gap-x-2 mt-4">
        <button
          className="p-2 border bg-slate-300"
          onClick={() => {
            QFilter.addConditionUI();
            setReRender((prev) => !prev);
          }}
        >
          add Condition
        </button>
        <button className="p-2 border bg-slate-300">add Group</button>
      </div>
      {filtersArr?.map((x, i, arr) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filter: FiltersUI<T> = x as any;

        if (filter.type === "comparisonOperator")
          return (
            <div key={i} className="w-full gap-x-4 flex border justify-center">
              <SelectComponent<T>
                reRenderFn={setReRender}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                item={x as any}
                options={columns}
                allowMultiple={true}
                // onClick={() => {
                //   //QFilter.update(filter.id, { ...filter, value: "example" }, filtersArr);
                //   setReRender((prev) => !prev);
                // }}
              />
              <SelectComponent />
              <BasicInput
                setValue={setInputValue}
                // onClick={() => {
                //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
                //   (x as any).value = inputValue;
                //   setReRender((prev) => !prev);
                // }}
                value={inputValue ?? filter.value}
              >
                <CustomButton
                  Icon={MdModeEdit}
                  onClick={() => {
                    // alert("hola");
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    // (x as any).value = inputValue;
                    // let { value } = x as FilterOperator<T>;

                    // const a = { ...x, value: inputValue } as FilterOperator<T>;
                    (x as FilterOperator<T>).value = inputValue;
                    // b.value = inputValue;

                    // console.log("b", x, filtersArr, arr, a, a == x);
                    // value = inputValue;
                    // arr.splice(i, 1, a);
                    console.log("a", x, filtersArr, arr);

                    // (x as any).value = inputValue;
                    setReRender((prev) => !prev);
                  }}
                />
                {/* 
                {mode === "edit" ? (
                  <CustomButton Icon={MdModeEdit} onClick={handleEditFn} />
                ) : (
                  <CustomButton Icon={FaSave} onClick={handleSaveFn} />
                )} */}
              </BasicInput>
            </div>
          );
      })}
      {filtersArr.map((x, i) => {
        return <p key={i}>{JSON.stringify(x, null, 2)}</p>;
      })}
    </div>
  );
};

const SelectComponent = <T,>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: {
    options?: Array<QFilterOption<T>>;
    item: FilterOperator<T>;
    reRenderFn: Dispatch<SetStateAction<boolean>>;
    allowMultiple?: boolean;
  }
) => {
  const { options, allowMultiple = false } = props;

  const [selectedValue, setSelectedValue] = useState<{
    hideOptions: boolean;
    value?: string | string[] | number | number[] | boolean | boolean[] | null;
  }>({ hideOptions: true });

  console.log(selectedValue);

  return (
    <div className="w-full relative">
      <div
        onClick={() => {
          setSelectedValue((prev) => ({ ...prev, hideOptions: !prev?.hideOptions }));
        }}
        className="border min-h-8 bg-white border-slate-300 rounded-md p-1.5 px-2 
    text-slate-600 outline-none text-left
w-full text-sm relative overflow-hidden"
      >
        {selectedValue?.value}
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
                    props.item.value = x.value;
                    setSelectedValue((prev) => ({
                      hideOptions: !prev.hideOptions,
                      value: x.value,
                    }));
                    props.reRenderFn((prev) => !prev);
                  }}
                  className="w-full text-left p-1.5 px-2 last:border-b-0 border-b hover:bg-slate-100 text-sm text-slate-500 "
                >
                  {x.label}
                </button>
              ) : (
                <div key={i} className="py-2 pl-2 flex gap-x-2">
                  <input
                    type="checkbox"
                    name={x.value}
                    checked={((selectedValue.value as string[]) ?? []).includes(x.value)}
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
