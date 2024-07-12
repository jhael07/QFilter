/* eslint-disable @typescript-eslint/no-explicit-any */
import QfilterComponent from "./components/QfilterComponent";
import "./index.css";
import QFilterBuilder from "./lib";

type User = { name: string; age: number };

const App = () => {
  // const users: Array<User> = [{ name: "Jhael", age: 20 }];

  const builder = new QFilterBuilder<User>().where("name", "Equal", "Jhael");

  return (
    <div className="w-full min-h-screen bg-terciary-950 flex justify-center ">
      <div className="bg-black/50 w-full p-3 rounded-md pt-20  justify-center ">
        <div className="mx-auto flex">
          <h1
            className="text-9xl font-medium bg-gradient-to-br from-primary-600 mx-auto
          to-secondary-500 inline-block h-fit text-transparent bg-clip-text p-2.5"
          >
            QFilter
          </h1>
        </div>

        <div className="w-11/12 mx-auto mt-10 bg-purple-600">
          <QfilterComponent filterBuilder={builder} />
        </div>
      </div>
    </div>
  );
};

export default App;
