/* eslint import/no-webpack-loader-syntax: off */
const colors = require('!less-vars-loader!../../../style/colors.less');
const variables = colors;

const MAX_DEPTH = 8;

const resolveVariable = (name, depth = 0) => {
  if (!variables[name] || depth > MAX_DEPTH) {
    return null;
  }
  return variables[name].replace(/@[\w-]+/g, match => resolveVariable(match.slice(1), depth + 1) || match);
};

for (const name in variables) {
  if (Object.prototype.hasOwnProperty.call(variables, name)) {
    variables[name] = resolveVariable(name);
  }
}
export default variables;
