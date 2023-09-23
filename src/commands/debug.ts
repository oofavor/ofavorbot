import { Command } from "../types.js";

export const debug: Command = (channel, userState, args) => {
    const url = ""
  fetch(url, {
    headers: {
      "content-type": "application/json",
      "TRN-Api-Key": process.env.TRACKER_TOKEN
    },
  });
};
