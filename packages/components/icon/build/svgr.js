const svgr = require('@svgr/core').default;
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const tpl = require('./template.js');

const LIB_DIR = 'src/icons';
const INDEX_DIST_FILE = `${LIB_DIR}/index.ts`;

const titlecase = input => input[0].toLocaleUpperCase() + input.slice(1);

const pascalCase = value => {
  if (value === null || value === void 0) return '';
  if (typeof value.toString !== 'function') return '';

  let input = value.toString().trim();
  if (input === '') return '';
  if (input.length === 1) return input.toLocaleUpperCase();

  let match = input.match(/[a-zA-Z0-9]+/g);
  if (match) {
    return match.map(m => titlecase(m)).join('');
  }

  return input;
};

const pascalCaseFilename = filePath => {
  const filename = path.basename(filePath).replace('.svg', '');
  return pascalCase(filename);
};

if (!fs.existsSync(LIB_DIR)) {
  fs.mkdirSync(LIB_DIR);
}

fs.writeFile(INDEX_DIST_FILE, '', err => {
  console.log(err);
});

glob('src/svg/*.svg', {}, function(er, files) {
  for (let file of files) {
    const componentName = pascalCaseFilename(file);
    fs.readFile(file, 'UTF-8', (err, content) => {
      svgr(
        content,
        {
          template: tpl,
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
        },
        { componentName }
      ).then(jsCode => {
        fs.writeFile(`${LIB_DIR}/${componentName}.tsx`, jsCode, function(err) {
          fs.appendFileSync(INDEX_DIST_FILE, `export { default as ${componentName} } from './${componentName}';\n`);
          if (err) {
            return console.log(err);
          }
        });
      });
    });
  }
});
