/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FilterColumnProps } from "../types";
import { MdModeEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import HeaderColumn from "./HeaderColumn";
import CustomButton from "./buttons/CustomButton";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BasicInput } from "./form";
import { FaInbox } from "react-icons/fa";

const FilterColumn = <T,>(props: FilterColumnProps<T>) => {
  const { title, value, type = "input", options, item, QFilter } = props;

  const [mode, setMode] = useState<"edit" | "save">("edit");
  const [Selectvalue, setSelectValue] = useState<any>(value);
  const [showOption, setShowOption] = useState(false);

  const handleEditFn = () => setMode("save");
  const handleSaveFn = () => setMode("edit");

  const [inputValue, setInputValue] = useState<any>("");

  console.log(inputValue);

  return (
    <div key={title} className="lg:w-[33.33%]  rounded-md ">
      <HeaderColumn title={title} />
      <div className="flex items-center gap-x-1 pt- p-2 px-4">
        {title === "Value" ? (
          <BasicInput setValue={setInputValue} onClick={() => {}} value={value}>
            {mode === "edit" ? (
              <CustomButton Icon={MdModeEdit} onClick={handleEditFn} />
            ) : (
              <CustomButton Icon={FaSave} onClick={handleSaveFn} />
            )}
          </BasicInput>
        ) : null}
        {type === "select" ? (
          <div className="w-full relative">
            <button
              onClick={() => {
                setShowOption((prev) => !prev);
              }}
              className="border min-h-8 bg-white border-slate-300 rounded-md p-1.5 px-2 
              text-slate-600 outline-none text-left
    w-full text-sm relative overflow-hidden"
            >
              {Selectvalue ?? value}
              <button className="absolute  right-0 top-0 hover:bg-slate-100 bg-slate-100 h-full px-1 border-l border-l-slate-200">
                {showOption ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </button>
            </button>
            {showOption && (
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
                  <button
                    onClick={() => {
                      setSelectValue(x.label);
                      setShowOption(false);
                    }}
                    key={i}
                    className="w-full text-left p-1.5 px-2 last:border-b-0 border-b hover:bg-slate-100 text-sm text-slate-500 "
                  >
                    {x.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : // <SelectComponent selectValue={Selectvalue} setSelectValue={setSelectValue} />
        null}

        {type === "action" ? value : null}
      </div>
    </div>
  );
};

export default FilterColumn;
