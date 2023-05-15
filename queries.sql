-- calculates the win percent of all heroes
select hero_id, SUM(radiant_win) / COUNT(*) * 100  from matches m join player_matches pm on m.match_id  = pm.match_id GROUP BY pm.hero_id ORDER BY pm.hero_id ;

-- calculates the averages kills for all heroes
select hero_id, AVG(kills) from matches m join player_matches pm on m.match_id = pm.match_id GROUP BY pm.hero_id ORDER BY pm.hero_id ;

-- calculates the average deaths for all heroes
select hero_id, AVG(pm.deaths) from matches m join player_matches pm on m.match_id = pm.match_id GROUP BY pm.hero_id ORDER BY pm.hero_id ;

-- calculates the average assists for all heroes
select hero_id, AVG(pm.assists) from matches m join player_matches pm on m.match_id = pm.match_id GROUP BY pm.hero_id ORDER BY pm.hero_id ;

-- calculates the average KDA for all heroes
select hero_id, (( SUM(pm.kills) + SUM(pm.assists) ) / SUM(pm.deaths)) as KDA from matches m join player_matches pm on m.match_id = pm.match_id GROUP BY pm.hero_id ORDER BY pm.hero_id ;

-- calculates the win percent of the player
select pm.account_id, SUM(radiant_win) / COUNT(*) * 100 as Win_Percent, COUNT(*) as TotalGames  from player_matches pm join matches m on m.match_id = pm.match_id GROUP BY pm.account_id;
