/* eslint-disable @typescript-eslint/no-explicit-any */
import { QFilter } from "./components/QFilter";
import "./index.css";
import QFilterBuilder from "./lib";
import { FilterGroup } from "./lib/types";

type User = {
  name: string;
  age: number;
  company?: { name: string; subgroup?: { subname: string } };
  a?: FilterGroup[];
};

const App = () => {
  const builder = new QFilterBuilder<User>();

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
          <QFilter
            dataSource={users}
            QFilter={builder}
            columns={[
              { label: "Name", value: "name", type: "text" },
              { label: "Company Name", value: "company?.name", type: "text" },
              {
                label: "Age",
                value: "age",
                type: "number",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
