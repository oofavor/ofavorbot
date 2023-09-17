import { User } from "../types.js";
import { users } from "../db.js";

export const getUser = (userId: string) => {
  if (users[userId] === undefined) return createUser(userId);

  return users[userId];
};

export const createUser = (userId: string) => {
  if (users[userId] !== undefined) return;

  const newUser = getNewUser();

  users[userId] = newUser;

  return newUser;
};

const getNewUser = (): User => {
  return {
    balance: 1000,
  };
};

export const getIdByUsername = async (username: string) => {
  const headers = {
    Authorization: `Bearer ${process.env.TOKEN}`,
    "Client-Id": process.env.CLIENT_ID,
  };
  const url = `https://api.twitch.tv/helix/users?login=${username}`;

  const res = await fetch(url, { headers });
  const data = await res.json();
  const user = data.data[0];

  console.log(`username ${username} ${user.id}`);

  return user.id;
};
