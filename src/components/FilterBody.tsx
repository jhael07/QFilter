import { FilterOperator } from "../lib/types";
import { QFilterOption } from "../types";
import FilterColumn from "./FilterColumn";

type FilterBody<T> = {
  item: FilterOperator<T>;
  options?: Array<QFilterOption>;
  selectMultiple?: boolean;
};
const FilterBody = <T,>({ item, options }: FilterBody<T>) => {
  return (
    <div key={item.id} className="flex lg:flex-row flex-col w-full bg-slate-100 cursor-default ">
      <FilterColumn options={options} title="Column" value={item.field?.toString()} type="select" />
      <FilterColumn title="Operator" value={item.operator?.toString()} type="select" />
      <FilterColumn title="Value" value={item.value?.toString() ?? ""} />
    </div>
  );
};

export default FilterBody;
