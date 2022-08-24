import type { ActorId } from '@cinema/domain/actor.entity';
import type { MovieId } from '@cinema/domain/movie.entity';

export type PayActorCommand = {
  actorId: ActorId;
  movieId: MovieId;
  amount: number;
};
