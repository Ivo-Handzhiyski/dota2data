import $ from "jquery";
import fetch from "node-fetch";

async function getData(url, num){
  try{
    
    const response = await fetch( url
      );
      console.log(num)
        return response.json();
  
  } catch(error) {
    console.log(error);
  }
}




// getData('https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1/?access_token=55e1dd21804a3f3f7a49f7dfdf2c1924&match_id=7104281762').then((data) => {

//   // INSERT ITEMS
//   console.log(data.result)
//   console.log(data.result.picks_bans[0])
//   console.log(data.result.players[0])
// })
// GET MATCH BY SEQ NUM TODO FOR LOOP AND INCREASE EVERY START WITH 100
// currently keeping it at 100,000 calls because if i use more it breaks , have to investage why this is caused
// most likely because of the numbers of api calls
for(let match_start_num = 0; match_start_num <= 100000; match_start_num += 100){
  try {
    
    getData('https://api.steampowered.com/IDOTA2Match_570/GetMatchHistoryBySequenceNum/v1/?access_token=55e1dd21804a3f3f7a49f7dfdf2c1924&start_at_match_seq_num=' + match_start_num + '&matches_requested=100', match_start_num).then((data) => {
    // INSERT ITEMS
    if(data !== undefined) {
      if(data.result !== undefined){
        console.log(data)
      }
    }
   
    // console.log(data.result.matches[0].picks_bans[0])
    // console.log(data.result.matches[0].players[0])
})} 
catch (error) {
  console.log(error)
}}

