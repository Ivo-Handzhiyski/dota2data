import * as  mysql from 'mysql';
import $ from "jquery";
import fetch from "node-fetch";

// create connection to the mysql
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "dota2data"
});

// retrives data from the given url (must contain json)
async function getData(url){
    const response = await fetch( url
  );
    return response.json();
  }
  
// Gets the data for all heroes availible in the game
getData('https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1/?access_token=55e1dd21804a3f3f7a49f7dfdf2c1924&itemizedonly=true').then((data) => {
  // INSERT HEROES
  con.connect(function(err) {
  if (err) throw err;
  let sql = "INSERT INTO heroes (hero_id, hero_name) VALUES ?";
  let values = [];
  for (let index = 0; index < data.result.heroes.length; index++) {
    const element = data.result.heroes[index];
    let hero_name = element.name.split('hero_')[1].replace('_', ' ');
    let hero_id = element.id;
    values.push([hero_id, hero_name])
  }

  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
})})
// gets the data for all items availible in the game
getData('https://raw.githubusercontent.com/joshuaduffy/dota2api/master/dota2api/ref/items.json').then((data) => {
      // INSERT ITEMS
      con.connect(function(err) {
      let sql = "INSERT INTO items (item_id, item_name, price, recipe, secret_shop, side_shop) VALUES ?";
      let values = [];
      for (let index = 0; index < data.items.length; index++) {
        const element = data.items[index];
        let price = element.cost;
        let item_id = element.id;
        let item_name = element.localized_name;
        let recipe = element.recipe;
        let secret_shop = element.secret_shop;
        let side_shop = element.side_shop;
        // TODO: Add image
        values.push([item_id, item_name, price, recipe, secret_shop, side_shop])
      }
      con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
          });
    })})