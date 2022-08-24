import { assertFound } from '@cinema/errors';
import type { MovieEntity } from '@cinema/domain/movie.entity';
import type { MovieRepositoryPort } from '@cinema/ports/movie.repository.port';
import type { RaiseBudgetCommand } from './command';

export class RaiseBudgetService {
  constructor(private readonly allMovies: MovieRepositoryPort) {}

  public async execute({ movieId, amount }: RaiseBudgetCommand): Promise<MovieEntity> {
    const movie = await this.allMovies.findOneById(movieId);
    assertFound(movie, `Movie`, movieId);

    movie.raiseBudget(amount);

    await this.allMovies.save(movie);

    return movie;
  }
}
