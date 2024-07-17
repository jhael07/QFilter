/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import QFilter from "./QFilter";
import { FilterOperator, FiltersType, GroupCondition, Join, OP } from "./types";
import { generateUID } from "./utils/operations";

/**
 * ### QFilterBuilder
 *
 */
class QFilterBuilder<T> {
  private filters: Array<FiltersType<T>> = [];

  /**
   * Getter for retrieving a readonly copy of the filters array.
   * @returns {ReadonlyArray<FiltersType<T>>} A readonly array of filters.
   */
  get getFilters(): FiltersType<T>[] {
    return this.filters;
  }

  /**
   * Adds a filter condition to the query.
   * @param {Join<T>} field The field on which to apply the filter.
   * @param {OP} operator The comparison operator for the filter.
   * @param {number | string | boolean} value The value to compare against.
   * @param {string | number} [id=crypto.randomUUID().substring(0, 8)] Optional unique identifier for the filter.
   * @param {string | number | null} [parentId=null] Optional parent identifier for hierarchical filters.
   * @returns {this} The instance of the class with the added filter condition.
   */

  condition(
    field: Join<T>,
    operator: OP,
    value: number | string | boolean | undefined | null,
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
    if (this.filters.length > 0 && this.filters.at(-1)?.type !== "logicalOperator") this.and();
    this.filters.push(body);

    return this;
  }

  addConditionUI(
    field?: Join<T>,
    operator?: OP,
    value?: number | string | boolean | undefined | null,
    parentId: string | number | null = null
  ): this {
    const body = {
      field,
      operator,
      value,
      id: generateUID(),
      parentId,
      type: "comparisonOperator",
    } as any;
    if (this.filters.length > 0 && this.filters.at(-1)?.type !== "logicalOperator") this.and();
    this.filters.push(body);

    return this;
  }

  /**
   * Groups multiple filter conditions into a logical group.
   * @param {Array<GroupCondition<T> | Array<GroupCondition<T>>>} filters An array of group conditions or nested arrays of group conditions.
   * @returns {this} The instance of the class with the added grouped filter conditions.
   */
  group(filters: Array<GroupCondition<T> | Array<GroupCondition<T>>>): this {
    const id = generateUID();

    const children = filters?.map((filter: any) => ({ ...filter, parentId: id })) as any;

    if (this.filters.length > 0 && this.filters.at(-1)?.type !== "logicalOperator") this.and();

    this.filters.push({
      id,
      children,
      type: "group",
    });

    return this;
  }

