import { useQuery, useMutation } from "react-query";
import * as teams_api from "src/api/Teams";
import * as games_api from "src/api/Games";

export const useTeams = () => {
  let { data, status, error, refetch, isFetching } = useQuery(
    ["getTeams"],
    async (_key) => {
      let data = await teams_api.GetTeams();
      return data;
    },
    { cacheTime: 0, refetchOnWindowFocus: false }
  );

  return {
    data,
    status,
    error,
    refetch,
    isFetching,
  };
};
export const useGames = () => {
  let { data, status, error, refetch, isFetching } = useQuery(
    ["getGames"],
    async (_key) => {
      let data = await games_api.GetGames();
      return data;
    },
    { cacheTime: 0, refetchOnWindowFocus: false }
  );

  return {
    data,
    status,
    error,
    refetch,
    isFetching,
  };
};

type TeamsData = {
  firstTeam: string;
  firstElo: number;
  firstWins: number;
  firstLosses: number;
  secondTeam: string;
  secondElo: number;
  secondWins: number;
  secondLosses: number;
};

export const useTeamMutation = () => {
  return useMutation(async (dataToSend: TeamsData) => {
    console.log("dataToSend in mutation", dataToSend);
    await teams_api.UpdateTeams(dataToSend);

    console.log("success");
  });
};
type GamesData = {
  lower: number;
  upper: number;
};

export const useGameMutation = () => {
  return useMutation(async (dataToSend: GamesData) => {
    console.log("dataToSend in mutation", dataToSend);
    await games_api.PlayGames(dataToSend);

    console.log("success");
  });
};

export const useTeamsResetMutation = () => {
  return useMutation(async () => {
    await teams_api.ResetTeams();

    console.log("success");
  });
};
