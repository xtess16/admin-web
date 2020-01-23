import {AbstractEntityModel} from "./AbstractModel";

export class UserModel extends AbstractEntityModel {
  account = '';
  email = '';
  firstName = '';
  lastName = '';
  lastLogin = '';
  isActive = true;
  isStaff = true;
  groups = [];

  constructor() {
    super();
  }

  serialize(user) {
    const converted = super.serialize(user);
    /* При создании/редактировании пользователя группы не передаём. Они сохраняются отдельно. */
    delete converted.groups;
    return converted;
  }
}
