import type { Handler } from '@devcubyn/carotte-runtime';
import { InMemoryMovieRepository } from '@cinema/adapters/in-memory.movie.repository';
import type { CreateMovieCommand } from '@cinema/use-cases/create-movie/command';
import { CreateMovieService } from '@cinema/use-cases/create-movie/service';
import { type MovieDto, MovieMapper } from '@cinema/mappers/movie.mapper';

export type Request = {
  payload: CreateMovieCommand;
};

export type Response = MovieDto;

export const handler: Handler<Request, Response> = async ({ data }) => {
  const movieRepository = InMemoryMovieRepository.getInstance();

  const createMovieService = new CreateMovieService(movieRepository);

  const movie = await createMovieService.execute(data.payload);

  return MovieMapper.toDto(movie);
};
