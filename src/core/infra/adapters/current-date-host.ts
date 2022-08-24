import type { CurrentDateHostPort } from '@core/infra/ports/current-date-host.port';

export class CurrentDateHost implements CurrentDateHostPort {
  constructor(private readonly currentDate: Date = new Date()) {}

  get() {
    return this.currentDate;
  }
}
