import { assertFound } from '@cinema/errors';
import type { MovieEntity } from '@cinema/domain/movie.entity';
import type { MovieRepositoryPort } from '@cinema/ports/movie.repository.port';
import type { LowerBudgetCommand } from './command';

export class LowerBudgetService {
  constructor(private readonly allMovies: MovieRepositoryPort) {}

  public async execute({ movieId, amount }: LowerBudgetCommand): Promise<MovieEntity> {
    const movie = await this.allMovies.findOneById(movieId);
    assertFound(movie, `Movie`, movieId);

    movie.lowerBudget(amount);

    await this.allMovies.save(movie);

    return movie;
  }
}
