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
type Attributes = {
  [key: string]: any;
};
const attribute: Attributes = attrItem.reduce((obj, item) => {
  // eslint-disable-next-line no-param-reassign
  obj[item] = {
    'data-attr': item,
  };
  return obj;
}, {});

export default attribute;
