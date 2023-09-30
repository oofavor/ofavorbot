import axios from "axios";
import { Command } from "../types.js";
import { client } from "../main.js";

export const rank: Command = async (channel, userState, args) => {
  const fullname = args.split("#");
  const name = fullname[0];
  const tag = fullname[1];

  const data = await axios.get(
    `https://api.henrikdev.xyz/valorant/v1/mmr/eu/${name}/${tag}`,
  );
  const rank = data.data.data.currenttierpatched;
  const pp = data.data.data.ranking_in_tier;
  client.say(channel, `${rank} ${pp}pp`);
};
