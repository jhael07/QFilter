/* eslint-disable @typescript-eslint/no-explicit-any */
import "./index.css";
import QFilterBuilder from "./lib";
// import QFilterBuilder from "./lib/QFilterBuilder";
// import { and, where } from "./lib/utils/groupItems";
// import { and, group, or, where } from "./lib/utils/groupItems";

type Test = { name: string; age: number; city: string; company?: Company };
type Company = { name: string; arr: string[]; company2?: Company2 };
type Company2 = { tin: string };
const App = () => {
  const users = [
    {
      name: "Jhael",
      age: 20,
      city: "DN",
      company: { name: "Jhael", arr: ["s", "maria", "natilia"] },
    },
    { name: "Jhael", age: 21, city: "Santiago" },
    { name: "Galva", age: 26, city: "SD" },
    { name: "Galva", age: 26, city: "SDE" },
    { name: "Thomas", age: 20, city: "SDN" },
    { name: "Sthifer", age: 25, city: "SDN" },
    { name: "Enmanuel", age: 19, city: "SDO" },
  ];

  const builder = new QFilterBuilder<Test>()
    .where("company?.arr.length", "Equal", 0)
    .or()
    .where("company", "Equal", undefined);

  // users.filter((item) => item.company.name);

  console.log(builder.build().filter(users));

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
