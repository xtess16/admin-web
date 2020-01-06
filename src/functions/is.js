/* Функции-проверки */

/* TRUE - объект не пустой */
export function isNotEmptyObject(object) {
  return !!object && !!Object.keys(object).length;
}

/* TRUE - массив не пустой */
export function isNotEmptyArray(array) {
  return array && array.length > 0;
}
