const { lint } = require('.');

describe('scripts/bounded-context-isolation', () => {
  let mockExit;
  let spyConsole;

  beforeEach(() => {
    mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    spyConsole = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('should detect violations of the rules', async () => {
    // When
    await lint('./scripts/bounded-contexts-isolation/fixtures/src/modules/');

    // Then
    expect(mockExit).toHaveBeenCalled();

    expect(spyConsole).toHaveBeenCalledWith('Bounded contexts isolation not respected', [
      {
        boundedContext: 'labelling',
        file: './scripts/bounded-contexts-isolation/fixtures/src/modules/labelling/adapters/http-carrier.repository.ts',
        line: "import { logger } from 'scripts/bounded-contexts-isolation/fixtures/src/core/infra/logger';",
      },
      {
        boundedContext: 'weighing',
        file: './scripts/bounded-contexts-isolation/fixtures/src/modules/weighing/adapters/rpc-carrier.repository.ts',
        line: "import { HttpCarrierRepository } from '@labelling/adapters/http-carrier.repository';",
      },
      {
        boundedContext: 'weighing',
        file: './scripts/bounded-contexts-isolation/fixtures/src/modules/weighing/adapters/rpc-carrier.repository.ts',
        line: "import type { CarrierRepositoryPort } from '../../labelling/ports/carrier.repository';",
      },
    ]);
  });
});
