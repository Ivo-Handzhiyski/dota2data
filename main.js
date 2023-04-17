import * as  mysql from 'mysql';
import * as xd from './init_db.js';

//create connection to the mysql
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "dota2data"
});

//Creates the database and the tables
xd.CreateDataBase();
xd.CreateTables();