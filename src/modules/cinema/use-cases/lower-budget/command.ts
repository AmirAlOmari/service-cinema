import type { MovieId } from '@cinema/domain/movie.entity';

export type LowerBudgetCommand = {
  movieId: MovieId;
  amount: number;
};
