import { AggregateRoot } from '@core/domain/base-classes/aggregate-root.base';
import { assertNetWorth } from '@cinema/errors';
import type { MovieId } from '@cinema/domain/movie.entity';

export type ActorId = string;

export type ActorProps = {
  firstName: string;
  lastName: string;
  netWorth: number;
  movieIds: MovieId[];
};

export class ActorEntity extends AggregateRoot<ActorProps> implements ActorProps {
  private constructor(props: ActorProps, id?: ActorId) {
    super(props, id);
  }

  static create(
    props: Omit<ActorProps, 'netWorth' | 'movieIds'> & Partial<Record<'netWorth', number>>,
    id?: ActorId,
  ) {
    const actor = new ActorEntity(
      {
        ...props,
        netWorth: props.netWorth ?? 0,
        movieIds: [],
      },
      id,
    );

    return actor;
  }

  static hydrate(props: ActorProps, id: ActorId) {
    return new ActorEntity(props, id);
  }

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get netWorth() {
    return this.props.netWorth;
  }

  get movieIds() {
    return this.props.movieIds;
  }

  set firstName(firstName: string) {
    this.props.firstName = firstName;
  }

  set lastName(lastName: string) {
    this.props.lastName = lastName;
  }

  hireForMovie(movieId: MovieId) {
    const foundIndex = this.props.movieIds.findIndex((innerMovieId) => innerMovieId === movieId);

    if (foundIndex === -1) {
      this.props.movieIds.push(movieId);
    }
  }

  pay(amount: number) {
    this.props.netWorth += amount;
  }

  payback(amount: number) {
    this.subtractNetWorth(amount);
  }

  private subtractNetWorth(amount: number) {
    assertNetWorth(this.props.netWorth, amount);

    this.props.netWorth -= amount;
  }
}
