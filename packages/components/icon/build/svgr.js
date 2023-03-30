const svgr = require('@svgr/core').default;
const hash = require('string-hash');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const tpl = require('./template.js');

const LIB_DIR = 'src/icons';
const ADDITIONAL_LIB_DIR = 'src/icons/additional';
const L_LIB_DIR = 'src/icons/L';
const XL_LIB_DIR = 'src/icons/XL';

const INDEX_DIST_FILE = `${LIB_DIR}/index.ts`;
const ADDITIONAL_INDEX_DIST_FILE = `${ADDITIONAL_LIB_DIR}/index.ts`;
const L_INDEX_DIST_FILE = `${L_LIB_DIR}/index.ts`;
const XL_INDEX_DIST_FILE = `${XL_LIB_DIR}/index.ts`;

const LIB_DIRS = [LIB_DIR, ADDITIONAL_LIB_DIR, L_LIB_DIR, XL_LIB_DIR];
const DIST_FILES = [INDEX_DIST_FILE, ADDITIONAL_INDEX_DIST_FILE, L_INDEX_DIST_FILE, XL_INDEX_DIST_FILE];

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

const kebabCaseFilename = filePath => {
  const filename = path.basename(filePath).replace('.svg', '');
  return filename;
};

const buildIconsSet = (path, libDir, indexDistFile) => {
  glob(path, {}, function(er, files) {
    for (let file of files) {
      const componentName = pascalCaseFilename(file);
      const componentClassName = kebabCaseFilename(file);
      fs.readFile(file, 'UTF-8', (err, content) => {
        svgr(
          content,
          {
            template: tpl,
            plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
            svgoConfig: {
              "plugins": [{
                addClassesToSVGElement: {
                  className: componentClassName,
                },
                cleanupIDs: {
                  prefix: `svg-${hash(file)}`,
                },
                removeViewBox: false,
                removeDimensions: true,
                inlineStyles: {
                  onlyMatchedOnce: false,
                },
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

LIB_DIRS.forEach(DIR => {
  if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR);
  }
});

DIST_FILES.forEach(FILE => {
  fs.writeFile(FILE, '', err => {
    console.log(err);
  });
});

buildIconsSet('src/svg/*.svg', LIB_DIR, INDEX_DIST_FILE);
buildIconsSet('src/svg/additional/*.svg', ADDITIONAL_LIB_DIR, ADDITIONAL_INDEX_DIST_FILE);
buildIconsSet('src/svg/L/*.svg', L_LIB_DIR, L_INDEX_DIST_FILE);
buildIconsSet('src/svg/XL/*.svg', XL_LIB_DIR, XL_INDEX_DIST_FILE);

