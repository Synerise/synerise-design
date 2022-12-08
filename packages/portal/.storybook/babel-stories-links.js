module.exports = function addLinksToStories(babel) {
  const getPkgJsonImport = dir => babel.template.statement.ast(`import pkg from '${dir}package.json';`);
  const paramsDef = babel.template.statement.ast(`
    ({parameters: process.env['REACT_APP_REPO_URL_PREFIX'] === undefined ? {} : {
      info: {
        text: \`Source code of [the component](\${process.env['REACT_APP_REPO_URL_PREFIX'] || ''}\${pkg.name}@\${pkg.version}/packages/components/\${pkg.name.replace('@synerise/ds-', '')}/src)
          and [stories](\${process.env['REACT_APP_REPO_URL_PREFIX'] || ''}\${pkg.name}@\${pkg.version}/packages/portal/stories/components/\${pkg.name.replace('@synerise/ds', '').replace(/-./g, match => match[1].toUpperCase())}).\`,
      }
    }})`).expression.properties[0];
  return {
    visitor: {
      ExportDefaultDeclaration(path, state, opts) {
        if (!(state.filename.includes("stories/") && state.filename.includes("index.stories.tsx"))) {
          return;
        }
        const containsStoriesProperty = path.node.declaration.properties.find(p => p.key.name === 'stories') !== null
        const modulePath = state.filename.replace(/.*components\//, '@synerise/ds').replace(/([A-Z])/g, match => '-'+match[0].toLowerCase()).replace(/(ds-[^/]*)\/?.*/g, (_, m) => m);
        const pkgImportStatement = getPkgJsonImport(`${modulePath}/`);
        if (containsStoriesProperty) {
          path.node.declaration.properties.push(paramsDef);
          path.parent.body.unshift(pkgImportStatement);
        }
      },
    }
  }
};
