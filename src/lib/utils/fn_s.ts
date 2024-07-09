const a = (expression, f) => {
  f.forEach((item) => {
    switch (item.type) {
      case "logicalOperator":
        expression = expression.concat(` ${item.operator} `);
        break;
      case "group":
        console.log("group");
        expression = expression.concat("(");
        expression = expression = a(expression, item.children);
        expression = expression.concat(")");
        break;
      default:
        expression = expression.concat(`data.${item.field} ${item.operator} ${item.value}`);
        break;
    }
  });
  return expression;
};

export default a;
