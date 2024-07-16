const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "vosar_news",
  port: 3306,
  namedPlaceholders: true,
});
module.exports = db;