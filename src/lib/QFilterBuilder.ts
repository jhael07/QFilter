/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import QFilter from "./QFilter";
import {
  commonFilterProps,
  FilterGroupOperator,
  FilterLogicalOperator,
  FilterOperator,
  FiltersType,
  GroupCondition,
  OP,
} from "./types";
import { generateUID } from "./utils/groupItems";

class QFilterBuilder<T> {
  private filters: Array<FiltersType<T>> = [];

  get getFilters() {
    return this.filters.slice() as ReadonlyArray<FiltersType<T>>;
  }

  where(
    field: keyof T,
    operator: OP,
    value: number | string | boolean,
    id: string | number = crypto.randomUUID().substring(0, 8),
    parentId: string | number | null = null
  ): this {
    const body: FilterOperator<T> = {
      field,
      operator,
      value,
      id,
      parentId,
      type: "comparisonOperator",
    };

    this.filters.push(body);
    return this;
  }

  group(filters: Array<GroupCondition<T> | Array<GroupCondition<T>>>) {
    const id = generateUID();

    const children = filters?.map((filter: any) => ({ ...filter, parentId: id })) as any;

    this.filters.push({
      id,
      children,
      type: "group",
    });

    return this;
  }

  /**
   * This method ```adds``` an item or a group of items in the ```QFilter``` by it's index or it's id.
   *
   * @param identifier this could be either an index or an id (string or number).
   * @param filters this is an array of filters, they could of any of these types: ``` FilterOperator<T> | FilterGroupOperator<T> | FilterLogicalOperator<T>```
   *
   * @example
   *
   * const newFilter = new QFilter<name: string, age: number>()
   *
   * newFilter.where("name","Equal","Jon Doe").and().where("age","LessThan",30);
   *
   * // Here we will add a new condition  between the first and the third, so for that reason wi will pass the number 2 as it is the second position.
   *
   * newFilter.add(2,[where("age","GreaterThan",20), and()])
   *
   * // You could also add a new group of condtions or new condition into an existing group by the id:
   *
   *
   * newFilter.where("name","Equal","Jon Doe").and().where("age","LessThan",30).or().group([where("name", "Contains", "s")])
   *
   * // let's added it
   *
   * // variable to get the id of the group
   * const groupId = newFilter.getFiters.at(4).id
   *
   * newFilter.add(groupId, [and(),where("age","GreaterThan",23)])
   *
   *
   *
   * @returns void
   */
  add(
    identifier: string | number,
    filters?: (
      | commonFilterProps<T>
      | FilterOperator<T>
      | FilterGroupOperator<T>
      | FilterLogicalOperator<T>
    )[]
  ): void {
    for (let i = 0; i < this.filters.length; i++) {
      const item = this.filters[i];
      if (item.id === identifier || i === identifier) {
        filters?.forEach((filter, j) => this.filters.splice(i + j, 0, filter));
        return;
      }

      if (item.children) filters?.forEach((filter) => this.filters[i].children?.push(filter));
    }
  }
  remove(
    id: string | number,
    filters?: (
      | commonFilterProps<T>
      | FilterOperator<T>
      | FilterGroupOperator<T>
      | FilterLogicalOperator<T>
    )[]
  ): boolean {
    // 1. get the filters
    const itemsToFilter = filters ?? this.filters;
    // 2. iterate to remove
    for (let i = 0; i < itemsToFilter.length; i++) {
      const item = itemsToFilter[i];
      if (item.id === id) {
        //  this will remove the item and modified the original array
        if (itemsToFilter[i - 1]?.type === "logicalOperator") itemsToFilter.splice(i - 1, 2);
        else itemsToFilter.splice(i, 1);
        return true;
      }
      if (item.type === "group" && item.children) {
        const removed = this.remove(id, item.children);
        if (removed) return true;
      }
    }
    return false;
  }

  and(): this {
    this.filters.push({
      id: generateUID(),
      operator: "&&",
      type: "logicalOperator",
    });

    return this;
  }

  or(): this {
    this.filters.push({
      id: generateUID(),
      operator: "||",
      type: "logicalOperator",
    });
    return this;
  }

  not(): this {
    this.filters.push({
      id: generateUID(),
      operator: "!",
      type: "logicalOperator",
    });
    return this;
  }

  build() {
    return new QFilter(this.filters);
  }
}

export default QFilterBuilder;
