import React, { useState } from "react";
import "./App.css";
import Teams from "src/teams/Teams";
import * as queries from "src/utils/queries";
import * as Placeholders from "src/teams/Placeholders";
import {
  useTeams,
  useTeamMutation,
  useGames,
  useGameMutation,
  useTeamsResetMutation,
} from "src/api/Queries";
import { ThemeProvider } from "emotion-theming";
import { Select, Input, Button } from "@chakra-ui/core";
import { lightTheme1 } from "src/styled/eloTheme";

function App() {
  const [sortBy, setSortBy] = useState("name");
  const TeamsQuery = useTeams();
  const GamesQuery = useGames();
  const [teamMutate] = useTeamMutation();
  const [gameMutate] = useGameMutation();
  const [teamsResetMutate] = useTeamsResetMutation();
  const [firstTeam, setFirstTeam] = useState("");
  const [secondTeam, setSecondTeam] = useState("");
  const [firstTeamScore, setFirstTeamScore] = useState(0);
  const [secondTeamScore, setSecondTeamScore] = useState(0);
  const [amountOfGamesLower, setAmountOfGamesLower] = useState(0);
  const [amountOfGamesUpper, setAmountOfGamesUpper] = useState(0);

  const sortedData = () => {
    if (sortBy === "name") {
      return TeamsQuery.data.sort((a, b) => {
        let x = a.name.toLowerCase(),
          y = b.name.toLowerCase();

        return x < y ? -1 : x > y ? 1 : 0;
      });
    }
    return TeamsQuery.data.sort((a, b) => b[sortBy] - a[sortBy]);
  };
  const submitGame = async () => {
    if (!firstTeam || !secondTeam) {
      return;
    }
    const whoWon =
      firstTeamScore - secondTeamScore > 0 ? firstTeam : secondTeam;
    // need to send two sets of data. One for the winning team and one for the lossing team.
    const first = TeamsQuery.data.filter((team) => team.name === firstTeam)[0];
    const second = TeamsQuery.data.filter(
      (team) => team.name === secondTeam
    )[0];
    // elo algorithm
    const K = 32;

    let R1 = Math.pow(10, first.elo / 400);
    let R2 = Math.pow(10, second.elo / 400);

    let E1 = R1 / (R1 + R2);
    let E2 = R2 / (R1 + R2);

    let S1 = whoWon === firstTeam ? 1 : 0;
    let S2 = whoWon === secondTeam ? 1 : 0;

    let firstElo = first.elo + K * (S1 - E1);
    let secondElo = second.elo + K * (S2 - E2);

    const dataToSend = {
      firstTeam,
      firstElo,
      firstWins: first.wins + S1,
      firstLosses: first.losses + S2,
      secondTeam,
      secondElo,
      secondWins: second.wins + S2,
      secondLosses: second.losses + S1,
    };
    console.log("dataToSend :>> ", dataToSend);
    await teamMutate(dataToSend);
    TeamsQuery.refetch();
  };

  const trySomeGames = async () => {
    if (amountOfGamesLower - amountOfGamesUpper > 0) {
      return;
    }
    const dataToSend = {
      lower: amountOfGamesLower,
      upper: amountOfGamesUpper,
    };

    await gameMutate(dataToSend);
    TeamsQuery.refetch();
  };

  const reset = async () => {
    await teamsResetMutate();
    TeamsQuery.refetch();
  };

  return (
    <div className="app">
      <ThemeProvider theme={lightTheme1}>
        {queries.areAnyLoading(TeamsQuery, GamesQuery) && (
          <Placeholders.LoadingState />
        )}
        {queries.areAnyFailed(TeamsQuery, GamesQuery) && (
          <Placeholders.FailedState />
        )}
        {queries.areAllLoaded(TeamsQuery, GamesQuery) && (
          <>
            <h1>Teams</h1>
            <div className="myrow">
              <Select
                className="row-item"
                placeholder="Select Option"
                onChange={(e) => setFirstTeam(e.target.value)}
                value={firstTeam}
              >
                {TeamsQuery.data.map((team) => (
                  <option value={team.name} key={team.name}>
                    {team.name}
                  </option>
                ))}
              </Select>
              <h4 className="row-item">VS</h4>
              <Select
                className="row-item"
                placeholder="Select Option"
                onChange={(e) => setSecondTeam(e.target.value)}
                value={secondTeam}
              >
                {TeamsQuery.data.map((team) => (
                  <option value={team.name} key={team.name}>
                    {team.name}
                  </option>
                ))}
              </Select>
            </div>
            <h1>Score</h1>
            <div className="myrow">
              <Input
                className="row-item"
                placeholder={`${firstTeam} scored...`}
                value={firstTeamScore}
                onChange={(e) => setFirstTeamScore(e.target.value)}
                type="number"
                min="0"
              ></Input>
              <h4 className="row-item">-</h4>
              <Input
                className="row-item"
                placeholder={`${secondTeam} scored...`}
                value={secondTeamScore}
                onChange={(e) => setSecondTeamScore(e.target.value)}
                type="number"
                min="0"
              ></Input>
              <Button
                className="row-item"
                onClick={submitGame}
                variantColor="green"
                border="none"
                px="40px"
              >
                Submit
              </Button>
            </div>

            <p>Set range of games to play in the 2018 season? (out of 1230)</p>
            <div className="myrow">
              <Input
                className="row-item"
                placeholder={"0"}
                value={amountOfGamesLower}
                onChange={(e) => setAmountOfGamesLower(e.target.value)}
                type="number"
                min="0"
                max="1230"
              ></Input>
              <h4 className="row-item">-</h4>
              <Input
                className="row-item"
                placeholder={"0"}
                value={amountOfGamesUpper}
                onChange={(e) => setAmountOfGamesUpper(e.target.value)}
                type="number"
                min="0"
                max="1230"
              ></Input>
              <Button
                className="row-item"
                onClick={trySomeGames}
                variantColor="green"
                border="none"
                px="40px"
              >
                Submit
              </Button>
            </div>
            <Button
              onClick={reset}
              variantColor="red"
              border="none"
              px="40px"
              mb="40px"
            >
              Reset
            </Button>

            <Teams sortedData={sortedData()} setSortBy={setSortBy} />
          </>
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
