import { BadRequestError } from '@devcubyn/core.errors';

import { assertError } from './assert';

export function assertBadRequest(
  condition: unknown,
  ...errorArguments: ConstructorParameters<typeof BadRequestError>
): asserts condition {
  return assertError(condition, BadRequestError, ...errorArguments);
}

export { BadRequestError } from '@devcubyn/core.errors';
