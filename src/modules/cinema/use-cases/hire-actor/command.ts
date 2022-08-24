import type { ActorId } from '@cinema/domain/actor.entity';
import type { MovieId } from '@cinema/domain/movie.entity';

export type HireActorCommand = {
  actorId: ActorId;
  movieId: MovieId;
  paid: number;
};
