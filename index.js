const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { items } = require("./src/route/items.route");

app.get("/", (req, res) => {
  res.send("vosar-news.com");
});
items(app);

const port = 8081;
app.listen(port, () => {
  console.log("http://localhost:" + port);
});
