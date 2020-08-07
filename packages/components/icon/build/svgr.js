const svgr = require('@svgr/core').default;
const hash = require('string-hash');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const tpl = require('./template.js');

const LIB_DIR = 'src/icons';
const INDEX_DIST_FILE = `${LIB_DIR}/index.ts`;

const ADDITIONAL_LIB_DIR = 'src/icons/additional';
const ADDITIONAL_INDEX_DIST_FILE = `${LIB_DIR}/additional/index.ts`;

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

const buildIconsSet = (path, libDir, indexDistFile) => {
  glob(path, {}, function(er, files) {
    for (let file of files) {
      const componentName = pascalCaseFilename(file);
      fs.readFile(file, 'UTF-8', (err, content) => {
        svgr(
          content,
          {
            template: tpl,
            plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
            svgoConfig: {
              "plugins": [{
                cleanupIDs: {
                  prefix: `svg-${hash(file)}`,
                },
                removeViewBox: false,
                removeDimensions: true,
              }]
            }
          },
          { componentName }
        ).then(jsCode => {
          fs.writeFile(`${libDir}/${componentName}.tsx`, jsCode, function(err) {
            fs.appendFileSync(indexDistFile, `export { default as ${componentName} } from './${componentName}';\n`);
            if (err) {
              return console.log(err);
            }
          });
        });
      });
    }
  });
};

if (!fs.existsSync(LIB_DIR)) {
  fs.mkdirSync(LIB_DIR);
}

if (!fs.existsSync(ADDITIONAL_LIB_DIR)) {
  fs.mkdirSync(ADDITIONAL_LIB_DIR);
}

fs.writeFile(INDEX_DIST_FILE, '', err => {
  console.log(err);
});

fs.writeFile(ADDITIONAL_INDEX_DIST_FILE, '', err => {
  console.log(err);
});


buildIconsSet('src/svg/*.svg', LIB_DIR, INDEX_DIST_FILE);
buildIconsSet('src/svg/additional/*.svg', ADDITIONAL_LIB_DIR, ADDITIONAL_INDEX_DIST_FILE);

