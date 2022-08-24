import type { LoggerFactoryPort } from './logger.factory.port';
import { buildLoggerMock } from './logger.mock';

export function buildLoggerFactoryMock(
  override: Partial<LoggerFactoryPort> = {},
): LoggerFactoryPort {
  return {
    create: () => buildLoggerMock(),
    ...override,
  };
}
