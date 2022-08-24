export type ClassOf<T> = new (...args: any[]) => T;

export type InstanceTypeOf<T> = T extends {
  new (...args: any): infer U;
}
  ? U
  : never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const assertType = <T>(_value: T) => {};
