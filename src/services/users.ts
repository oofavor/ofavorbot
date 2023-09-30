import { User } from "../types.js";
import { users } from "../db.js";
import axios from "axios";
import { getTwitch } from "./utils.js";

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
  const url = `https://api.twitch.tv/helix/users?login=${username}`;

  const res = await getTwitch(url)
  const user = res.data.data[0];

  return user.id;
};