  /**
   * Adds an item or a group of items to the `QFilterBuilder` by its ID.
   *
   * @param {string | number} id - The ID of the item.
   * @param {Array<FilterOperator<T> | FilterGroupOperator<T> | FilterLogicalOperator<T>>} filtersToAdd - An array of filters to add. These filters can be of types: `FilterOperator<T>`, `FilterGroupOperator<T>`, or `FilterLogicalOperator<T>`.
   * @param {"before" | "after"} [position="before"] - Specifies the position to add the new filters relative to the item with the given ID. Can be "before" or "after". By default it is ```"before"```.
   * @param {Array<commonFilterProps<T> | FilterOperator<T> | FilterGroupOperator<T> | FilterLogicalOperator<T>>} [filtersArr] - If not provided, the default filters in the `QFilterBuilder` will be used.
   *
   * @example
   * const users: Array<Test> = [
   *   { name: "Jhael", age: 20, city: "DN" },
   *   { name: "Jhael", age: 21, city: "Santiago" },
   *   { name: "Galva", age: 26, city: "SD" },
   *   { name: "Galva", age: 26, city: "SDE" },
   *   { name: "Thomas", age: 20, city: "SDN" },
   *   { name: "Sthifer", age: 25, city: "SDN" },
   *   { name: "Enmanuel", age: 19, city: "SDO" },
   * ];
   *
   * const builder = new QFilterBuilder<Test>()
   *   .where("name", "Contains", "e")
   *   .and()
   *   .where("age", "GreaterThan", 20);
   *
   * // At this point, the result is:
   * // [
   * //   { name: 'Jhael', age: 21, city: 'Santiago' },
   * //   { name: 'Sthifer', age: 25, city: 'SDN' }
   * // ]
   *
   * // The method `getFilters` returns an array of all filters so far:
   * // [where, and, where]
   * //   0,     1,    2
   *
   * // Add a condition before the last `where` (position 2):
   * const idToAdd = builder.getFilters.at(2)?.id ?? "";
   *
   * builder.add(idToAdd, [where("age", "GreaterThan", 21), and()]);
   * // Now the logic is: `data.name.toLowerCase().includes('e') && data.age > 21 && (data.age > 20)`
   *
   * const QFilter = builder.build();
   * const usersFilter = QFilter.filter(users);
   * console.log(usersFilter); // [ { name: 'Sthifer', age: 25, city: 'SDN' } ]
   *
   * @returns {boolean} - Returns `true` if the filters were successfully added, otherwise `false`.
   */
  add(
    id: string | number,
    filtersToAdd: Array<FiltersType<T>>,
    position: "after" | "before" = "before",
    filtersArr?: Array<FiltersType<T>>
  ): boolean {
    const itemsToFilter = filtersArr ?? this.filters;

    for (let i = 0; i < itemsToFilter.length; i++) {
      const item = itemsToFilter[i];
      if (item.id === id) {
        filtersToAdd.forEach((filter, j) => {
          // prettier-ignore
          const index = position === "before"
           ? i + j // before index position
           : i + j + 1; // after index position

          itemsToFilter.splice(index, 0, filter);
        });
        return true;
      }

      if (item.type === "group" && item.children) {
        const added = this.add(id, filtersToAdd, position, item.children);
        if (added) return true;
      }
    }

    return false;
  }

  /**
   * Removes a filter condition or group of conditions by ID from the filters array.
   * @param {string | number} id The identifier of the filter condition or group to remove.
   * @param {Array<FiltersType<T>>} [filters] Optional array of filters to search within (defaults to this.filters if not provided).
   * @returns {boolean} True if the filter condition or group was successfully removed, false otherwise.
   */
  remove(id: string | number, filters?: Array<FiltersType<T>>): boolean {
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

  /**
   * Updates a filter condition or group of conditions by ID in the filters array.
   * @param {string | number} id The identifier of the filter condition or group to update.
   * @param {FiltersType<T>} value The updated filter object to replace the existing one.
   * @param {Array<FiltersType<T>>} [filters] Optional array of filters to search within (defaults to this.filters if not provided).
   * @returns {boolean} True if the filter condition or group was successfully updated, false otherwise.
   */
  update(id: string | number, value: FiltersType<T>, filters?: Array<FiltersType<T>>): boolean {
    const filtersToApply = filters ?? this.filters;

    for (let i = 0; i < filtersToApply.length; i++) {
      const item = filtersToApply[i];

      if (item.id === id) {
        filtersToApply.splice(i, 1, value);
        return true;
      }

      if (item.type === "group" && item.children) {
        const updated = this.update(id, value, item.children);
        if (updated) return true;
      }
    }
    return false;
  }

  /**
   * Adds a logical AND operator ('&&') to the filters array.
   * @returns {this} The instance of the class with the added logical AND operator.
   */
  and(): this {
    this.filters.push({
      id: generateUID(),
      operator: "&&",
      type: "logicalOperator",
    });

    return this;
  }

  /**
   * Adds a logical OR operator ('||') to the filters array.
   * @returns {this} The instance of the class with the added logical OR operator.
   */
  or(): this {
    this.filters.push({
      id: generateUID(),
      operator: "||",
      type: "logicalOperator",
    });
    return this;
  }

  /**
   * Adds a logical NOT operator ('!') to the filters array.
   * @returns {this} The instance of the class with the added logical NOT operator.
   */
  not(): this {
    this.filters.push({
      id: generateUID(),
      operator: "!",
      type: "logicalOperator",
    });
    return this;
  }

  /**
   * Constructs a new QFilter instance with the current filters array.
   * @returns {QFilter<T>} A new QFilter instance initialized with the current filters.
   */
  build(): QFilter<T> {
    return new QFilter(this.filters);
  }
}

export default QFilterBuilder;
