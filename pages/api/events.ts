import { isWithinInterval, parseJSON } from "date-fns";
import type { NextApiRequest, NextApiResponse } from "next";
import { fromURL } from "node-ical";

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const data = await fromURL(process.env.ICS_REMOTE_URL);

  const events = Object.values(data).filter((event) => {
    const start = parseJSON(JSON.stringify(event.start));
    const end = parseJSON(JSON.stringify(event.end));
    return isWithinInterval(new Date(), { start, end });
  });

  res.status(200).send(JSON.stringify(events));
};
