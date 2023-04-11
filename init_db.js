import * as  mysql from 'mysql';

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "dota2data"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS dota2data", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  CreateTables()
});

function CreateTables(){
  var sql_create_heroes = "CREATE TABLE IF NOT EXISTS heroes (hero_id INT, hero_name VARCHAR(255),  PRIMARY KEY (hero_id))";
  con.query(sql_create_heroes, function (err, result) {
    if (err) throw err;
    console.log("Heroes tables created created");
  });

  var sql_create_items = "CREATE TABLE IF NOT EXISTS items (item_id INT, item_name VARCHAR(255), price INT, recipe BOOL, secret_shop BOOL, side_shop BOOL,  PRIMARY KEY (item_id))";
  con.query(sql_create_items, function (err, result) {
    if (err) throw err;
    console.log("Items tables created created");
  });


  // MATCH TABLES WHICH WILL CONNECT TO ACCOUNT TABLE BY MATCH_ID
  var sql_create_match = "CREATE TABLE IF NOT EXISTS match (item_id INT, item_name VARCHAR(255), price INT, recipe BOOL, secret_shop BOOL, side_shop BOOL,  PRIMARY KEY (item_id))";
  con.query(sql_create_match, function (err, result) {
    if (err) throw err;
    console.log("Items tables created created");
  });
  // var sql_create_xxx = "CREATE TABLE IF NOT EXISTS heroes (hero_id INT, hero_name VARCHAR(255),  PRIMARY KEY (hero_id))";
  // con.query(sql_create_xxx, function (err, result) {
  //   if (err) throw err;
  //   console.log("Heroes tables created created");
  // });

}