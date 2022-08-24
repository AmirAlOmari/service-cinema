export const asyncGeneratorToArray = async <T>(iterator: AsyncGenerator<T>) => {
  const arr: T[] = [];

  for await (const entry of iterator) {
    arr.push(entry);
  }

  return arr;
};
