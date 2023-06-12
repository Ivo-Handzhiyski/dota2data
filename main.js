import * as  mysql from 'mysql';
import * as db from './init_db.js';
import fetch from "node-fetch";

 // create connection to the mysql
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "dota2data"
});

 // Creates the database and the tables
db.CreateDataBase();
db.CreateTables();





async function getData(url, num){  
    const response = await fetch(url);
  
    return response.json();
  }
  
  // GET MATCH BY SEQ NUM TODO FOR LOOP AND INCREASE EVERY START WITH 100
  // currently keeping it at 100,000 matches because if i use more it breaks , have to investage why this is caused
  // most likely because of the numbers of api calls
  
  
  
  
  for(let match_start_num = 0; match_start_num <= 100; match_start_num += 100){
    try {
      
      getData('https://api.steampowered.com/IDOTA2Match_570/GetMatchHistoryBySequenceNum/v1/?access_token=55e1dd21804a3f3f7a49f7dfdf2c1924&start_at_match_seq_num=' + match_start_num + '&matches_requested=100', match_start_num).then((data) => {
      // INSERT ITEMS
      
      console.log(data)
      // console.log(data.result.matches[0].picks_bans[0])
      // console.log(data.result.matches[0].players[0])
  })} 
  catch (error) {
    console.log(error)
  }}
  
  