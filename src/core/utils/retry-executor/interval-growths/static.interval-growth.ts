import { AbstractIntervalGrowth } from './abstract.interval-growth';

export class StaticIntervalGrowth extends AbstractIntervalGrowth {
  constructor(private readonly retryInterval: number) {
    super();
  }

  async wait() {
    await new Promise((resolve) => setTimeout(resolve, this.retryInterval));
  }
}
