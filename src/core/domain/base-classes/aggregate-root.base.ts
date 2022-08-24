import { Entity } from './entity.base';
import type { DomainEvent } from './domain-event.base';

export type OmitTimestamps<T extends { createdAt: Date; updatedAt: Date }> = Omit<
  T,
  'createdAt' | 'updatedAt'
>;

export abstract class AggregateRoot<
  EntityProps = Record<string, unknown>,
> extends Entity<EntityProps> {
  private _domainEvents: DomainEvent[] = [];

  protected constructor(props: EntityProps, id?: string, domainEvents: DomainEvent[] = []) {
    super(props, id);
    this._domainEvents = domainEvents;
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
