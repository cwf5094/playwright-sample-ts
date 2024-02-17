/**
 * Any extension of this class will pull information from the database, and that information will be under 'data'
 */
export class DataTable {
  readonly data: Object;
  constructor(data) {
    this.data = data;
  }
}
