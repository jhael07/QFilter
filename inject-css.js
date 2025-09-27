import fs from "fs";

fs.readFile("./dist/index.js", { encoding: "utf8" }, (err, data) => {
  if (err) throw Error(err);

  const modifyData = 'import "./style.css";\n' + data;

  fs.writeFile("./dist/index.js", modifyData, { encoding: "utf8" }, (err) => {
    if (err) throw Error(err);
  });
});
