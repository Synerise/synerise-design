const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');
const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const NpmImportPlugin = require('less-plugin-npm-import');

const lessOptions = {
  plugins: [new NpmImportPlugin({ prefix: '~' }), new LessPluginCleanCSS({ keepSpecialComments: 0 })],
  javascriptEnabled: true,
};

const ignore = ['./src/style/variables.less'];
glob(path.resolve(process.cwd()) + '/**/*(index|variables|core).less', { nodir: true, ignore }).then((files) => {
  files.forEach(file => {
    const lessInput = fs.readFileSync(file).toString();
    const { dir, name } = path.parse(file);
    const destinationFile = `${dir.replace('src', 'dist')}/${name}.css`;
    less.render(lessInput, Object.assign({ paths: [path.dirname(file)] }, lessOptions)).then(
      function(output) {
        fs.outputFileSync(destinationFile, output.css);
      },
      function(error) {
        console.error(error);
      }
    );
  });
});
