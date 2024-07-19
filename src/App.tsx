/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useState } from "react";
import "./index.css";
import { FilterGroup } from "./lib/types";
import { QFilterOption } from "./types";
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

  const columns: Array<QFilterOption<User>> = [
    { label: "Name", value: "name", type: "text" },
    {
      label: "Company Name",
      value: "company?.name",
      type: "text",
      options: [
        { label: "FMP", value: "FMP" },
        { label: "Google", value: "Google" },
        { label: "Microsoft", value: "Microsoft" },
        { label: "Amazon", value: "Amazon" },
        { label: "X", value: "X" },
      ],
    },
    {
      label: "Age",
      value: "age",
      type: "number",
    },
  ];

  const [dataResult, setDataResult] = useState<Array<User>>();

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

        <div className="w-full mx-auto mt-10 grid place-items-center ">
          <QFilterComponent
            onFilter={(data) => {
              setDataResult(data.filter(users) ?? []);
            }}
            columns={columns}
          />

          <div className="mt-4 gap-4 grid bg-white rounded-md  w-11/12">
            {dataResult ? (
              <Table columns={columns} dataSource={dataResult} />
            ) : (
              <Table
                columns={[{ label: "Name" }, { label: "Company Name" }, { label: "Age" }]}
                dataSource={users}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

const Table = ({ columns, dataSource }: { columns: any[]; dataSource: any[] }) => {
  return (
    <div className="w-full border border-slate-300 overflow-hidden shadow-sm  rounded-lg">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            {columns.map((x) => {
              return (
                <th
                  className="last:border-r-0 border-r text-left px-2 pb-1.5 border-b p-3"
                  key={x.label}
                >
                  {x.label}
                </th>
              );
            })}
          </tr>
        </thead>

        {dataSource.map((x: any) => (
          <tbody>
            <tr className="w-full border-b">
              <>
                <td className=" border-r text-left px-3 py-1.5">{x["name"]}</td>
                <td className=" border-r text-left px-3 py-1">{x["company"]?.name}</td>
                <td className=" border-r-0 text-left px-3 py-1">{x["age"]}</td>
              </>
            </tr>
          </tbody>
        ))}
      </table>
      {dataSource.length < 1 && (
        <div className="w-full min-h-[16rem] bg-slate-50 flex justify-center items-center text-4xl font-medium text-slate-400">
          No data
        </div>
      )}
    </div>
  );
};
