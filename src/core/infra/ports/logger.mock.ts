import type { LoggerPort } from './logger.port';

export function buildLoggerMock(override: Partial<LoggerPort> = {}): LoggerPort {
  return {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    ...override,
  };
}
