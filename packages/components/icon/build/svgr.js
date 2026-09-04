const { transform } = require('@svgr/core');
const hash = require('string-hash');
const { glob } = require('glob');
const fs = require('fs');
const path = require('path');
const tpl = require('./template.js');

const ICONS_DIR = 'src/icons';
const ICON_SETS_FILE = `${ICONS_DIR}/iconSets.ts`;

/**
 * One entry per icon set. `dir` is both the folder under src/icons and the key used by the
 * name -> set index that iconLoader.ts dynamically imports, so it must match the folder exactly.
 */
const ICON_SETS = [
  { dir: 'M', svg: 'src/svg/M/*.svg', iconSet: 'medium' },
  { dir: 'additional', svg: 'src/svg/additional/*.svg', iconSet: 'additional' },
  { dir: 'L', svg: 'src/svg/L/*.svg', iconSet: 'large' },
  { dir: 'XL', svg: 'src/svg/XL/*.svg', iconSet: 'xlarge' },
  { dir: 'colorIcons', svg: 'src/svg/colorIcons/*.svg', iconSet: 'color' },
];

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

const svgoConfigFor = (file, componentClassName, iconSet) => ({
  plugins: [
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [`data-testid="ds-icon-${componentClassName}"`],
      },
    },
    {
      name: 'prefixIds',
      params: {
        delim: '',
        prefix: () => `svg-${hash(file)}`,
      },
    },
    {
      name: 'cleanupIds',
      params: {
        remove: true,
        minify: true,
        preservePrefixes: [`svg-${hash(file)}`],
      },
    },
    {
      name: 'addClassesToSVGElement',
      params: {
        className: `${componentClassName} ds-icon-set-${iconSet}`,
      },
    },
    'removeDimensions',
    'removeTitle',
    'convertStyleToAttrs',
    {
      name: 'removeAttrs',
      params: {
        attrs: 'enable-background',
        elemSeparator: ':',
        preserveCurrentColor: false,
      },
    },
    {
      name: 'inlineStyles',
      params: {
        onlyMatchedOnce: false,
        removeMatchedSelectors: true,
      },
    },
  ],
});

/**
 * Generates one icon set and returns its sorted component names.
 *
 * Both the glob result and the emitted names are sorted, and the barrel is written in a single
 * pass rather than appended to from inside each file's write callback. Without that the barrel
 * order followed whichever fs callback happened to land first, which churned the generated
 * output — and iconSets.ts below would churn with it.
 */
const buildIconsSet = async ({ dir, svg, iconSet }) => {
  const libDir = `${ICONS_DIR}/${dir}`;
  const files = (await glob(svg, {})).sort();

  const names = await Promise.all(
    files.map(async file => {
      const componentName = pascalCaseFilename(file);
      const componentClassName = kebabCaseFilename(file);
      const content = await fs.promises.readFile(file, 'utf8');
      const jsCode = await transform(
        content,
        {
          template: tpl,
          typescript: true,
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
          svgoConfig: svgoConfigFor(file, componentClassName, iconSet),
        },
        { componentName },
      );
      await fs.promises.writeFile(`${libDir}/${componentName}.tsx`, jsCode);
      return componentName;
    }),
  );

  names.sort();
  await fs.promises.writeFile(
    `${libDir}/index.ts`,
    names.map(name => `export { default as ${name} } from './${name}';\n`).join(''),
  );

  console.log(`Generated ${names.length} icon components for icon set ${iconSet}`);
  return names;
};

/**
 * Emits the name -> set index. iconLoader.ts imports this dynamically to decide which of the five
 * set barrels to fetch for a given `iconName`, so it must never import an icon itself.
 */
const renderIconSets = results => {
  const entries = results
    .flatMap(({ dir, names }) => names.map(name => ({ name, dir })))
    // Same code-unit ordering as the `names.sort()` used for each set's barrel.
    .sort((a, b) => {
      if (a.name === b.name) return 0;
      return a.name < b.name ? -1 : 1;
    });

  // `iconSets` is a flat name -> set map, so a name in two sets would silently resolve to whichever
  // key is written last, loading the icon at the wrong size with no diagnostic. The XL folder has
  // held duplicates before (see the note in src/icons/index.ts), so fail the build instead.
  const seen = new Map();
  const duplicates = [];
  entries.forEach(({ name, dir }) => {
    if (seen.has(name)) {
      duplicates.push(`${name} (${seen.get(name)} and ${dir})`);
    } else {
      seen.set(name, dir);
    }
  });
  if (duplicates.length) {
    throw new Error(
      `Duplicate icon names across sets:\n  ${duplicates.join('\n  ')}\n` +
        'Rename or remove one of each pair — iconSets cannot represent both.',
    );
  }

  // The union is derived from ICON_SETS rather than hardcoded, so adding a set here immediately
  // breaks `SET_LOADERS: Record<IconSet, ...>` in iconLoader.ts until a loader is added for it.
  // Without that, a missing loader only surfaces at runtime as an icon that never appears.
  const union = ICON_SETS.map(({ dir }) => `'${dir}'`).join(' | ');

  return [
    '// AUTO-GENERATED by build/svgr.js — do not edit.\n',
    `export type IconSet = ${union};\n`,
    '\n',
    'export const iconSets: Record<string, IconSet> = {\n',
    ...entries.map(({ name, dir }) => `  ${name}: '${dir}',\n`),
    '};\n',
  ].join('');
};

const ensureDirs = () => {
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR);
  }
  ICON_SETS.forEach(({ dir }) => {
    const libDir = `${ICONS_DIR}/${dir}`;
    if (!fs.existsSync(libDir)) {
      fs.mkdirSync(libDir);
    }
  });
};

async function main() {
  ensureDirs();

  const results = [];
  for (const set of ICON_SETS) {
    results.push({ dir: set.dir, names: await buildIconsSet(set) });
  }

  await fs.promises.writeFile(ICON_SETS_FILE, renderIconSets(results));
  const total = results.reduce((sum, { names }) => sum + names.length, 0);
  console.log(`Generated ${ICON_SETS_FILE} with ${total} icon names`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
