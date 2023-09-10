import tmi from "tmi.js";
import { controller } from "./controller";
import "dotenv/config";

// Create a client with our options
const opts: tmi.Options = {
  options: { debug: true, messagesLogLevel: "info" },
  identity: {
    username: process.env.USERNAME,
    password: process.env.TOKEN,
  },
  channels: ["ofavor"],
};

export const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", controller);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect().catch((e) => {
  console.log(e);
});

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr: string, port: number) {
  console.log(`* Connected to ${addr}:${port}`);
}

