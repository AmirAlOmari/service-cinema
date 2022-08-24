import { MovieEntity, MovieId, MovieProps } from '@cinema/domain/movie.entity';

export type MovieDto = Record<'id', MovieId> & MovieProps;

export type MovieModel = Record<'id', MovieId> &
  MovieProps & {
    isDeleted?: boolean;
  };

export class MovieMapper {
  public static toDto(movie: MovieEntity): MovieDto {
    return {
      id: movie.id,
      name: movie.name,
      description: movie.description,
      overallBudget: movie.overallBudget,
      currentBudget: movie.currentBudget,
      releasedAt: movie.releasedAt,
      actorEntries: movie.actorEntries,
    };
  }

  public static toPersistence(movie: MovieEntity): MovieModel {
    return {
      id: movie.id,
      name: movie.name,
      description: movie.description,
      overallBudget: movie.overallBudget,
      currentBudget: movie.currentBudget,
      releasedAt: movie.releasedAt,
      actorEntries: movie.actorEntries,
    };
  }

  public static toDomain(movie: MovieDto): MovieEntity {
    return MovieEntity.hydrate(
      {
        name: movie.name,
        description: movie.description,
        overallBudget: movie.overallBudget,
        currentBudget: movie.currentBudget,
        releasedAt: movie.releasedAt,
        actorEntries: movie.actorEntries,
      },
      movie.id,
    );
  }
}
