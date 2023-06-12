CREATE TABLE IF NOT EXISTS heroes (
    hero_id INT, 
    hero_name VARCHAR(255),  
    PRIMARY KEY (hero_id)
);

CREATE TABLE IF NOT EXISTS items (
    item_id INT, 
    item_name VARCHAR(255), 
    price INT, 
    recipe BOOL, 
    secret_shop BOOL, 
    side_shop BOOL,  
    PRIMARY KEY (item_id)
);

CREATE TABLE IF NOT EXISTS matches (
    match_id INT UNIQUE,
    match_seq_num INT,
    duration INT,
    engine INT,
    first_blood_time INT,
    flags INT,
    game_mode INT,
    human_players INT,
    pre_game_duration INT,
    radiant_score INT,
    radiant_win BOOL,
    start_time INT,
    tower_status_dire INT,
    tower_status_radiant INT,
    PRIMARY KEY (match_id)
);

CREATE TABLE IF NOT EXISTS player_matches(
    account_id INT,
    match_id INT,
    aghanims_scepter BOOLEAN,
    aghanims_shard BOOLEAN,
    assists INT,
    backpack_0 BOOLEAN,
    backpack_1 BOOLEAN,
    backpack_2 BOOLEAN,
    deaths INT,
    denies INT,
    gold_per_min INT,
    hero_id INT,
    item_0 INT,
    item_1 INT,
    item_2 INT,
    item_3 INT,
    item_4 INT,
    item_5 INT,
    item_neutral INT,
    kills INT,
    last_hits INT,
    leaver_status BOOLEAN,
    level INT,
    moonshard BOOLEAN,
    net_worth INT,
    player_slot INT,
    team_number INT,
    xp_per_min INT,
    PRIMARY KEY(match_id,player_slot),
    FOREIGN KEY(match_id) REFERENCES matches(match_id),
    FOREIGN KEY(hero_id) REFERENCES heroes(hero_id)
);

