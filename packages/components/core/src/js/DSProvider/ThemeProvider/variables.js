/* eslint import/no-webpack-loader-syntax: off */
const colors = require('!@hon2a/less-vars-loader?resolveVariables!../../../style/colors.less');
const variables = require('!@hon2a/less-vars-loader?resolveVariables!../../../style/config.less');

const variablesValues = variables.default;
const colorsValues = colors.default;

const MAX_DEPTH = 8;

const resolveVariable = (name, vars, depth = 0) => {
  if (!vars[name] || depth > MAX_DEPTH) {
    return null;
  }
  return vars[name].replace(/@[\w-]+/g, match => resolveVariable(match.slice(1), depth + 1) || match);
};

for (const name in variablesValues) {
  if (Object.prototype.hasOwnProperty.call(variablesValues, name)) {
    variablesValues[name] = resolveVariable(name, variablesValues);
  }
}
for (const name in colorsValues) {
  if (Object.prototype.hasOwnProperty.call(colorsValues, name)) {
    colorsValues[name] = resolveVariable(name, colorsValues);
  }
}
export default {
  variables: variablesValues,
  colors: colorsValues,
};
