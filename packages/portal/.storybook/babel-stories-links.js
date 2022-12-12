// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#writing-your-first-babel-plugin
// export default function({ types: t }) {

/**
  changes filename of a file with stories containing CamelCase directory name
  to a scoped package name following the format @scope/ds-kebab-case.
  Is it also the place where the fallback of inconsistent package names should take place.
  E.g. component `ds-treemenu` does not have ~`Treemenu`~ in stories, but `TreeMenu`.
  Returns `null` if storyfile does not have a single mapped component.
 */
function getModulePath(filename) {
  const path = filename.replace(/.*components\//, '@synerise/ds').replace(/([A-Z])/g, match => '-'+match[0].toLowerCase()).replace(/(ds-[^/]*)\/?.*/g, (_, m) => m)
  if (path === '@synerise/ds-toolbar-buttons') {
    // this component consists of both button and tooltip.
    return null;
  }
  if (path === '@synerise/ds-front-side') return null;
  if (path === '@synerise/ds-notification') return '@synerise/ds-alert';
  if (path === '@synerise/ds-icon-alert') return '@synerise/ds-alert';
  if (path === '@synerise/ds-tags-list') {
    return '@synerise/ds-tagslist';
  }
  if (path === '@synerise/ds-fileuploader') return '@synerise/ds-file-uploader';
  if (path === '@synerise/ds-editable-list') return '@synerise/ds-form';
  if (path === '@synerise/ds-button-star') return '@synerise/ds-button';
  if (path === '@synerise/ds-button-checkbox') return '@synerise/ds-button';
  if (path === '@synerise/ds-accordion-menu') return '@synerise/ds-menu';
  if (path === '@synerise/ds-toast' || path === '@synerise/ds-section-message' || path === '@synerise/ds-inline-note') {
    // toast has its own stories, but it is implemented in ds-alert.
    // The same is true for section-message and inline-note.
    return '@synerise/ds-alert';
  }
  if (path === '@synerise/ds-broadcast-bar') return '@synerise/ds-alert';
  if (path === '@synerise/ds-tree-menu') {
    return '@synerise/ds-treemenu';
  }
  return path;
}

module.exports = function addLinksToStories(babel) {
  if (!process.env['REACT_APP_REPO_URL_PREFIX'] && !process.env['DS_SRC_DOCS_LINKS']) {
    return {};
  }
  const getPkgJsonImport = dir => babel.template.statement.ast(`import pkg from '${dir}package.json';`);
  const paramsDef = babel.template.statement.ast(`
    ({parameters: process.env['REACT_APP_REPO_URL_PREFIX'] === undefined ? {} : {
      info: {
        text: \`Source code of [the component](\${process.env['REACT_APP_REPO_URL_PREFIX'] || ''}\${pkg.name}@\${pkg.version}/packages/components/\${pkg.name.replace('@synerise/ds-', '')}/src)
          and [stories](\${process.env['REACT_APP_REPO_URL_PREFIX'] || ''}\${pkg.name}@\${pkg.version}/packages/portal/stories/components/\${pkg.name.replace('@synerise/ds', '').replace(/-./g, match => match[1].toUpperCase())}).\`,
      }
    }})`).expression.properties[0];
  console.log('args')
  return {
    visitor: {
      ExportDefaultDeclaration(path, state, opts) {
        const modulePath = getModulePath(state.filename);
        if (modulePath === null) {
          return;
        }
        if (!(state.filename.includes("stories/") && state.filename.includes("index.stories.tsx"))) {
          return;
        }
        const containsStoriesProperty = path.node.declaration.properties.find(p => p.key.name === 'stories') !== null
        const pkgImportStatement = getPkgJsonImport(`${modulePath}/`);
        if (containsStoriesProperty) {
          path.node.declaration.properties.push(paramsDef);
          path.parent.body.unshift(pkgImportStatement);
        }
      },
    }
  }
};
