/* eslint-disable @typescript-eslint/no-explicit-any */
import "./index.css";
import QExecute from "./lib/QExecute";
import QFilter from "./lib/QFilter";
import { and, group, where } from "./lib/utils/groupItems";

type Test = { name: string; age: number; city: string };
const App = () => {
  const filters = new QFilter<Test>();

  const filterBuild = filters
    .where("age", "<=", 30)
    .and()
    .group([
      where("age", "GreaterThan", 25),
      and(),
      group<Test>([where("city", "NotContains", "iago")]),
    ]);
  // .and()
  // .where("city", "!==", "Santiago")
  // .and()
  // .group([where("name", "Equal", "Sthifer")])
  // .and()
  // .where("name", "Contains", "g");

  // console.log(filterBuild.build());

  console.log(JSON.stringify(filterBuild, null, 2));

  const users: Array<Test> = [
    { name: "Jhael", age: 20, city: "DN" },
    { name: "Jhael", age: 21, city: "Santiago" },
    { name: "Galva", age: 26, city: "SD" },
    { name: "Galva", age: 26, city: "SDE" },
    { name: "Thomas", age: 20, city: "SDN" },
    { name: "Sthifer", age: 25, city: "SDN" },
    { name: "Enmanuel", age: 19, city: "SDO" },
  ];

  const result = QExecute(filterBuild.build(), users);

  console.log(result);

  // const predicate = (user:Test)=>
  // {
  //   return user.name == 'Sthifer'
  // }

  // const findDuplicates = [
  //   ...new Map(users.map((user) => [user.name, user] as [string, Test])).values(),
  // ];

  // // const findDuplicates = [
  // //   ...new Map(users.map((item) => [item["name"], item] as [string, Person])).values(),
  // // ];
  // // ...new Map(array.map((item) => [item[key], item] as [number, Person])).values(),

  // console.log(findDuplicates, users);

  // filters
  //   .addGroup({
  //     id: "first",
  //     filters: [{ id: "hola", field: "name", operator: "Contains", value: "h" }],
  //   })
  //   .or()
  //   .addGroup({
  //     id: "sa",
  //     filters: [{ id: "sa", field: "name", operator: "Contains", value: "s" }],
  //   });
  // .and()
  // .addGroup({
  //   id: "sa",
  //   filters: [{ id: "sa", field: "city", operator: "NotEqual", value: "SDN" }],
  // });
  // .or()
  // .addGroup({
  //   id: "second",
  //   filters: [
  //     { id: "klk", field: "name", operator: "Contains", value: "a" },
  //     { id: "klk", field: "age", operator: "Equal", value: 25 },
  //   ],
  // });

  // data.filter((item)=> item.name.includes({value}) || item.includes({value2}))

  // const filtersToApply = filters.build();
  // console.log(filtersToApply);
  // const whereCondition = "user.id = '' && (user.name = '' || (user.age == 30 && user.city = ''))";
  // const paranmName = "data";

  //type conditionsType<T extends string, K extends keyof Test> = `${T}.${keyof K as string}`
  // foreach filter in filters
  // const key = paranmName.concat(`.${field}`)
  // const fn = new Function(paranmName, `return ${whereCondition}`);

  // const results: Test[] = [];

  // users.forEach((user) => {
  //   if (fn(user)) results.push(user);
  // });

  // console.log(results);

  // const filtersResult = QExecute(filters.build(), users);

  // console.log(filtersResult);

  // // console.log(filters.build());

  // const addGroup = () => {
  //   filters.addGroup({ filters: [], id: "" });
  // };

  // .addGroup({
  //   id: "second",
  //   filters: [{ id: "klk", field: "name", operator: "Contains", value: "J" }],
  // })
  // .removeGroup("first")
  // .and()
  // .addFilter("second", { id: "contains", field: "name", operator: "Contains", value: "e" });

  // console.log(
  //   filters.build()[0],
  //   executeQuery<{ name: string; age: number }>(filters.build(), users)
  // );

  // filters.removeFilter("first", "klk");
  // filters.removeFilter("first", "hola");
  // filters.removeGroup("first");

  // console.log(equalOperation<Test>(filters.build(), users));

  // const filterData = QExecute(filters.build(), users, "name");

  // console.log(users);
  // console.log(filterData);

  // type Person = { name: string; age: number };

  // const array: Person[] = [
  //   { name: "Joe", age: 17 },
  //   { name: "Bob", age: 17 },
  //   { name: "Carl", age: 35 },
  // ];

  // const key = "age";

  // const arrayUniqueByKey = [
  //   ...new Map(array.map((item) => [item["age"], item])).values(),
  //   // ...new Map(array.map((item) => [item[key], item] as [number, Person])).values(),
  // ];

  // console.log(arrayUniqueByKey);

  return (
    <div className="w-full h-screen bg-terciary-950 flex justify-center ">
      <div className="bg-black/50 w-full p-3 rounded-md pt-20 flex justify-center ">
        <h1
          className="text-9xl font-medium bg-gradient-to-br from-primary-600 
        to-secondary-500 inline-block h-fit text-transparent bg-clip-text p-2.5"
        >
          QFilter
        </h1>

        {/* <button onClick={() => addGroup()}>click me</button> */}
      </div>
    </div>
  );
};

export default App;
