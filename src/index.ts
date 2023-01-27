import express from "express";
import path from "path";
import * as presidentScraper from "./scrapers/president.scraper";

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use("/public", express.static(__dirname + "/public"));

const url = "https://en.wikipedia.org";

app.get("/", async (req, res) => {
  const presidents = await presidentScraper.getPresidents();
  res.render("index", { url: url, presidents: presidents });
});

app.listen(port, () => {
  console.log(`Running on ${port}`);
});
