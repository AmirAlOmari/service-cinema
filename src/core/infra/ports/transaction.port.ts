export type TransactionAction = () => Promise<unknown> | unknown;

export interface NativeTransactionPort {
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

export interface TransactionPort<
  NativeTransaction extends NativeTransactionPort = NativeTransactionPort,
> {
  nativeTrx?: NativeTransaction;
  onCommit(action: TransactionAction): TransactionPort<NativeTransaction>;
  onRollback(action: TransactionAction): TransactionPort<NativeTransaction>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
