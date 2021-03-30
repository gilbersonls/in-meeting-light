import { Controller, Get } from '@nestjs/common';
import { CalendarComponent } from 'node-ical';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/events')
  async getEvents(): Promise<{ events: CalendarComponent[] }> {
    const events = await this.appService.getEvents();
    return { events };
  }
}
