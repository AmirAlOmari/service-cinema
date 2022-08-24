import type { AbstractIntervalGrowth } from './interval-growths';

export class RetryExecutor {
  constructor(
    private readonly method: () => unknown | Promise<unknown>,
    private readonly intervalGrowth: AbstractIntervalGrowth,
    private readonly maxRetries = 3,
  ) {}

  async execute() {
    let retries = 0;
    let error: Error | null = null;

    while (retries < this.maxRetries) {
      try {
        // eslint-disable-next-line @typescript-eslint/return-await
        return await this.method();
      } catch (innerError) {
        if (!this.isRetryableError(innerError)) {
          throw innerError;
        }

        error = innerError as Error;
        retries++;
        await this.intervalGrowth.wait();
      }
    }

    throw error!;
  }

  /**
   * Same behavior as carotte amqp.
   * https://github.com/cubyn/node-carotte-amqp/blob/b527d11c48685bd6f0db9ae375911325f14596a1/src/index.js#L615-L630
   */
  private isRetryableError(error: any): boolean {
    return !error.status;
  }
}
