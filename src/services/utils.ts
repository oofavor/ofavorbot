import axios from "axios";

export const getTwitch = async (url: string) => {
  const headers = {
    Authorization: `Bearer ${process.env.TOKEN}`,
    "Client-Id": process.env.CLIENT_ID,
  };

  const res = await axios.get(url, { headers });

  return res;
};
