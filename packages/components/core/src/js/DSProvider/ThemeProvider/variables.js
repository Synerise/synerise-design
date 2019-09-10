/* eslint import/no-webpack-loader-syntax: off */
const colors = require('!less-vars-loader?resolveVariables!../../../style/colors.less');
const variables = require('!less-vars-loader?resolveVariables!../../../style/config.less');

const MAX_DEPTH = 8;

const resolveVariable = (name, variables, depth = 0) => {
  if (!variables[name] || depth > MAX_DEPTH) {
    return null;
  }
  return variables[name].replace(/@[\w-]+/g, match => resolveVariable(match.slice(1), depth + 1) || match);
};

for (const name in variables) {
  if (Object.prototype.hasOwnProperty.call(variables, name)) {
    variables[name] = resolveVariable(name, variables);
  }
}
for (const name in colors) {
  if (Object.prototype.hasOwnProperty.call(colors, name)) {
    colors[name] = resolveVariable(name, colors);
  }
}
export default {
  variables,
  colors,
};
