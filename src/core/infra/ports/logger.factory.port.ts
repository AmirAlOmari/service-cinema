import type { LoggerPort, LogMeta } from './logger.port';

export interface LoggerFactoryPort {
  create(scope?: string, meta?: LogMeta): LoggerPort;
}
