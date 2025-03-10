const MAX_DEPTH = 10;
const renderVariablesFileTemplate = ({ config, colors }) => {
  return `
const colors = ${colors};
const variables = ${config};

export default {
    variables,
    colors
}`;
};

const resolveVariable = (name, variables, depth = 0) => {
  if (!variables[name] || depth > MAX_DEPTH) {
    return null;
  }
  return variables[name].replace(/@[\w-]+/g, match => resolveVariable(match, variables, depth + 1) || match);
};
const stripPrefix = vars => {
  const temp = {};
  for (const name in vars) {
    if (Object.prototype.hasOwnProperty.call(vars, name)) {
      temp[name.slice(1)] = vars[name];
    }
  }
  return temp;
};

const fixRGBANotation = async vars => {
  // require() of ES Module hex-rgb is not supported
  const { default: hexRgb } = await import('hex-rgb');
  const temp = {};
  for (const name in vars) {
    if (Object.prototype.hasOwnProperty.call(vars, name)) {
      if (!vars[name]) {
        continue;
      }
      const matches = vars[name].match(/rgba\((#(.*){0,6}),(.*)*\)/);
      if (matches && matches.length > 3) {
        const rgb = hexRgb(matches[2]);
        temp[name] = `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${matches[3]})`;
      } else {
        temp[name] = vars[name];
      }
    }
  }
  return temp;
};

const prepare = async vars => {
  return await fixRGBANotation(stripPrefix(vars));
};

const generateFileContent = ({ colors, config }) => {
  return renderVariablesFileTemplate({
    config: JSON.stringify(config, undefined, '\t'),
    colors: JSON.stringify(colors, undefined, '\t'),
  });
};

module.exports = {
  prepare,
  fixRGBANotation,
  stripPrefix,
  resolveVariable,
  generateFileContent,
};
