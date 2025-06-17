const { transform } = require('@svgr/core');
const hash = require('string-hash');
const { glob } = require('glob');
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
const kebabCaseFilename = filePath => {
  const filename = path.basename(filePath).replace('.svg', '');
  return filename;
};

const buildIconsSet = (path, libDir, indexDistFile) => {
  glob(path, {}).then((files) => {
    for (let file of files) {
      const componentName = pascalCaseFilename(file);
      const componentClassName = kebabCaseFilename(file);
      fs.readFile(file, 'UTF-8', (err, content) => {
        transform(
          content,
          {
            template: tpl,
            typescript: true,
            plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
            svgoConfig: {
              "plugins": [
                {
                  name: "addAttributesToSVGElement",
                  params: {
                    attributes: [`data-testid="ds-flag-${componentClassName}"`]
                  }
                },
                {
                  name: 'prefixIds',
                  params: {
                    delim: '',
                    prefix: () => `svg-${hash(file)}`,
                  },
                },
                {
                  name: "cleanupIds",
                  params: {
                    remove: true,
                    minify: true,
                    preservePrefixes: [`svg-${hash(file)}`]
                  }
                },
                'removeDimensions',
                'convertStyleToAttrs',
                "removeTitle",
                {
                  name: "removeAttrs",
                  params: {
                    attrs: 'enable-background',
                    elemSeparator: ":",
                    preserveCurrentColor: false
                  }
                },
                {
                  name: "inlineStyles",
                  params: {
                    onlyMatchedOnce: false,
                    removeMatchedSelectors: true
                  }
                }
              ]
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

fs.writeFile(INDEX_DIST_FILE, '', err => {
  console.log(err);
});

buildIconsSet('src/svg/*.svg', LIB_DIR, INDEX_DIST_FILE);
