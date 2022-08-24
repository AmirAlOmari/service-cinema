import { BadRequestError } from '@devcubyn/core.errors';

import { assertError } from './assert';

export class StateTransitionError extends BadRequestError {
  readonly currentState: string;
  readonly transition: string;
  readonly allowedStates: string[];

  constructor(currentState: string, transition: string, allowedStates: string[]) {
    super(`Transition "${transition}" is not allowed from state "${currentState}"`);

    this.currentState = currentState;
    this.transition = transition;
    this.allowedStates = allowedStates;
    this.name = 'StateTransitionError';
  }
}

export function assertTransition<TState extends string>(
  currentState: TState,
  allowedStates: TState[],
  transition: string,
) {
  return assertError(
    allowedStates.includes(currentState),
    StateTransitionError,
    currentState,
    transition,
    allowedStates,
  );
}
