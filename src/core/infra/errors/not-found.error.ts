import { ResourceNotFoundError } from '@devcubyn/core.errors';

import { assertError } from './assert';

export function assertFound(
  condition: unknown,
  ...errorArguments: ConstructorParameters<typeof ResourceNotFoundError>
): asserts condition {
  return assertError(condition, ResourceNotFoundError, ...errorArguments);
}

export { ResourceNotFoundError } from '@devcubyn/core.errors';
