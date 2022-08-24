import { MovieEntity } from '@cinema/domain/movie.entity';
import type { MovieRepositoryPort } from '@cinema/ports/movie.repository.port';
import type { CreateMovieCommand } from './command';

export class CreateMovieService {
  constructor(private readonly allMovies: MovieRepositoryPort) {}

  public async execute({ name, description }: CreateMovieCommand): Promise<MovieEntity> {
    const movie = MovieEntity.create({
      name,
      description,
      overallBudget: 0,
    });

    await this.allMovies.save(movie);

    return movie;
  }
}
