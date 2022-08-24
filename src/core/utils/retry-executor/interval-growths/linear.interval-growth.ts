import { AbstractIntervalGrowth } from './abstract.interval-growth';

export class LinearIntervalGrowth extends AbstractIntervalGrowth {
  constructor(private readonly retryInterval: number) {
    super();
  }

  protected retries: number = 0;

  async wait() {
    this.retries++;

    await new Promise((resolve) => setTimeout(resolve, this.retryInterval * this.retries));
  }
}
