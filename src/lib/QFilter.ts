import type { FilterItem, IFilter } from "./types";

class QFilter<T> {
  private filters: Array<IFilter<T>> = [];

  addGroup(filter: IFilter<T>): this {
    this.filters.push(filter);
    return this;
  }

  deleteGroup(id: string): this {
    this.filters.filter((group) => group.id != id);
    return this;
  }

  addCondition(groupId: string, condition: FilterItem<T>): this {
    this.filters.find((group) => {
      if (group.id === groupId) group.filters.push(condition);
    });
    return this;
  }

  build() {
    return this.filters;
  }
}

export default QFilter;
