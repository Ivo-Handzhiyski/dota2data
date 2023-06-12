import $ from "jquery";
import * as  mysql from 'mysql';
import fetch from "node-fetch";

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "dota2data"
});

function getData(url, num){  
  const response = fetch(url).then(x => x.json());

  return response;
}

// GET MATCH BY SEQ NUM TODO FOR LOOP AND INCREASE EVERY START WITH 100
// currently keeping it at 100,000 matches because if i use more it breaks , have to investage why this is caused
// most likely because of the numbers of api calls



con.connect(function(err) {
for(let match_start_num = 0; match_start_num <= 100000; match_start_num += 100){
  try {
    
    getData('https://api.steampowered.com/IDOTA2Match_570/GetMatchHistoryBySequenceNum/v1/?access_token=55e1dd21804a3f3f7a49f7dfdf2c1924&start_at_match_seq_num=' + match_start_num + '&matches_requested=100', match_start_num).then((data) => {
    // INSERT ITEMS || Ignore lets it skips rows with the same PK
      let sql_matches = "INSERT IGNORE INTO dota2data.matches (match_id, match_seq_num, duration, `engine`, first_blood_time, flags, game_mode, human_players, pre_game_duration, radiant_score, radiant_win, start_time, tower_status_dire, tower_status_radiant) VALUES ?";
      let sql_player_matches = "INSERT IGNORE INTO dota2data.player_matches(account_id, match_id, aghanims_scepter, aghanims_shard, assists, backpack_0, backpack_1, backpack_2, deaths, denies, gold_per_min, hero_id, item_0, item_1, item_2, item_3, item_4, item_5, item_neutral, kills, last_hits, leaver_status, `level`, moonshard, net_worth, player_slot, team_number, xp_per_min) VALUES ?";
      let values_match = [];
      let values_player_match = [];
      // data is of type json so we parse it here
      if(Object.keys(data).length !== 0){
        for (let index = 0; index < data.result.matches.length; index++) {
          //set variables to get the data from the json
          // basic data for the whole match
          const element = data.result.matches[index];
          let match_id = element.match_id;
          let match_seq_num = element.match_seq_num;
          let duration = element.duration;
          let engine = element.engine;
          let first_blood_time = element.first_blood_time;
          let flags = element.flags;
          let game_mode = element.game_mode;
          let human_players = element.human_players;
          let pre_game_duration = element.pre_game_duration;
          let radiant_score = element.radiant_score;
          let radiant_win = element.radiant_win;
          let start_time = element.start_time;
          let tower_status_dire = element.tower_status_dire;
          let tower_status_radiant = element.tower_status_radiant;
          values_match.push([match_id, match_seq_num, duration, engine, first_blood_time, flags, game_mode, human_players, pre_game_duration, radiant_score, radiant_win, start_time, tower_status_dire, tower_status_radiant])
        // here we get the data for every person who has played in the match
          for(let i = 0; i < element.players.length; i++){
            const player_match = element.players[i];
            let account_id = player_match.account_id;
            let aghanims_scepter = player_match.aghanims_scepter;
            let aghanims_shard = player_match.aghanims_shard;
            let assists = player_match.assists;
            let backpack_0 = player_match.backpack_0;
            let backpack_1 = player_match.backpack_1;
            let backpack_2 = player_match.backpack_2;
            let deaths = player_match.deaths;
            let denies = player_match.denies;
            let gold_per_min = player_match.gold_per_min;
            let hero_id = player_match.hero_id;
            let item_0 = player_match.item_0;
            let item_1 = player_match.item_1;
            let item_2 = player_match.item_2;
            let item_3 = player_match.item_3;
            let item_4 = player_match.item_4;
            let item_5 = player_match.item_5;
            let item_neutral = player_match.item_neutral;
            let kills = player_match.kills;
            let last_hits = player_match.last_hits;
            let leaver_status = player_match.leaver_status;
            let level = player_match.level;
            let moonshard = player_match.moonshard;
            let net_worth = player_match.net_worth;
            let player_slot = player_match.player_slot;
            let team_number = player_match.team_number;
            let xp_per_min = player_match.xp_per_min;
            values_player_match.push([account_id, match_id, aghanims_scepter, aghanims_shard, assists, backpack_0, backpack_1, backpack_2, deaths, denies, gold_per_min, hero_id, item_0, item_1, item_2, item_3, item_4, item_5, item_neutral, kills, last_hits, leaver_status, level, moonshard, net_worth, player_slot, team_number, xp_per_min])
          }
        }
        con.query(sql_matches, [values_match], function (err, result) {
              if (err) throw err;
              console.log("Number of records inserted: " + result.affectedRows);
            });
        con.query(sql_player_matches, [values_player_match], function (err, result) {
              if (err) throw err;
              console.log("Number of player matches inserted: " + result.affectedRows);
            });

      }
      
    })
}
catch (error) {
  console.log(error)
}}})



