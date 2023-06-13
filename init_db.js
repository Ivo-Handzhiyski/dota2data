import * as mysql from "mysql";

function CreateDataBase(con) {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(
      "CREATE DATABASE IF NOT EXISTS dota2data",
      function (err, result) {
        if (err) throw err;
        console.log("Database created");
      }
    );
  });
}

function CreateTables(con) {
  var sql_create_heroes =
    "CREATE TABLE IF NOT EXISTS heroes (hero_id INT, hero_name VARCHAR(255),  PRIMARY KEY (hero_id))";
  con.query(sql_create_heroes, function (err, result) {
    if (err) throw err;
    console.log("Heroes table created created");
  });

  var sql_create_items =
    "CREATE TABLE IF NOT EXISTS items (item_id INT, item_name VARCHAR(255), price INT, recipe BOOL, secret_shop BOOL, side_shop BOOL,  PRIMARY KEY (item_id))";
  con.query(sql_create_items, function (err, result) {
    if (err) throw err;
    console.log("Items table created created");
  });

  // MATCH TABLES WHICH WILL CONNECT TO ACCOUNT TABLE BY MATCH_ID
  var sql_create_match =
    "CREATE TABLE IF NOT EXISTS matches (match_id INT UNIQUE, match_seq_num INT, duration INT, engine INt, first_blood_time INT, flags INT, game_mode INT, human_players INT, pre_game_duration INT, radiant_score INT, radiant_win BOOLEAN, start_time INT, tower_status_dire INT, tower_status_radiant INT, PRIMARY KEY(match_id))";
  con.query(sql_create_match, function (err, result) {
    if (err) throw err;
    console.log("Match table created created");
  });

  var sql_create_player_match =
    "CREATE TABLE IF NOT EXISTS player_matches (account_id INT, match_id INT, aghanims_scepter BOOLEAN, aghanims_shard BOOLEAN, assists INT, backpack_0 BOOLEAN, backpack_1 BOOLEAN, backpack_2 BOOLEAN, deaths INT, denies INT, gold_per_min INT, hero_id INT, item_0 INT, item_1 INT, item_2 INT, item_3 INT, item_4 INT, item_5 INT, item_neutral INT, kills INT, last_hits INT, leaver_status BOOLEAN, level INT, moonshard BOOLEAN, net_worth INT, player_slot INT, team_number INT, xp_per_min INT, PRIMARY KEY(match_id, player_slot), FOREIGN KEY(match_id) REFERENCES matches(match_id), FOREIGN KEY(hero_id) REFERENCES heroes(hero_id))";
  con.query(sql_create_player_match, function (err, result) {
    if (err) throw err;
    console.log("Player Matches table created created");
  });
}

export { CreateDataBase, CreateTables };
