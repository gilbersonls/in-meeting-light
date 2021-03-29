import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseICS } from "node-ical";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await axios.get("");

  res.status(200).send(Object.values(parseICS(data)));
};
