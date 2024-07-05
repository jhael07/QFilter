/* eslint-disable @typescript-eslint/no-explicit-any */
import "./index.css";
import QFilter from "./lib/QFilter";
import { IFilter } from "./lib/types";
import { executeFilters } from "./lib/utils/common";

const App = () => {
  const filters = new QFilter<{ name: string }>();

  const users = [
    { name: "Jhael" },
    { name: "Galva" },
    { name: "Thomas" },
    { name: "Sthifer" },
    { name: "Enmanuel" },
  ];

  filters.addGroup({
    id: "first",
    filters: [{ field: "name", operator: "NotContains", value: "a" }],
    logic: "AND",
  });

  const executeQuery = <T,>(queries: Array<IFilter<T>>, dataSource: Array<T>) => {
    const result: Array<T> = [];

    try {
      dataSource.forEach((data) =>
        queries.forEach((q) => {
          return q.filters.forEach((filter) => executeFilters(filter, data, result));
        })
      );

      return result;
    } catch (err: any) {
      console.error(err.message);
    }
  };

  console.log(filters.build()[0], users, executeQuery<{ name: string }>(filters.build(), users));

  return (
    <div className="w-full h-screen bg-terciary-950 flex justify-center ">
      <div className="bg-black/50 w-full p-3 rounded-md pt-20 flex justify-center ">
        <h1
          className="text-9xl font-medium bg-gradient-to-br from-primary-600 
        to-secondary-500 inline-block h-fit text-transparent bg-clip-text p-2.5"
        >
          QFilter
        </h1>
      </div>
    </div>
  );
};

export default App;
