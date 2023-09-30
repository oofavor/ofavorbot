import tmi from "tmi.js";
import { controller } from "./controller.js";
import "dotenv/config";

const opts: tmi.Options = {
  options: { debug: true, messagesLogLevel: "info" },
  identity: {
    username: process.env.USERNAME,
    password: process.env.TOKEN,
  },
  channels: ["ofavor", "b0nfir3_"],
};

export const client = new tmi.client(opts);

client.on("message", controller);
client.on("connected", onConnectedHandler);

client.connect().catch((e) => {
  console.log(e);
});

function onConnectedHandler(addr: string, port: number) {
  console.log(`* Connected to ${addr}:${port}`);
}
