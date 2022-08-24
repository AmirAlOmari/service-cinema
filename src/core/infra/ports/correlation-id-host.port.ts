import type { CorrelationId } from '@core/infra/types/correlation-id.type';

export interface CorrelationIdHostPort {
  get(): CorrelationId;
}
