/**
 * ### QExecute Class
 *  * This class provides methods to execute queries constructed using the QFilterBuilder.
 * It encapsulates the logic for running and managing these queries efficiently.
 */

class QExecute<T> {
  /**
   * ## QExecute
   *
   * This function filters a data source based on the provided filter conditions.
   *
   * @param {string} filters - A string representing the filter conditions. For example: `"data.name === 'John' && data.age >= 20"`.
   * @param {Array<T>} dataSource - An array of items to be filtered.
   * @returns {Array<T>} An array of items that match the filter conditions.
   */
  protected QExecute(filters: string, dataSource: Array<T>): ReadonlyArray<T> {
    const result: Array<T> = [];
    const fn = new Function("data", "return " + filters);

    for (let i = 0; i < dataSource.length; i++) {
      const data = dataSource[i];
      if (fn(data)) result.push(data);
    }
    return result as ReadonlyArray<T>;
  }
}

export default QExecute;
