const QExecute = <T>(filters: string, dataSource: Array<T>): Array<T> => {
  const result: Array<T> = [];
  const fn = new Function("data", "return " + filters);

  for (let i = 0; i < dataSource.length; i++) {
    const data = dataSource[i];
    if (fn(data)) result.push(data);
  }
  return result;
};

export default QExecute;
