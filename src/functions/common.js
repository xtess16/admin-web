export function snakeToCamel(s) {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('_', '');
  });
}
export function camelToSnake(c) {
  return c.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}
/* Формирует два массива из одного по условию */
export function partitionArr(fullArray, cond) {
  const [first, second] = fullArray
      .reduce((result, element) => {
          result[cond(element) ? 0 : 1].push(element);
          return result;
        },
        [[], []]);

  return [first, second];
}
