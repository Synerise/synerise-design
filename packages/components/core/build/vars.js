const fs = require('fs');
const path = require('path');
const lessVarsToJs = require('less-vars-to-js');
const { resolveVariable, generateFileContent, prepare } = require('./utils.js');

const colorsLess = fs.readFileSync(path.resolve(__dirname, '../src/style/colors.less'), 'utf8');

// config.less holds the surface the design system and consumer apps use; antd-legacy.less
// holds the variables that exist only to theme antd and the deprecated menu/alert/table
// packages. They are parsed TOGETHER so theme.variables keeps its full surface — the split
// is a source-layout concern (antd-legacy.less is deletable once those packages retire),
// not a change to the public theme. Order matters: antd-legacy may reference config.
const configLess = [
  fs.readFileSync(path.resolve(__dirname, '../src/style/config.less'), 'utf8'),
  fs.readFileSync(path.resolve(__dirname, '../src/style/antd-legacy.less'), 'utf8'),
].join('\n');

const colorsDictionary = lessVarsToJs(colorsLess, { resolveVariables: true, stripPrefix: true });
const colorsVars = lessVarsToJs(colorsLess, { resolveVariables: true });

const configVars = lessVarsToJs(configLess, {
  resolveVariables: true,
  dictionary: colorsDictionary,
});

const allVars = {
  ...colorsVars,
  ...configVars,
};


for (const name in configVars) {
  if (Object.prototype.hasOwnProperty.call(configVars, name)) {
    configVars[name] = resolveVariable(name, allVars);
  }
}

Promise.all([prepare(configVars), prepare(colorsVars)]).then(([config, colors]) => {
  const fileContent = generateFileContent({ config, colors });
  const finalPath = path.resolve(__dirname, '../src/js/DSProvider/ThemeProvider', 'variables.ts');

  fs.writeFile(finalPath, fileContent, err => {
    if (err) console.log(err);
    else console.log(`variables created successfully.\n`);
  });
});
