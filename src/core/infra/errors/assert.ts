import { BadRequestError } from '@devcubyn/core.errors';
import type { ClassOf } from '@core/utils/typings';

export function assertError<TError extends ClassOf<Error>>(
  condition: unknown,
  ErrorConstructor: TError,
  ...errorArguments: ConstructorParameters<TError>
): asserts condition {
  if (!condition) {
    throw new ErrorConstructor(...errorArguments);
  }
}

export function assert(
  condition: unknown,
  ...errorArguments: ConstructorParameters<typeof BadRequestError>
): asserts condition {
  return assertError(condition, BadRequestError, ...errorArguments);
}
