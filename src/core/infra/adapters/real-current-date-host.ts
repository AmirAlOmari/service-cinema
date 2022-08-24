import type { CurrentDateHostPort } from '@core/infra/ports/current-date-host.port';

export class RealCurrentDateHost implements CurrentDateHostPort {
  get(): Date {
    return new Date();
  }
}
