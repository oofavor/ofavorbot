import { User } from "../types";
import { users } from "../db";

export const getUser = (userId: string) => {
  if (!users.has(userId)) return createUser(userId);

  return users.get(userId);
};
export const createUser = (userId: string) => {
  if (users.has(userId)) return;

  const newUser = getNewUser();

  users.set(userId, newUser);

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

  console.log(`username ${username} ${user.id}`)

  return user.id;
};
