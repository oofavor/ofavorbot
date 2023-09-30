import axios from "axios";
import { client } from "../main.js";
import { Command } from "../types.js";
import { getIdByUsername } from "../services/users.js";
import { getTwitch } from "../services/utils.js";

export const followage: Command = async (channel, chatUser, args) => {
  const streamerId = await getIdByUsername(channel.slice(1, channel.length));
  const url = `https://api.twitch.tv/helix/channels/followed?user_id=${chatUser["user-id"]}&broadcaster_id=${streamerId}`;
  const followed = await getTwitch(url);
  const followDate = new Date(followed.data.data[0].followed_at)
  const dateNow = new Date()
  const diff = dateNow.getTime() - followDate.getTime() / 1000 / 60 / 60 / 24
  console.log(followed.data.data)
  console.log(dateNow)
  console.log(diff)
};
