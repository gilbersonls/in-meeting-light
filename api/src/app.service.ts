import { Injectable } from '@nestjs/common';
import { isWithinInterval, parseJSON } from 'date-fns';
import { CalendarComponent, fromURL } from 'node-ical';

@Injectable()
export class AppService {
  async getEvents(): Promise<CalendarComponent[]> {
    const data = await fromURL(process.env.ICS_REMOTE_URL);

    return Object.values(data).filter((event) => {
      const start = parseJSON(JSON.stringify(event.start));
      const end = parseJSON(JSON.stringify(event.end));
      return isWithinInterval(new Date(), { start, end });
    });
  }
}
