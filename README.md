Here's a comprehensive README for your repository:

---

# QFilter

Query library designed for advanced filtering, crafted with ❤ using TypeScript and React. ⚛

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Advanced Usage](#advanced-usage)
- [API](#api)
  - [QFilterBuilder](#qfilterbuilder)
  - [QFilter](#qfilter)
  - [Utilities](#utilities)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install the library using npm or yarn:

```bash
npm install qfilter
```

or

```bash
yarn add qfilter
```

## Usage

### Basic Usage

To start using QFilter, import the necessary components and create filters using the `QFilterBuilder` class:

```typescript
import { QFilterBuilder } from "qfilter";

const users = [
  { name: "Jhael", age: 20, city: "DN" },
  { name: "Jhael", age: 21, city: "Santiago" },
  { name: "Galva", age: 26, city: "SD" },
  { name: "Galva", age: 26, city: "SDE" },
  { name: "Thomas", age: 20, city: "SDN" },
  { name: "Sthifer", age: 25, city: "SDN" },
  { name: "Enmanuel", age: 19, city: "SDO" },
];

const builder = new QFilterBuilder()
  .where("name", "Contains", "e")
  .and()
  .where("age", "GreaterThan", 20);

const QFilter = builder.build();
const filteredUsers = QFilter.filter(users);

console.log(filteredUsers);
// Output: [ { name: 'Jhael', age: 21, city: 'Santiago' }, { name: 'Sthifer', age: 25, city: 'SDN' } ]
```

### Advanced Usage

You can use logical operators and groups to create more complex filters:

```typescript
import { QFilterBuilder, where, and, or, not, group } from "qfilter";

const builder = new QFilterBuilder()
  .where("name", "Contains", "e")
  .and()
  .group([where("age", "GreaterThan", 20), or(), not(where("city", "Equal", "SD"))]);

const QFilter = builder.build();
const filteredUsers = QFilter.filter(users);

console.log(filteredUsers);
// Output based on complex filter logic
```

## API

### QFilterBuilder

| Method Signature                                                                                                                                                                                                                                                                  | Description                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| [where(field: keyof T, operator: OP, value: number \| string \| boolean, id?: string \| number, parentId?: string \| number): this](#wherefield-keyof-t-operator-op-value-number--string--boolean-id-string--number-parentid-string--number-this)                                 | Adds a comparison filter.             |
| [group(filters: Array<GroupCondition<T> \| Array<GroupCondition<T>>>): this](#groupfilters-arraygroupconditiont--arraygroupconditiont-this)                                                                                                                                       | Creates a group of filters.           |
| [add(id: string \| number, filtersToAdd: Array<FiltersType<T>>, position: "after" \| "before" = "before", filtersArr?: Array<FiltersType<T>>): boolean](#addid-string--number-filterstoadd-arrayfilterstypet-position-after--before--before-filtersarr-arrayfilterstypet-boolean) | Adds filters at a specified position. |
| [remove(id: string \| number, filters?: Array<FiltersType<T>>): boolean](#removeid-string--number-filters-arrayfilterstypet-boolean)                                                                                                                                              | Removes filters by ID.                |
| [update(id: string \| number, filter: FiltersType<T>, filters?: Array<FiltersType<T>>): boolean](#updateid-string--number-filter-filterstypet-filters-arrayfilterstypet-boolean)                                                                                                  | Updates a filter by ID.               |
| [and(): this](#and-this)                                                                                                                                                                                                                                                          | Adds a logical AND operator.          |
| [or(): this](#or-this)                                                                                                                                                                                                                                                            | Adds a logical OR operator.           |
| [not(): this](#not-this)                                                                                                                                                                                                                                                          | Adds a logical NOT operator.          |

| [build(): QFilter<T>](#build-qfiltert)

Builds and returns a `QFilter` instance.

### QFilter

#### `filter(dataSource: T[]): readonly T[]`

Applies the filters to the given data source and returns the filtered data.

## Utilities

### `generateUID()`

Generates a random UID.

### `where<T>(field: keyof T, operator: OP, value: number | string | boolean, id?: string | number, parentId?: string | number): GroupCondition<T>`

Creates a `where` filter.

### `group<T>(filters: Array<GroupCondition<T> | Array<GroupCondition<T>>>): Array<GroupCondition<T>>`

Creates a group of filters.

### `and<T>(): GroupCondition<T>`

Creates a logical AND filter.

### `or<T>(): GroupCondition<T>`

Creates a logical OR filter.

### `not<T>(): GroupCondition<T>`

Creates a logical NOT filter.

## Examples

Refer to the [examples](./examples) directory for more usage examples.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs, features, or improvements.

## License

This project is licensed under the MIT License.

---

Feel free to customize the README further to better suit your project's needs!
