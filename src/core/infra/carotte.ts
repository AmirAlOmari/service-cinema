import { logger } from '@core/infra/adapters/logger';
import { CarotteRuntimeBuilder, defaultMetrics } from '@devcubyn/carotte-runtime';

export const nodeJsVersionMetric = defaultMetrics.nodeJsVersion();
export const carotteRuntimeVersionMetric = defaultMetrics.carotteRuntimeVersion();

// Support for healthcheck logger
// https://github.com/cubyn/node-healthcheck/blob/develop/src/index.js
const carotteLogger = {
  ...logger,
  silly: logger.info,
};

export const runtime = CarotteRuntimeBuilder({ logger: carotteLogger });
