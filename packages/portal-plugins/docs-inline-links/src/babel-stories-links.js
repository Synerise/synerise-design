/**
  changes filename of a file with stories containing CamelCase directory name
  to a scoped package name following the format @scope/ds-kebab-case.
  Is it also the place where the fallback of inconsistent package names should take place.
  E.g. component `ds-fileuploader` does not have ~`Fileuploader`~ in stories, but `FileUploader`.
  Returns `null` if storyfile does not have a single mapped component.
 */
function getModulePath(filename) {
  const path = filename
    .replace(/.*components\//, '@synerise/ds')
    .replace(/([A-Z])/g, match => '-' + match[0].toLowerCase())
    .replace(/(ds-[^/]*)\/?.*/g, (_, m) => m);
  switch (path) {
    case '@synerise/ds-toolbar-buttons':
      // this component consists of both button and tooltip.
      return null;
    case '@synerise/ds-front-side':
      return null;
    case '@synerise/ds-notification':
    case '@synerise/ds-icon-alert':
      return '@synerise/ds-alert';
    case '@synerise/ds-fileuploader':
      return '@synerise/ds-file-uploader';
    case '@synerise/ds-editable-list':
      return '@synerise/ds-form';
    case '@synerise/ds-button-star':
      return '@synerise/ds-button';
    case '@synerise/ds-button-checkbox':
      return '@synerise/ds-button';
    case '@synerise/ds-accordion-menu':
      return '@synerise/ds-menu';
    case '@synerise/ds-toast':
    case '@synerise/ds-section-message':
    case '@synerise/ds-inline-note':
      // Toast has its own stories, but it is implemented in ds-alert.
      // The same is true for section-message
      // and inline-note.
      return '@synerise/ds-alert';
    case '@synerise/ds-broadcast-bar':
      return '@synerise/ds-alert';
    default:
      return path;
  }
}

function addLinksToStories(babel) {
  const getPkgJsonImport = dir => babel.template.statement.ast(`import pkg from '${dir}package.json';`);
  const paramsDef = babel.template.statement.ast(`
    ({parameters: process.env['STORYBOOK_REPO_URL_PREFIX'] === undefined ? {} : {
      info: {
        text: \`Source code of [the component](\${process.env['STORYBOOK_REPO_URL_PREFIX'] || ''}\${pkg.name}@\${pkg.version}/packages/components/\${pkg.name.replace('@synerise/ds-', '')}/src)
          and [stories](\${process.env['STORYBOOK_REPO_URL_PREFIX'] || ''}\${pkg.name}@\${pkg.version}/packages/portal/stories/components/\${pkg.name.replace('@synerise/ds', '').replace(/-./g, match => match[1].toUpperCase())}).\`,
      }
    }})`).expression.properties[0];
  return {
    visitor: {
      ExportDefaultDeclaration(path, state, opts) {
        const modulePath = getModulePath(state.filename);
        if (modulePath === null) {
          return;
        }
        if (!(state.filename.includes('stories/') && state.filename.includes('index.stories.tsx'))) {
          return;
        }
        const containsStoriesProperty = path.node.declaration.properties.find(p => p.key.name === 'stories') !== null;
        const pkgImportStatement = getPkgJsonImport(`${modulePath}/`);
        if (containsStoriesProperty) {
          path.node.declaration.properties.push(paramsDef);
          path.parent.body.unshift(pkgImportStatement);
        }
      },
    },
  };
}

module.exports = {
  addLinksToStories,
};
