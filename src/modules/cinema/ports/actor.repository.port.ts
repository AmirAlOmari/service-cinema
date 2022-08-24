import type { ActorEntity, ActorId } from '@cinema/domain/actor.entity';
import type { MovieId } from '@cinema/domain/movie.entity';

export type ActorFilters = {
  firstName?: string;
  lastName?: string;
  netWorth?: [number | null, number | null];
  movieIds?: MovieId[];
};

export type Pagination = {
  offset: number;
  limit: number;
};

export interface ActorRepositoryPort {
  findOneById(id: ActorId): Promise<ActorEntity | null>;
  findAll(): Promise<ActorEntity[]>;
  list(filters: ActorFilters, pagination: Pagination): Promise<ActorEntity[]>;
  save(actor: ActorEntity): Promise<void>;
  softDelete(id: ActorId): Promise<void>;
}
