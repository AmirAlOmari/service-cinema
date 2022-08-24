import type { ActorId } from '@cinema/domain/actor.entity';
import type { MovieEntity, MovieId } from '@cinema/domain/movie.entity';

export type MovieFilters = {
  name?: string;
  description?: string;
  actorIds?: ActorId[];
};

export type Pagination = {
  offset: number;
  limit: number;
};

export interface MovieRepositoryPort {
  findOneById(id: MovieId): Promise<MovieEntity | null>;
  findAll(): Promise<MovieEntity[]>;
  list(filters: MovieFilters, pagination: Pagination): Promise<MovieEntity[]>;
  save(movie: MovieEntity): Promise<void>;
  softDelete(id: MovieId): Promise<void>;
}
