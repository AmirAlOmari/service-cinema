import { ActorEntity } from '@cinema/domain/actor.entity';
import type { ActorRepositoryPort } from '@cinema/ports/actor.repository.port';
import type { CreateActorCommand } from './command';

export class CreateActorService {
  constructor(private readonly allActors: ActorRepositoryPort) {}

  public async execute({
    firstName,
    lastName,
    netWorth,
  }: CreateActorCommand): Promise<ActorEntity> {
    const actor = ActorEntity.create({
      firstName,
      lastName,
      netWorth,
    });

    await this.allActors.save(actor);

    return actor;
  }
}
