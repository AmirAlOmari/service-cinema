import type { LoggerFactoryPort } from '@core/infra/ports/logger.factory.port';
import type { LoggerPort, LogMeta } from '@core/infra/ports/logger.port';
import { Logger } from './logger';

export class LoggerFactory implements LoggerFactoryPort {
  constructor(private readonly innerLogger?: LoggerPort) {}

  create(scope?: string, meta?: LogMeta): Logger {
    return new Logger({ ...meta, scope }, this.innerLogger);
  }
}
