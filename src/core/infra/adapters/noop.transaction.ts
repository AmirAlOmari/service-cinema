import type { TransactionPort } from '@core/infra/ports/transaction.port';
import { AbstractTransaction } from './abstract.transaction';

export class NoopTransaction extends AbstractTransaction implements TransactionPort {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }
}
