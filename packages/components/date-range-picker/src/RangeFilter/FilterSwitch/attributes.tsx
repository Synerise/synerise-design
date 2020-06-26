const attrItem = [
  'pageHeader',
  'buttonPreview',
  'buttonSave',
  'buttonOpenModalFilter',
  'buttonAddExpression',
  'dropdownFunction',
  'dropdownEventSelector',
  'dropdownMetricSelector',
  'selectorCondition',
  'selectorAttr',
  'selectorActionValue',
  'selectorExpressionAttribute',
];

const attribute = attrItem.reduce((obj, item) => {
  obj[item] = {
    'data-attr': item,
  };

  return obj;
}, {});

export default attribute;
