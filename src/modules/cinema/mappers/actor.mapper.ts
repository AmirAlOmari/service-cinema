import { ActorEntity, ActorId, ActorProps } from '@cinema/domain/actor.entity';

export type ActorDto = Record<'id', ActorId> & ActorProps;

export type ActorModel = Record<'id', ActorId> &
  ActorProps & {
    isDeleted?: boolean;
  };

export class ActorMapper {
  public static toDto(actor: ActorEntity): ActorDto {
    return {
      id: actor.id,
      firstName: actor.firstName,
      lastName: actor.lastName,
      netWorth: actor.netWorth,
      movieIds: actor.movieIds,
    };
  }

  public static toPersistence(actor: ActorEntity): ActorModel {
    return {
      id: actor.id,
      firstName: actor.firstName,
      lastName: actor.lastName,
      netWorth: actor.netWorth,
      movieIds: actor.movieIds,
    };
  }

  public static toDomain(actor: ActorDto): ActorEntity {
    return ActorEntity.hydrate(
      {
        firstName: actor.firstName,
        lastName: actor.lastName,
        netWorth: actor.netWorth,
        movieIds: actor.movieIds,
      },
      actor.id,
    );
  }
}
