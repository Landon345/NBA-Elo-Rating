import { BASE_URL } from "src/api/BaseUrl";

export const GetTeams = async () => {
  const response = await fetch(`${BASE_URL}/teams`, {
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
export const UpdateTeams = async (teamsData) => {
  console.log("teamsData", teamsData);
  const response = await fetch(`${BASE_URL}/update-teams`, {
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
    body: JSON.stringify(teamsData),
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export const ResetTeams = async () => {
  const response = await fetch(`${BASE_URL}/reset-teams`, {
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
  });
  const data = await response.json();
  console.log(data);
  return data;
};
