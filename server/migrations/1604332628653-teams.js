"use strict";
const db = require("../db/db");

module.exports.up = async function (next) {
  await db.query(
    `CREATE TABLE IF NOT EXISTS teams(
      name   VARCHAR(22) NOT NULL PRIMARY KEY
     ,wins   INTEGER  NOT NULL
     ,losses INTEGER  NOT NULL
     ,elo   INTEGER  NOT NULL
     ,logo  VARCHAR(255) NOT NULL
   );
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Boston Celtics',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/bos.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Brooklyn Nets',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/bkn.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('New York Knicks',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/nyk.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Philadelphia 76ers',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/phi.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Toronto Raptors',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/tor.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Golden State Warriors',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/gsw.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('LA Clippers',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/lac.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Los Angeles Lakers',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/lal.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Phoenix Suns',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/phx.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Sacramento Kings',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/sac.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Chicago Bulls',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/chi.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Cleveland Cavaliers',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/cle.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Detroit Pistons',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/det.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Indiana Pacers',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/ind.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Milwaukee Bucks',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/mil.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Dallas Mavericks',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/dal.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Houston Rockets',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/hou.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Memphis Grizzlies',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/mem.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('New Orleans Pelicans',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/nop.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('San Antonio Spurs',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/sas.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Atlanta Hawks',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/atl.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Charlotte Hornets',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/cha.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Miami Heat',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/mia.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Orlando Magic',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/orl.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Washington Wizards',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/was.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Denver Nuggets',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/den.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Minnesota Timberwolves',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/min.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Oklahoma City Thunder',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/okc.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Portland Trail Blazers',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/por.png');
   INSERT INTO teams(name,wins,losses,elo,logo) VALUES ('Utah Jazz',0,0,1200,'https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/uta.png');
   `
  );
  next();
};

module.exports.down = async function (next) {
  await db.query("DROP TABLE teams");
  next();
};
