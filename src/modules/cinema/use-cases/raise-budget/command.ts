import type { MovieId } from '@cinema/domain/movie.entity';

export type RaiseBudgetCommand = {
  movieId: MovieId;
  amount: number;
};
