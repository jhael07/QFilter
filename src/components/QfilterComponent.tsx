/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useState } from "react";
import QFilterBuilder from "../lib";
import { FilterLogicalOperator, FilterOperator, LogicalOperator } from "../lib/types";
import { IoClose } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";

const QfilterComponent = <T,>({ filterBuilder }: { filterBuilder: QFilterBuilder<T> }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setFiltersChange] = useState(false);

  const filters = filterBuilder.getFilters;

  const handleDelete = (i: number, arr: any[]) => {
    if (i !== 0 && arr[i - 1].type === "logicalOperator") arr.splice(i - 1, 2);
    else if (i === 0 && arr[i + 1]?.type === "logicalOperator") arr.splice(i, 2);
    else arr.splice(i, 1);
    setFiltersChange((prev) => !prev);
  };

  const createGroup = (item: any, children?: boolean) => {
    return (
      <div
        key={item.id}
        className={`p-4 grid gap-2 first:pl-0 border-l border-slate-300 rounded-md
         bg-slate-400/30  relative min-w-[20rem] mt-4  ${children ? "ml-8" : ""}`}
      >
        <p className="text-slate-800 font-bold w-full">Group: </p>
        <div className=" transition-all duration-300">
          <CloseButton
            onClick={() => {
              filterBuilder.remove(item.id);
              setFiltersChange((prev) => !prev);
            }}
          />
        </div>
        {item?.children?.map((item: any, i: number, arr: any[]) => {
          if (item.children) return createGroup(item, true);
          if (item.type === "logicalOperator") {
            return (
              <div
                key={item.id}
                className="bg-slate-100 text-slate-800 font-semibold p-2 rounded-md shadow-md w-fit 
              px-6 h-fit relative group transition-all  cursor-default"
              >
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <CloseButton onClick={() => {}} />
                </div>
                <p>{logicalOperationCondition((item as FilterLogicalOperator<T>).operator)}</p>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className=" text-slate-800 font-semibold shadow-md relative group transition-all 
                w-full h-fit"
            >
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                <CloseButton onClick={() => handleDelete(i, arr)} />
              </div>
              <div className="overflow-hidden rounded-lg">
                <FilterBody item={item as FilterOperator<T>} />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className="text-white min-w-[10rem] max-w-[60rem] bg-slate-100 p-4 mx-auto rounded-lg gap-4 
   grid"
    >
      <div className="p-2 flex gap-x-6 relative">
        <HeaderButton
          title="Add Condition"
          onClick={() => {
            filterBuilder.condition("name", "GreaterThanOrEqual", "e");
            setFiltersChange((prev) => !prev);
          }}
        />
        <HeaderButton title="Add Group" />
        <div className="w-80 p-2 border absolute -bottom-4 bg-"></div>
      </div>

      {filters.length === 0 ? (
        <div className="text-slate-800">No filters have been applied</div>
      ) : null}
      {filters.map((item, i, arr) => {
        if (item.type === "comparisonOperator") {
          return (
            <div
              key={item.id}
              className=" text-slate-800 font-semibold  shadow-md relative group rounded-md
               transition-all 
              w-full  h-fit"
            >
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                <CloseButton onClick={() => handleDelete(i, arr)} />
              </div>
              <div className="overflow-hidden rounded-lg">
                <FilterBody item={item as FilterOperator<T>} />
              </div>
            </div>
          );
        }
        if (item.type === "group") {
          return createGroup(item);
        }
        if (item.type === "logicalOperator") {
          return (
            <div
              className="bg-slate-100 text-slate-800 font-semibold p-2 rounded-md shadow-md w-fit border 
            px-6 h-fit relative group transition-all  cursor-default"
            >
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                <CloseButton onClick={() => {}} />
              </div>
              <p>{logicalOperationCondition((item as FilterLogicalOperator<T>).operator)}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default QfilterComponent;

const HeaderColumn = ({ title }: { title: string }) => {
  return (
    <div
      key={title}
      className=" gap-10 w-full border-b pb-1 p-2 bg-slate-200 
text-slate-800 font-bold cursor-default px-4 min-h-10"
    >
      {title}
    </div>
  );
};
const FilterColumn = ({ title, value }: { title: string; value: string | ReactNode }) => {
  return (
    <div className="w-full">
      <HeaderColumn title={title} />
      <div className="flex items-center gap-x-1 pt-1 p-2 px-4">{value}</div>
    </div>
  );
};

const FilterBody = <T,>({ item }: { item: FilterOperator<T> }) => {
  return (
    <div key={item.id} className="flex w-full bg-slate-100 cursor-default">
      <FilterColumn title="Column" value={item.field?.toString()} />
      <FilterColumn title="Operator" value={item.operator?.toString()} />
      <FilterColumn title="Value" value={item.value?.toString() ?? ""} />
      <FilterColumn title="Acciones" value={<EditButton />} />
    </div>
  );
};

const logicalOperationCondition = (type: LogicalOperator) => {
  if (type === "&&") return "And";
  if (type === "||") return "Or";
  if (type === "!") return "Not";
};

const CloseButton = ({ ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      className="  rounded-full h-6 w-6 bg-red-600 hover:bg-red-700 flex items-center text-center
 justify-center absolute -top-2 -right-2 transition-all"
    >
      <IoClose className="text-white " />
    </button>
  );
};

const EditButton = ({ ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...rest} className="px-2">
      <MdModeEdit className="text-slate-500 text-sm hover:text-slate-600  duration-300" />
    </button>
  );
};

const HeaderButton = ({
  title,
  ...rest
}: { title: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      className="bg-primary-900 p-2 rounded-md hover:bg-orange-400 shadow-sm transition-all hover:text-secondary-950 font-semibold"
    >
      {title}
    </button>
  );
};

const GroupComponent = <T,>(item: any) => {
  return (
    <div className="p-2 border bg-slate-400">
      {item?.children?.map((item, i) => {
        return (
          <div
            key={item.id}
            className=" text-slate-800 font-semibold  shadow-md relative group transition-all 
                 w-full  h-fit"
          >
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
              <CloseButton
                onClick={() => {
                  item.children.splice(i);
                }}
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <FilterBody item={item as FilterOperator<T>} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
