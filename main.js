import * as mysql from "mysql";
import * as db from "./init_db.js";
import * as match from "./insert_match_data.js";
import fetch from "node-fetch";

// create connection to the mysql
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "dota2data"
});

let AccessToken = "eyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInI6MEVGNV8yM0Y1OUQ2OF84OTg2NyIsICJzdWIiOiAiNzY1NjExOTgwODkzNDAyNzUiLCAiYXVkIjogWyAid2ViOnN0b3JlIiBdLCAiZXhwIjogMTcxMzEwMjc1MiwgIm5iZiI6IDE3MDQzNzU0NDksICJpYXQiOiAxNzEzMDE1NDQ5LCAianRpIjogIjBGMDVfMjQzRjY0RjFfOEU1QzEiLCAib2F0IjogMTcwNzk0MDAxMSwgInJ0X2V4cCI6IDE3MjYwMTE2NzcsICJwZXIiOiAwLCAiaXBfc3ViamVjdCI6ICI3OC4xNTQuMTMuMTIzIiwgImlwX2NvbmZpcm1lciI6ICIyMTIuMzkuODkuMTA3IiB9.SeWUzij5N0sfvfddDKNp7ec42XQbtc0EItYdwwEBwnJExG8CAuvKFJaq3515ixjoOdf2_VKSddBswLi2cuKZAg";
let Player_ID = "129074547";
// Creates the database and the tables
//db.CreateDataBase(con);
//db.CreateTables(con);
console.log("here")
//match.insert_heroes_data(con);
//match.insert_items_data(con)
//match.insert_match_data_for_Player_ID(AccessToken, Player_ID, con);

match.insert_match_data(AccessToken, con);

