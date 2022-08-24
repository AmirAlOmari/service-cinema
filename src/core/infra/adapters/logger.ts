import type { LoggerPort, LogMeta } from '@core/infra/ports/logger.port';

const coreLogger = require('@devcubyn/core.logger');

export const logger: LoggerPort = {
  info: coreLogger.info,
  warn: coreLogger.warn,
  error: coreLogger.error,
};

export class Logger implements LoggerPort {
  constructor(
    private readonly defaultMeta: LogMeta = {},
    private readonly innerLogger: LoggerPort = logger,
  ) {}

  info(message: string, meta: LogMeta = {}): void {
    this.innerLogger.info(message, { ...this.defaultMeta, ...meta });
  }

  warn(message: string, meta: LogMeta = {}): void {
    this.innerLogger.warn(message, { ...this.defaultMeta, ...meta });
  }

  error(message: string, meta: LogMeta = {}): void {
    this.innerLogger.error(message, { ...this.defaultMeta, ...meta });
  }
}
