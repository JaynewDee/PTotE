import express from "express";
import elements from "./data/elements.json" assert { type: "json" };
const app = express();

const PORT = 7777;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/elements", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json(elements);
});
app.listen(PORT, () => console.log(`Listening @ 7777.`));
