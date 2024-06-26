import db from './database';
import { WebUser } from './tables/webuser';

let users: Array<WebUser>;

export type WebUsersFixture = {
  /**
   * Get the user with the given id
   * @param id - UserID of the WebUser
   */
  getByID(id: number): WebUser | undefined;
  /**
   * Get the user with the given username
   * @param username - UserName of the WebUser
   */
  getByUsername(username: string): WebUser | undefined;
  /**
   * Initializes the values for all WebUsers on the current database
   * @param force - If false, only load data if the current set is undefined
   */
  init(force?: boolean): Promise<void>;
};
export default {
  getByID: function (id: number) {
    return users.find((user: WebUser) => user.id === id);
  },
  getByUsername: function (username: string) {
    return users.find((user: WebUser) => user.username === username);
  },
  init: async function (force: boolean = false) {
    if (force || !users) {
      const sqlQuery = 'select * from WebUser';
      users = [];
      console.log('--- Loading WebUsers ---');

      const result = await db.query(sqlQuery);
      for (const userData of result.recordset) {
        const user = new WebUser(userData);
        users.push(user);
        console.log(`Added to list of WebUsers: ${user.id}`);
      }
      console.log('--- WebUser loading complete ---');
    } else {
      console.log('WebUser load aborted: data already exists');
    }
  },
} satisfies WebUsersFixture;
