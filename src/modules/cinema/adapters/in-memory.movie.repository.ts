import type { MovieEntity, MovieId } from '@cinema/domain/movie.entity';
import type {
  MovieFilters,
  MovieRepositoryPort,
  Pagination,
} from '@cinema/ports/movie.repository.port';
import { MovieModel, MovieMapper } from '@cinema/mappers/movie.mapper';

export class InMemoryMovieRepository implements MovieRepositoryPort {
  private static instance: InMemoryMovieRepository | null = null;

  public static getInstance(): InMemoryMovieRepository {
    if (!InMemoryMovieRepository.instance) {
      InMemoryMovieRepository.instance = new InMemoryMovieRepository();
    }

    return InMemoryMovieRepository.instance;
  }

  private constructor(private movies: MovieModel[] = []) {}

  async findOneById(id: MovieId): Promise<MovieEntity | null> {
    const movie = this.movies
      .filter(this.createFilteringPredicate())
      .find((innerMovie) => innerMovie.id === id);

    if (!movie) {
      return null;
    }

    return MovieMapper.toDomain(movie);
  }

  async findAll(): Promise<MovieEntity[]> {
    return this.movies
      .filter(this.createFilteringPredicate())
      .map((movie) => MovieMapper.toDomain(movie));
  }

  async list(filters: MovieFilters, pagination: Pagination): Promise<MovieEntity[]> {
    return this.movies
      .filter(this.createFilteringPredicate(filters))
      .slice(pagination.offset, pagination.limit)
      .map((movie) => MovieMapper.toDomain(movie));
  }

  async save(movie: MovieEntity): Promise<void> {
    const foundIndex = this.movies.findIndex((innerMovie) => innerMovie.id === movie.id);

    if (foundIndex === -1) {
      this.movies.push(MovieMapper.toPersistence(movie));
    } else {
      this.movies[foundIndex] = MovieMapper.toPersistence(movie);
    }
  }

  async softDelete(id: MovieId): Promise<void> {
    const foundIndex = this.movies.findIndex((movie) => movie.id === id);

    if (foundIndex === -1) {
      return;
    }

    this.movies[foundIndex].isDeleted = true;
  }

  private createFilteringPredicate(filters: MovieFilters = {}): (movie: MovieModel) => boolean {
    return (movie) => {
      if (movie.isDeleted) {
        return false;
      }

      if (filters.name && movie.name !== filters.name) {
        return false;
      }

      if (filters.description && movie.description !== filters.description) {
        return false;
      }

      if (filters.actorIds && filters.actorIds.length > 0) {
        return movie.actorEntries.some((actorEntry) =>
          filters.actorIds!.includes(actorEntry.actorId),
        );
      }

      return true;
    };
  }
}
