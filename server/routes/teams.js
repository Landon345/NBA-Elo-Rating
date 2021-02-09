const express = require("express");
const db = require("../db/db");
const Router = express.Router();
const gamesData = require("../games");

Router.put("/update-teams", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const {
      firstTeam,
      firstElo,
      firstWins,
      firstLosses,
      secondTeam,
      secondElo,
      secondWins,
      secondLosses,
    } = req.body;
    await db.query(
      `UPDATE teams SET elo = ${firstElo}, wins=${firstWins}, losses=${firstLosses} WHERE name='${firstTeam}'`
    );
    await db.query(
      `UPDATE teams SET elo = ${secondElo}, wins=${secondWins}, losses=${secondLosses} WHERE name='${secondTeam}'`
    );
    res.send("teams updated successfully");
  } catch (error) {
    console.log("error", error);
    res.status(400).send("There was an error " + error);
  }
});

Router.get("/teams", async (req, res) => {
  try {
    console.log("req.params.sortby", req.query.sortby);
    const teams = await db.query(
      `SELECT * FROM teams ORDER BY ${req.query.sortby || "name"}`
    );

    res.send(teams.rows);
  } catch (error) {
    res.status(400).send("There was an error " + error);
  }
});

Router.get("/games", async (req, res) => {
  try {
    const games = await db.query(`SELECT * FROM games`);

    res.send(games.rows);
  } catch (error) {
    res.status(400).send("There was an error " + error);
  }
});

Router.put("/play-games", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { lower, upper } = req.body;
    for (let i = lower - 1; i < upper - 1; i++) {
      const game = gamesData[i];
      const homeScore = +game.Result.split(" - ")[0];
      const awayScore = +game.Result.split(" - ")[1];
      const homeTeam = game["Home Team"];
      const awayTeam = game["Away Team"];
      const whoWon = homeScore - awayScore > 0 ? homeTeam : awayTeam;

      const firstRows = await db.query(
        `Select * from teams where name='${homeTeam}'`
      );
      const secondRows = await db.query(
        `Select * from teams where name='${awayTeam}'`
      );
      const first = firstRows.rows[0];
      const second = secondRows.rows[0];
      const K = 32;

      let R1 = Math.pow(10, first.elo / 400);
      let R2 = Math.pow(10, second.elo / 400);

      let E1 = R1 / (R1 + R2);
      let E2 = R2 / (R1 + R2);

      let S1 = whoWon === homeTeam ? 1 : 0;
      let S2 = whoWon === awayTeam ? 1 : 0;

      let firstElo = first.elo + K * (S1 - E1);
      let secondElo = second.elo + K * (S2 - E2);

      const firstWins = first.wins + S1;
      const firstLosses = first.losses + S2;
      const secondWins = second.wins + S2;
      const secondLosses = second.losses + S1;

      console.log(
        `UPDATE teams SET elo = ${firstElo}, wins=${firstWins}, losses=${firstLosses} WHERE name='${homeTeam}'`
      );
      console.log(
        `UPDATE teams SET elo = ${secondElo}, wins=${secondWins}, losses=${secondLosses} WHERE name='${awayTeam}'`
      );

      await db.query(
        `UPDATE teams SET elo = ${firstElo}, wins=${firstWins}, losses=${firstLosses} WHERE name='${homeTeam}'`
      );
      await db.query(
        `UPDATE teams SET elo = ${secondElo}, wins=${secondWins}, losses=${secondLosses} WHERE name='${awayTeam}'`
      );
    }

    res.send("teams updated successfully");
  } catch (error) {
    console.log("error", error);
    res.status(400).send("There was an error " + error);
  }
});

Router.put("/reset-teams", async (req, res) => {
  try {
    const games = await db.query(
      `UPDATE teams SET elo = ${1200}, wins=${0}, losses=${0}`
    );

    res.send(games.rows);
  } catch (error) {
    res.status(400).send("There was an error " + error);
  }
});

module.exports = Router;
