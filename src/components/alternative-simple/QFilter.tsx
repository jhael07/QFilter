/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import QFilterBuilder from "../../lib";
import { FilterOperator, FiltersType, FiltersUI } from "../../lib/types";
import { QFilterOption } from "../../types";
import { BasicInput } from "../form";
import { CustomButton } from "../buttons";
import { MdModeEdit } from "react-icons/md";
import SelectComponent from "./SelectComponent";
import { operators } from "../../utils/string";
import { FaSave } from "react-icons/fa";
import { addConditionUI, addGroupUI } from "../../lib/utils/operations";
import { IoClose } from "react-icons/io5";

export const QFilter = <T,>({
  QFilter,
  columns,
  dataSource,
}: {
  QFilter: QFilterBuilder<T>;
  columns: Array<QFilterOption<T>>;
  dataSource: Array<T>;
}) => {
  const filtersArr = QFilter.getFilters;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setReRender] = useState(false);

  const [filterResult, setFilterResult] = useState<any>();
  const [changesNotSave, setChangesNotSave] = useState(false);

  return (
    <div className="w-full bg-slate-50 p-4 mb-2 font-medium rounded-lg">
      QFilter
      <div className="flex gap-x-2 mt-4 mb-4">
        <button
          className="p-2 border bg-slate-300"
          onClick={() => {
            QFilter.addConditionUI();
            setReRender((prev) => !prev);
          }}
        >
          add Condition
        </button>
        <button
          className="p-2 border bg-slate-300"
          onClick={() => {
            QFilter.group([]);
            setReRender((prev) => !prev);
          }}
        >
          add Group
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <FilterBodyOperations
          changesSave={setChangesNotSave}
          filters={filtersArr}
          setReRender={setReRender}
          columns={columns}
        />

        <div className="w-full p-2 flex justify-end">
          <button
            className="addButton"
            onClick={() => {
              if (changesNotSave) {
                alert("Error: Please save all the filters.");
                return;
              }
              try {
                setFilterResult(QFilter.build().filter(dataSource));
                setReRender((prev) => !prev);
              } catch (err: any) {
                alert("One or more conditions are empty or invalid.");
              }
            }}
          >
            Filter
          </button>
        </div>
      </div>
      <div className="mt-4 gap-4 grid">
        {filterResult
          ? JSON.stringify(filterResult, null, 4)
          : filtersArr.map((x, i) => {
              return <p key={i}>{JSON.stringify(x, null, 4)}</p>;
            })}
      </div>
    </div>
  );
};

const ColumnsFilter = ({ children, title }: { title: string; children: ReactNode }) => {
  return (
    <div className="w-full grid gap-1">
      <p className="text-slate-500">{title}:</p>
      {children}
    </div>
  );
};

const ColumnValue = <T,>({
  filter,
  changesSave,
  reRenderFn,
}: {
  filter: FilterOperator<T>;
  changesSave: Dispatch<SetStateAction<boolean>>;
  reRenderFn: Function;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isDisable, setIsDisable] = useState(true);

  return (
    <ColumnsFilter title="Value">
      <BasicInput setValue={setInputValue} value={filter.value as any} disabled={isDisable}>
        {isDisable ? (
          <CustomButton
            Icon={MdModeEdit}
            onClick={() => {
              setIsDisable(false);
              changesSave(true);
            }}
          />
        ) : (
          <CustomButton
            Icon={FaSave}
            onClick={() => {
              setIsDisable(true);
              filter.value = inputValue;
              changesSave(false);
              reRenderFn();
            }}
          />
        )}
      </BasicInput>
    </ColumnsFilter>
  );
};

type FilterBodyOperationsProps<T> = {
  filters: FiltersType<T>[];
  setReRender: Dispatch<SetStateAction<boolean>>;
  changesSave: Dispatch<SetStateAction<boolean>>;
  columns?: {
    label: string | number;
    value: string | number | boolean | undefined | null;
  }[];
};

const FilterBodyOperations = <T,>(props: FilterBodyOperationsProps<T>) => {
  const { filters, setReRender, columns, changesSave } = props;

  return (
    <>
      {filters?.map((x, i, arr) => {
        const filter: FiltersUI<T> = x as any;

        if (filter.type === "comparisonOperator")
          return (
            <div key={i} className="w-full gap-x-4 flex justify-center items-end relative">
              <ColumnsFilter title="Column">
                <SelectComponent<T> reRenderFn={setReRender} item={x as any} options={columns} />
              </ColumnsFilter>
              <ColumnsFilter title="Operator">
                <SelectComponent<T>
                  reRenderFn={setReRender}
                  type="operator"
                  item={x as any}
                  options={Object.keys(operators).map((x) => ({ value: x, label: x })) as any}
                />
              </ColumnsFilter>
              <ColumnValue
                changesSave={changesSave}
                reRenderFn={() => setReRender((prev) => !prev)}
                filter={filter}
              />
              <button
                className="absolute right-0 top-0 group"
                onClick={() => {
                  arr.splice(i, 1);
                  setReRender((prev) => !prev);
                }}
              >
                <IoClose className="text-base text-slate-700  h-fit group-hover:text-red-500" />
              </button>
            </div>
          );

        if (filter.type === "logicalOperator") {
          return (
            <div className="w-fit min-w-[4.5rem]">
              <SelectComponent<T>
                reRenderFn={setReRender}
                type="operator"
                item={x as any}
                options={
                  [
                    { value: "&&", label: "AND" },
                    { value: "||", label: "OR" },
                  ] as any
                }
              />
            </div>
          );
        }

        if (filter.type === "group" && filter.children)
          return (
            <div className="p-4 bg-slate-100 border-l border-t rounded-lg grid gap-4">
              <div className="w-full flex justify-between items-center">
                <p>Group:</p>
                <div className="flex gap-x-4 text-sm font-medium">
                  <button
                    className="addButton"
                    onClick={() => {
                      addConditionUI(filter.children ?? []);
                      setReRender((prev) => !prev);
                    }}
                  >
                    Add Condition
                  </button>
                  <button
                    className="addButton"
                    onClick={() => {
                      addGroupUI(filter.children ?? []);
                      setReRender((prev) => !prev);
                    }}
                  >
                    Add Group
                  </button>
                </div>
              </div>
              <div className="ml-2 flex flex-col gap-4">
                <FilterBodyOperations {...props} filters={filter.children} />
              </div>
            </div>
          );
      })}
    </>
  );
};
