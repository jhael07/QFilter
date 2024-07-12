/* eslint-disable @typescript-eslint/no-explicit-any */
import "./index.css";
import QFilterBuilder from "./lib/QFilterBuilder";
import { and, where } from "./lib/utils/groupItems";

type Test = { name: string; age: number; city: string };

const App = () => {
  const users: Array<Test> = [
    { name: "Jhael", age: 20, city: "DN" },
    { name: "Jhael", age: 21, city: "Santiago" },
    { name: "Galva", age: 26, city: "SD" },
    { name: "Galva", age: 26, city: "SDE" },
    { name: "Thomas", age: 20, city: "SDN" },
    { name: "Sthifer", age: 25, city: "SDN" },
    { name: "Enmanuel", age: 19, city: "SDO" },
  ];

  const filterBuilder = new QFilterBuilder<Test>()
    .where("age", "GreaterThanOrEqual", 25)
    .and()
    .where("city", "Contains", "E")
    .or()
    .group([where("age", "<=", 26), and(), where("name", "Contains", "a")]);
  // .where("name", "Contains", "e")
  // .and()
  // .group([where("age", "GreaterThan", 20)]);

  // const groupId = filterBuilder.getFilters[2]?.id;

  // filterBuilder.add(groupId ?? "", [and(), where("name", "Contains", "s")]);

  // const groupId = filterBuilder.getFilters[4]?.id ?? "";

  // filterBuilder.add(groupId, [and(), where("city", "Equal", "Santiago")]);

  // filterBuilder.remove(groupId);

  // const build = filterBuilder.build();

  // console.log(build.filter(users));

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
