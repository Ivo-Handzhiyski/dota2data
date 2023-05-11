-- calculates the win percent of all heroes
select hero_id, SUM(radiant_win) / COUNT(*) * 100  from matches m join player_matches pm on m.match_id  = pm.match_id GROUP BY pm.hero_id ORDER BY pm.hero_id ;

-- calculates the averages kills for all heroes
select hero_id, AVG(kills) from matches m join player_matches pm on m.match_id = pm.match_id GROUP BY pm.hero_id ORDER BY pm.hero_id ;
