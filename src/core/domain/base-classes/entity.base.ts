import { generateId } from '@core/domain/id';

export abstract class Entity<EntityProps> {
  private readonly _id: string;
  protected readonly props: EntityProps;

  constructor(props: EntityProps, id?: string) {
    this._id = id || generateId();
    this.props = props;
  }

  get id(): string {
    return this._id;
  }
}
