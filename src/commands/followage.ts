import axios from "axios";
import { client } from "../main.js";
import { Command } from "../types.js";
import { getIdByUsername } from "../services/users.js";
import { getTwitch } from "../services/utils.js";
import moment from "moment";
import humanizeDuration from "humanize-duration";

// api for this was deprecated
// solution is being a mod on a channel
// where the request is being sent
export const followage: Command = async (channel, chatUser, args) => {
    const streamerId = await getIdByUsername(channel.slice(1, channel.length));
    const url = `https://api.twitch.tv/helix/channels/followers?user_id=${chatUser["user-id"]}&broadcaster_id=${streamerId}`;

    const followed = await getTwitch(url);
    const data = followed.data.data;

    if (data.length === 0) return;

    const followedUser = data[0];
    const followDate = moment(followedUser.followed_at);
    const now = moment();

    const timeFollowed = humanizeDuration(
        moment.duration(now.diff(followDate, "milliseconds")),
        { language: "ru", round: true, conjunction: " и ", serialComma: false },
    );

    client.say(channel, `@${chatUser.username} ${timeFollowed}`);
};
