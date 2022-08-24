import { assertFound } from '@cinema/errors';
import type { ActorEntity } from '@cinema/domain/actor.entity';
import type { MovieEntity } from '@cinema/domain/movie.entity';
import type { ActorRepositoryPort } from '@cinema/ports/actor.repository.port';
import type { MovieRepositoryPort } from '@cinema/ports/movie.repository.port';
import type { HireActorCommand } from './command';

export class HireActorService {
  constructor(
    private readonly allMovies: MovieRepositoryPort,
    private readonly allActors: ActorRepositoryPort,
  ) {}

  public async execute({
    movieId,
    actorId,
    paid,
  }: HireActorCommand): Promise<{ movie: MovieEntity; actor: ActorEntity }> {
    const movie = await this.allMovies.findOneById(movieId);
    assertFound(movie, `Movie`, movieId);

    const actor = await this.allActors.findOneById(actorId);
    assertFound(actor, `Actor`, actorId);

    movie.hireActor(actorId, paid);
    actor.hireForMovie(movieId);

    await this.allMovies.save(movie);
    await this.allActors.save(actor);

    return {
      movie,
      actor,
    };
  }
}
