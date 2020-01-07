import {AbstractEntityModel} from "./AbstractModel";

export class UserModel extends AbstractEntityModel {
  account = '';
  email = '';
  firstName = '';
  lastName = '';
  lastLogin = '';
  isActive = false;
  isStaff = false;
  groups = [];

  constructor() {
    super();
  }
}
