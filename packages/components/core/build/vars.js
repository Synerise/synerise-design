const fs = require('fs');
const path = require('path');
const lessVarsToJs = require('less-vars-to-js');
const { resolveVariable, generateFileContent, prepare } = require('./utils.js');

const colorsLess = fs.readFileSync(path.resolve(__dirname, '../src/style/colors.less'), 'utf8');
const configLess = fs.readFileSync(path.resolve(__dirname, '../src/style/config.less'), 'utf8');

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
  const finalPath = path.resolve(__dirname, '../dist/js/DSProvider/ThemeProvider', 'variables.js');

  fs.writeFile(finalPath, fileContent, err => {
    if (err) console.log(err);
    else console.log(`variables created successfully.\n`);
  });
});
