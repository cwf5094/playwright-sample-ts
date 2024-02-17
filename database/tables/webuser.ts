import { DataTable } from './data-table';

export class WebUser extends DataTable {
  readonly id: number;
  readonly username: string;
  readonly passwordHashed: string;
  readonly email: string;
  constructor(data) {
    super(data);
    this.id = data.UserID;
    this.username = data.UserName;
    this.passwordHashed = data.HashPassword;
    this.email = data.Email;
  }
}
