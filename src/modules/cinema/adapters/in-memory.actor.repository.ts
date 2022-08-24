/* eslint-disable complexity */
import type { ActorEntity, ActorId } from '@cinema/domain/actor.entity';
import type {
  ActorFilters,
  ActorRepositoryPort,
  Pagination,
} from '@cinema/ports/actor.repository.port';
import { ActorModel, ActorMapper } from '@cinema/mappers/actor.mapper';

export class InMemoryActorRepository implements ActorRepositoryPort {
  private static instance: InMemoryActorRepository | null = null;

  public static getInstance(): InMemoryActorRepository {
    if (!InMemoryActorRepository.instance) {
      InMemoryActorRepository.instance = new InMemoryActorRepository();
    }

    return InMemoryActorRepository.instance;
  }

  private constructor(private actors: ActorModel[] = []) {}

  async findOneById(id: ActorId): Promise<ActorEntity | null> {
    const actor = this.actors
      .filter(this.createFilteringPredicate())
      .find((innerActor) => innerActor.id === id);

    if (!actor) {
      return null;
    }

    return ActorMapper.toDomain(actor);
  }

  async findAll(): Promise<ActorEntity[]> {
    return this.actors
      .filter(this.createFilteringPredicate())
      .map((actor) => ActorMapper.toDomain(actor));
  }

  async list(filters: ActorFilters, pagination: Pagination): Promise<ActorEntity[]> {
    return this.actors
      .filter(this.createFilteringPredicate(filters))
      .slice(pagination.offset, pagination.limit)
      .map((actor) => ActorMapper.toDomain(actor));
  }

  async save(actor: ActorEntity): Promise<void> {
    const foundIndex = this.actors.findIndex((innerActor) => innerActor.id === actor.id);

    if (foundIndex === -1) {
      this.actors.push(ActorMapper.toPersistence(actor));
    } else {
      this.actors[foundIndex] = ActorMapper.toPersistence(actor);
    }
  }

  async softDelete(id: ActorId): Promise<void> {
    const foundIndex = this.actors.findIndex((actor) => actor.id === id);

    if (foundIndex === -1) {
      return;
    }

    this.actors[foundIndex].isDeleted = true;
  }

  private createFilteringPredicate(filters: ActorFilters = {}): (actor: ActorModel) => boolean {
    return (actor) => {
      if (actor.isDeleted) {
        return false;
      }

      if (filters.firstName && actor.firstName !== filters.firstName) {
        return false;
      }

      if (filters.lastName && actor.lastName !== filters.lastName) {
        return false;
      }

      if (filters.netWorth) {
        const leftBoundary = filters.netWorth[0] ?? 0;
        const rightBoundary = filters.netWorth[1] ?? Infinity;

        return actor.netWorth > leftBoundary && actor.netWorth < rightBoundary;
      }

      if (filters.movieIds && filters.movieIds.length > 0) {
        return actor.movieIds.some((innerMovieId) => filters.movieIds!.includes(innerMovieId));
      }

      return true;
    };
  }
}
