import { generateId } from '../id';

export type DomainEventProps<Payload extends Record<string, unknown> = Record<string, unknown>> = {
  payload: Payload;
  aggregateId: string;
  correlationId?: string;
  happenedAt?: Date;
};

export abstract class DomainEvent<
  Payload extends Record<string, unknown> = Record<string, unknown>,
> {
  readonly id: string = generateId();

  readonly payload: Payload;
  readonly aggregateId: string;
  readonly happenedAt: Date;
  /**
   * For correlation purposes (for UnitOfWork, Integration Events, logs correlation, ...)
   * Set automatically in the publisher.
   */
  correlationId: string;
  /**
   * Type in the event stream
   */
  abstract readonly type: string;

  constructor(props: DomainEventProps<Payload>) {
    this.payload = props.payload;
    this.aggregateId = props.aggregateId;
    this.happenedAt = props.happenedAt ?? new Date();

    // We generate a random ID as default value while the event is not correlated yet.
    this.correlationId = props.correlationId ?? generateId();
  }

  correlate(correlationId: string): void {
    this.correlationId = correlationId;
  }

  isEqual(other: DomainEvent): boolean {
    /**
     * @TODO: consider to migrate to deep equality check
     */
    return this === other;
  }

  abstract payloadDto: unknown;
}
