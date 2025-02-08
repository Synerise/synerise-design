const fs = require('fs');
const path = require('path');
const lessVarsToJs = require('less-vars-to-js');

const variablesTemplate = (variables, colors) => {
  return (
    `const colors = ${colors};` +
    `\n` +
    `const variables = ${variables};` +
    `\n` +
    `export default { ` +
    `\n` +
    `   variables,` +
    `\n` +
    `   colors` +
    `\n` +
    `};\n`
  );
};

const colorsLess = fs.readFileSync(path.resolve(__dirname, '../src/style/colors.less'), 'utf8');
const configLess = fs.readFileSync(path.resolve(__dirname, '../src/style/config.less'), 'utf8');

const colorsDictionary = lessVarsToJs(colorsLess, { resolveVariables: true, stripPrefix: true });
const colorsVars = lessVarsToJs(colorsLess, { resolveVariables: true });

const configVars = lessVarsToJs(configLess, {
  resolveVariables: true,
  dictionary: colorsDictionary,
});

const MAX_DEPTH = 10;

const allVars = {
  ...colorsVars,
  ...configVars,
};
const resolveVariable = (name, variables, depth = 0) => {
  if (!variables[name] || depth > MAX_DEPTH) {
    return null;
  }
  return variables[name].replace(/@[\w-]+/g, match => resolveVariable(match, variables, depth + 1) || match);
};

for (const name in configVars) {
  if (Object.prototype.hasOwnProperty.call(configVars, name)) {
    configVars[name] = resolveVariable(name, allVars);
  }
}
const stripPrefix = vars => {
  const temp = {};
  for (const name in vars) {
    if (Object.prototype.hasOwnProperty.call(vars, name)) {
      temp[name.slice(1)] = vars[name];
    }
  }
  return temp;
};

const cleanupRGBA = async vars => {
  const {default: hexRgb} = await import('hex-rgb');
  const temp = {};
  for (const name in vars) {
    if (Object.prototype.hasOwnProperty.call(vars, name)) {
      if (!vars[name]) {
        continue
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

const clean = async vars => {
  return await cleanupRGBA(stripPrefix(vars));
};

Promise.all([clean(configVars), clean(colorsVars)]).then(results => {
  const content = variablesTemplate(
    JSON.stringify(results[0], undefined, '\t'),
    JSON.stringify(results[1], undefined, '\t')
  );
  
  const finalPath = path.resolve(__dirname, '../dist/js/DSProvider/ThemeProvider', 'variables.js');
  
  fs.writeFile(finalPath, content, err => {
    if (err) console.log(err);
    else console.log(`variables created successfully.\n`);
  });
});
