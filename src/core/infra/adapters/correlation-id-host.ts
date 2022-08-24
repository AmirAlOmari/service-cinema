import type { CorrelationId } from '@core/infra/types/correlation-id.type';
import type { CorrelationIdHostPort } from '@core/infra/ports/correlation-id-host.port';

export class CorrelationIdHost implements CorrelationIdHostPort {
  constructor(private readonly correlationId: CorrelationId) {}

  get(): CorrelationId {
    return this.correlationId;
  }
}
