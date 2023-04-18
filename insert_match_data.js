import $ from "jquery";
import fetch from "node-fetch";

async function getData(url){
    const response = await fetch( url
  );
    return response.json();
  }
  

getData('https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1/?access_token=55e1dd21804a3f3f7a49f7dfdf2c1924&match_id=7104281762').then((data) => {

  // INSERT ITEMS
  console.log(data.result)
  console.log(data.result.picks_bans[0])
  console.log(data.result.players[0])
})
// GET MATCH BY SEQ NUM TODO FOR LOOP AND INCREASE EVERY START WITH 100
getData('https://api.steampowered.com/IDOTA2Match_570/GetMatchHistoryBySequenceNum/v1/?access_token=55e1dd21804a3f3f7a49f7dfdf2c1924&matches_requested=1000000').then((data) => {

  // INSERT ITEMS
  console.log(data.result.matches[0])
  console.log(data.result.matches[0].picks_bans[0])
  console.log(data.result.matches[0].players[0])
})