import { BASE_URL } from "src/api/BaseUrl";

export const GetGames = async () => {
  const response = await fetch(`${BASE_URL}/games`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const PlayGames = async (gamesData) => {
  const response = await fetch(`${BASE_URL}/play-games`, {
    method: "PUT",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(gamesData),
  });
  const data = await response.json();
  console.log(data);
  return data;
};
