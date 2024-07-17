/* eslint-disable @typescript-eslint/no-explicit-any */
import { QFilter } from "./components/alternative-simple/QFilter";
import QfilterComponent from "./components/QfilterComponent";
import "./index.css";
import QFilterBuilder, { condition, group } from "./lib";
import { FilterGroup, Join } from "./lib/types";

type User = {
  name: string;
  age: number;
  company?: { name: string; subgroup?: { subname: string } };
  a?: FilterGroup[];
};

const App = () => {
  const builder = new QFilterBuilder<User>();
  // .condition("name", "Contains", "k")
  // .group([
  //   condition("company?.name", "Contains", "j"),
  //   group([
  //     condition("company?.name", "Contains", "j"),
  //     group([condition("company?.name", "Contains", "j")]),
  //   ]),
  // ]);

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

  const keys: any[] = [];

  console.log(typeof keys, keys instanceof Object);

  const getAllKeys = <T,>(item: T, fatherKey?: string) => {
    const father = fatherKey ?? "";

    const keysArr = Object.keys(item as Array<keyof T>);
    // keysArr
    for (const key of keysArr) {
      const itemValue = item[key as keyof T];

      if (itemValue instanceof Array)
        keys.push(`${father}${father.length > 0 ? `?.${key}` : key}.length`);
      else if (itemValue instanceof Object)
        getAllKeys(itemValue, father.length > 0 ? `${father}?.${key}` : key);

      keys.push(`${father}${father.length > 0 ? `?.${key}` : key}`);
    }
  };

  users.forEach((x) => {
    getAllKeys(x);
  });

  console.log(Array.from(new Set(keys)) as Join<User>[]);

  // console.log(Object.keys(users));
  return (
    <div className="w-full min-h-screen bg-terciary-950 flex justify-center ">
      <div className="bg-black/50 w-full p-3 rounded-md pt-20  justify-center ">
        <div className="mx-auto flex">
          <h1
            className="text-8xl lg:text-9xl font-medium bg-gradient-to-br from-primary-600 mx-auto
          to-secondary-500 inline-block h-fit text-transparent bg-clip-text p-2.5"
          >
            QFilter
          </h1>
        </div>

        <div className="lg:w-6/12 mx-auto mt-10 ">
          <QFilter<User>
            QFilter={builder}
            columns={[
              { label: "Name", value: "name" },
              { label: "Company Name", value: "company?.name" },
            ]}
          />
          <QfilterComponent
            filterBuilder={builder}
            config={{
              columns: [
                { label: "Name", value: "name" },
                { label: "Company Name", value: "company?.name" },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
