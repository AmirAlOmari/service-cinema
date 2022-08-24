import type {
  NativeTransactionPort,
  TransactionAction,
  TransactionPort,
} from '@core/infra/ports/transaction.port';

export abstract class AbstractTransaction implements TransactionPort {
  constructor(readonly nativeTrx?: NativeTransactionPort) {}

  protected readonly onCommitActions: TransactionAction[] = [];
  protected readonly onRollbackActions: TransactionAction[] = [];

  onCommit(action: TransactionAction): this {
    this.onCommitActions.push(action);

    return this;
  }

  onRollback(action: TransactionAction): this {
    this.onRollbackActions.push(action);

    return this;
  }

  async commit(): Promise<void> {
    await this.nativeTrx?.commit();
    await this.executeOnCommitActions();
  }

  async rollback(): Promise<void> {
    await this.nativeTrx?.rollback();
    await this.executeOnRollbackActions();
  }

  protected async executeOnCommitActions(): Promise<void> {
    await Promise.all(this.onCommitActions.map(async (action) => action()));
  }

  protected async executeOnRollbackActions(): Promise<void> {
    await Promise.all(this.onRollbackActions.map(async (action) => action()));
  }
}
