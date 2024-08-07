/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from "react";
import "./index.css";
import { FilterGroup } from "./lib/types";
import QFilterComponent from "./lib";

type User = {
  name: string;
  age: number;
  company?: { name: string; subgroup?: { subname: string } };
  a?: FilterGroup[];
};

const App = (): ReactElement<any, any> => {
  const users: User[] = [
    {
      name: "jhael",
      age: 20,
      company: {
        name: "FMP",
      },
      a: [],
    },
    {
      name: "Tomas",
      age: 20,
      company: {
        name: "FMP",
      },
      a: [],
    },
    {
      name: "Miguel",
      age: 26,
      company: {
        name: "FMP",
        subgroup: {
          subname: "Shit what i've done with my life ",
        },
      },
    },
  ];

  return (
    <div className="w-full min-h-screen h-full bg-terciary-950 flex justify-center  ">
      <div className="bg-black/50 w-full p-3 rounded-md pt-20  justify-center relative">
        <div className="mx-auto flex">
          <h1
            className="text-8xl lg:text-9xl font-medium bg-gradient-to-br from-primary-600 mx-auto
          to-secondary-500 inline-block h-fit text-transparent bg-clip-text p-2.5"
          >
            QFilter
          </h1>
        </div>

        <div className="h-96 w-96 ">
          <QFilterComponent<User>
            onError={(err) => {
              console.error(err);
            }}
            onReset={() => {}}
            onFilter={(QFilter) => {
              console.log(QFilter.filter(users));
              console.log(QFilter.filtersApplied);
            }}
            columns={{
              name: {
                label: "Name",
                render(item, setUpdate) {
                  return (
                    <input
                      value={item.value?.toString()}
                      type="datetime-local"
                      onChange={(e) => setUpdate(e.target.value)}
                      className="q-filter-input-value"
                    />
                  );
                },
              },
              age: {
                label: "Age",

                type: "number",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
