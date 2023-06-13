import * as mysql from "mysql";
import * as db from "./init_db.js";
import * as match from "./insert_match_data.js";
import fetch from "node-fetch";

// create connection to the mysql
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "dota2data",
});

let AccessToken = "72d397e2fd675a756d03bbcaeefdb2cf";

// Creates the database and the tables
db.CreateDataBase(con);
db.CreateTables(con);

match.insert_match_data(AccessToken, con);
