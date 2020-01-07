import {snakeToCamel, camelToSnake} from "../functions/common";

export class AbstractEntityModel {
  /* Все поля в дочерних классах нужно проинициализировать */
  id = '';

  /* Получаем объект с сервера и конвертируем его поля в нужный для работы на фронте формат */
  deserialize(arg) {
    const converted = {};
    Object.keys(arg).forEach(v => {
      converted[snakeToCamel(v)] = arg[v];
    });
    Object.assign(this, converted);
    return this;
  }

  /* Перед отправкой объекта на сервер конвертируем его поля в нужный для сохранения в базу формат */
  serialize(arg) {
    const converted = {};
    Object.keys(arg).forEach(v => {
      converted[camelToSnake(v)] = arg[v];
    });
    Object.assign(this, converted);
    return this;
  }
}
