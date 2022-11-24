import fetch from "node-fetch";
import fs from "fs";

const ALL_ELEMENTS = "https://neelpatel05.pythonanywhere.com";

const getElements = async (url) => {
  const res = await fetch(url);
  const json = await res.json();
  writeJson(json);
};

getElements(ALL_ELEMENTS);

const writeJson = (data) => {
  fs.writeFile("./elements.json", JSON.stringify(data), (err) =>
    err ? console.error(err) : console.log("json written.")
  );
};

const writeHtml = () => {};
