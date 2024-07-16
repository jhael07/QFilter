/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { FilterColumnProps, QFilterOption } from "../types";
import { MdModeEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { FaInbox } from "react-icons/fa";
import HeaderColumn from "./HeaderColumn";
import CustomButton from "./buttons/CustomButton";
import { IoIosArrowDown } from "react-icons/io";
import { BasicInput } from "./form";

const FilterColumn = (props: FilterColumnProps) => {
  const { title, value, type = "input" } = props;

  const [Selectvalue, setSelectValue] = useState<any>("Selecciona una opcion");
  const [mode, setMode] = useState<"edit" | "save">("edit");

  const handleEditFn = () => setMode("save");
  const handleSaveFn = () => setMode("edit");

  return (
    <div key={title} className="lg:w-[33.33%]  ">
      <HeaderColumn title={title} />
      <div className="flex items-center gap-x-1 pt- p-2 px-4">
        {title === "Value" ? (
          <BasicInput
            onClick={() => {
              setMode("save");
            }}
            value={value}
          >
            {mode === "edit" ? (
              <CustomButton Icon={MdModeEdit} onClick={handleEditFn} />
            ) : (
              <CustomButton Icon={FaSave} onClick={handleSaveFn} />
            )}
          </BasicInput>
        ) : null}
        {type === "select" ? (
          <SelectComponent selectValue={Selectvalue} setSelectValue={setSelectValue} />
        ) : null}

        {type === "action" ? value : null}
      </div>
    </div>
  );
};

export default FilterColumn;

const SelectComponent = ({
  selectValue,
  setSelectValue,
  options,
}: {
  setSelectValue?: Function;
  selectValue: any;
  options?: QFilterOption[] | undefined;
}) => {
  const ref = useRef<any>();

  const [openOptions, setOpenOptions] = useState(false);

  return (
    <div className="relative w-full">
      <div
        // contentEditable={editContent}
        onClick={() => {
          setOpenOptions(true);
        }}
        className={`border border-slate-300 rounded-md p-1.5 hover:bg-slate-50 overflow-hidden relative cursor-pointer 
            text-slate-600 outline-none w-full text-sm bg-white whitespace-nowrap`}
      >
        {selectValue}

        <div className="absolute top-0 right-0 bg-slate-100 px-0.5 h-full flex flex-col justify-center border-l">
          <IoIosArrowDown className="text-sm" />
        </div>
      </div>

      {openOptions && (
        <div
          ref={ref}
          onBlur={() => {
            setOpenOptions(false);
          }}
          className={`absolute z-50  w-full option-pos  max-h-[11rem] overflow-y-scroll option-scroll ${"top-10"}
       bg-slate-50 rounded-md shadow-md text-sm border border-slate-300`}
        >
          <div
            className="fixed w-full h-screen top-0 left-0 -z-10 overflow-auto"
            onClick={() => {
              setOpenOptions(false);
            }}
          ></div>

          <div className="flex flex-col z-50 min-h-[10rem]">
            {options && options?.length < 1 && (
              <div className="min-h-[10rem] flex justify-center items-center text-slate-400">
                <FaInbox className="text-4xl mx-auto" />
              </div>
            )}

            {!options && (
              <div className="min-h-[10rem] flex flex-col justify-center items-center text-slate-400">
                <FaInbox className="text-4xl mx-auto" />
                No Data
              </div>
            )}

            {options?.map((x) => (
              <button
                onClick={() => {
                  setSelectValue?.(x.value);
                  setOpenOptions(false);
                }}
                className="w-full text-left last:border-b-0 border-b p-1.5 hover:bg-slate-100"
              >
                {x.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
