// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { ReactElement } from "react";
// import "./index.css";
// import QFilterComponent from "./lib";
// import { QFILTER_CONFIG } from "./constants/config";

// type User = {
//   name: string | boolean;
//   email?: string;
//   company?: {
//     name?: string;
//     address: {
//       buildingNo: string;
//       streetNo: string;
//       addressLine: number;
//     };
//   };
// };

// const App = (): ReactElement<any, any> => {
//   const users: any[] = [
//     {
//       name: "Jhael",
//       email: "jhael@gmail.com",
//       company: "hola",
//     },
//     {
//       name: "Jose Galva",
//       email: "galva@gmail.com",
//     },
//     {
//       name: "Sthifer Montero",
//       email: "sthifer@gmail.com",
//     },
//     {
//       name: "Tomas",
//       email: "Tomas@gmail.com",
//     },
//     {
//       name: "Thammy",
//     },
//     {
//       name: "Enmanuel",
//     },
//   ];

//   return (
//     <div className="w-full min-h-screen h-full bg-terciary-950 flex justify-center  ">
//       <div className="bg-black/50 w-full p-3 rounded-md pt-20  justify-center relative">
//         <div className="mx-auto flex">
//           <h1
//             className="text-8xl lg:text-9xl font-medium bg-gradient-to-br from-primary-600 mx-auto
//           to-secondary-500 inline-block h-fit text-transparent bg-clip-text p-2.5"
//           >
//             QFilter
//           </h1>
//         </div>

//         <div className="h-96 w-11/12 ">
//           <QFilterComponent<User>
//             onError={(err) => {
//               console.error(err);
//             }}
//             onReset={() => {}}
//             lang={QFILTER_CONFIG.spanish}
//             onFilter={(QFilter) => {}}
//             columns={{
//               "company?.address.streetNo": {
//                 label: "Numero de la calle",
//                 options: [{ label: "klk", value: 1 }],
//                 render(item, setUpdateValue) {
//                   return (
//                     <div>
//                       <iframe
//                         width="420"
//                         height="315"
//                         src="https://www.youtube.com/embed/tgbNymZ7vqY"
//                       ></iframe>
//                     </div>
//                   );
//                 },
//               },
//               company: {
//                 label: "Nombre de la compañia",
//               },
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
