import { ForbiddenError } from '@devcubyn/core.errors';

import { assertError } from './assert';

export function assertForbidden(
  condition: unknown,
  ...errorArguments: ConstructorParameters<typeof ForbiddenError>
): asserts condition {
  return assertError(condition, ForbiddenError, ...errorArguments);
}

export { ForbiddenError } from '@devcubyn/core.errors';
