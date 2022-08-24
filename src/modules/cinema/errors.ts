export class InsufficientBudgetError extends Error {
  constructor(public readonly currentBudget: number, public readonly amount: number) {
    super(`Insufficient budget: ${currentBudget} < ${amount}`);
    this.name = 'InsufficientBudgetError';
  }
}

export class InsufficientNetWorthError extends Error {
  constructor(public readonly netWorth: number, public readonly amount: number) {
    super(`Insufficient net worth: ${netWorth} < ${amount}`);
    this.name = 'InsufficientNetWorthError';
  }
}

export * from '@core/infra/errors';

export function assertBudget(currentBudget: number, amount: number) {
  if (currentBudget < amount) {
    throw new InsufficientBudgetError(currentBudget, amount);
  }
}

export function assertNetWorth(netWorth: number, amount: number) {
  if (netWorth < amount) {
    throw new InsufficientNetWorthError(netWorth, amount);
  }
}
