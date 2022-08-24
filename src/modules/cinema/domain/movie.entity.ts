import moment from 'moment';

import { assertFound, assertBudget } from '@cinema/errors';
import { AggregateRoot } from '@core/domain/base-classes/aggregate-root.base';
import type { ActorId } from '@cinema/domain/actor.entity';

export type MovieId = string;

export type ActorEntry = {
  actorId: ActorId;
  paid: number;
};

export type MovieProps = {
  name: string;
  description: string;
  overallBudget: number;
  currentBudget: number;
  releasedAt: moment.Moment | null;
  actorEntries: ActorEntry[];
};

export class MovieEntity extends AggregateRoot<MovieProps> implements MovieProps {
  private constructor(props: MovieProps, id?: MovieId) {
    super(props, id);
  }

  static create(
    props: Omit<MovieProps, 'currentBudget' | 'releasedAt' | 'actorEntries'>,
    id?: MovieId,
  ) {
    const movie = new MovieEntity(
      {
        ...props,
        currentBudget: props.overallBudget,
        releasedAt: null,
        actorEntries: [],
      },
      id,
    );

    return movie;
  }

  static hydrate(props: MovieProps, id: MovieId) {
    return new MovieEntity(props, id);
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get overallBudget() {
    return this.props.overallBudget;
  }

  get currentBudget() {
    return this.props.currentBudget;
  }

  get releasedAt() {
    return this.props.releasedAt;
  }

  get actorEntries() {
    return this.props.actorEntries;
  }

  get isReleased() {
    return !!this.props.releasedAt && this.props.releasedAt.isBefore(moment());
  }

  raiseBudget(amount: number): void {
    this.props.overallBudget += amount;
    this.props.currentBudget += amount;
  }

  lowerBudget(amount: number): void {
    this.subtractOverallBudget(amount);
    this.subtractCurrentBudget(amount);
  }

  releaseAt(date: moment.Moment): void {
    this.props.releasedAt = date;
  }

  payActor(actorId: ActorId, amount: number): void {
    const actorEntry = this.props.actorEntries.find(
      (innerActorEntry) => innerActorEntry.actorId === actorId,
    );
    assertFound(actorEntry, 'Actor', actorId);

    this.subtractCurrentBudget(amount);
    actorEntry.paid += amount;
  }

  hireActor(actorId: ActorId, paid: number): void {
    this.subtractCurrentBudget(paid);

    this.props.actorEntries.push({
      actorId,
      paid,
    });
  }

  private subtractOverallBudget(amount: number): void {
    assertBudget(this.props.overallBudget, this.props.currentBudget);

    this.props.overallBudget -= amount;
  }

  private subtractCurrentBudget(amount: number): void {
    assertBudget(this.props.currentBudget, amount);

    this.props.currentBudget -= amount;
  }
}
