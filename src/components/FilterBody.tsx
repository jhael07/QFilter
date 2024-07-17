import { FilterOperator } from "../lib/types";
import { QFilterOption } from "../types";
import FilterColumn from "./FilterColumn";
import QFilterBuilder from "../lib";

type FilterBody<T> = {
  item: FilterOperator<T>;
  options?: Array<QFilterOption<T>>;
  selectMultiple?: boolean;
  QFilter: QFilterBuilder<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
};
const FilterBody = <T,>({ item, options, QFilter }: FilterBody<T>) => {
  return (
    <div
      key={item.id}
      className="flex lg:flex-row flex-col w-full bg-slate-100 cursor-default rounded-md"
    >
      <FilterColumn
        QFilter={QFilter}
        options={options}
        title="Column"
        value={item.value}
        type="select"
      />
      <FilterColumn
        QFilter={QFilter}
        title="Operator"
        value={item.operator?.toString()}
        type="select"
      />
      <FilterColumn QFilter={QFilter} title="Value" value={item.value?.toString() ?? ""} />
    </div>
  );
};

export default FilterBody;
