import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Register Token Studio transforms
register(StyleDictionary);

// Custom name transform: "section-message.variant.success.bg" → "ds-section-message-variant-success-bg"
StyleDictionary.registerTransform({
  name: 'name/ds-kebab',
  type: 'name',
  transform: (token) =>
    `ds-${token.path.map((s) => s.replace(/\s+/g, '-').toLowerCase()).join('-')}`,
});

// 'boxShadow' is the Token Studio type; 'shadow' is what sd-transforms normalizes it to
const INCLUDED_TYPES = new Set(['color', 'boxShadow', 'shadow', 'opacity']);

StyleDictionary.registerFilter({
  name: 'includedTypes',
  filter: (token) => INCLUDED_TYPES.has(token.$type) || INCLUDED_TYPES.has(token.type),
});

// Shared base token sets that all themes need for reference resolution
const baseSources = [
  'tokens/primitives/core.json',
  'tokens/semantic/custom-color/blue.json',
  'tokens/semantic/dimensions.json',
  'tokens/semantic/spacing.json',
];

const themes = {
  light: {
    source: baseSources,
    include: baseSources,
    tokens: ['tokens/semantic/Light.json', 'tokens/modules/colors-only.json'],
    selector: ':root',
  },
  dark: {
    source: baseSources,
    include: baseSources,
    tokens: ['tokens/semantic/Dark.json', 'tokens/modules/colors-only.json'],
    selector: '[data-ds-theme="dark"]',
  },
};

for (const [themeName, cfg] of Object.entries(themes)) {
  console.log(`\nBuilding theme: ${themeName}`);

  const sd = new StyleDictionary({
    include: cfg.include.map((p) => resolve(ROOT, p)),
    source: cfg.tokens.map((p) => resolve(ROOT, p)),
    preprocessors: ['tokens-studio'],
    platforms: {
      css: {
        transformGroup: 'tokens-studio',
        transforms: ['name/ds-kebab'],
        buildPath: 'dist/css/',
        files: [
          {
            destination: `${themeName}.css`,
            format: 'css/variables',
            filter: 'includedTypes',
            options: {
              selector: cfg.selector,
              outputReferences: true,
            },
          },
        ],
      },
    },
    log: {
      verbosity: 'default',
      warnings: 'disabled',
    },
  });

  await sd.buildAllPlatforms();
}

// Generate JS modules that export the CSS as a string constant.
// ds-core imports these and injects via createGlobalStyle.
mkdirSync(resolve(ROOT, 'dist/js'), { recursive: true });

for (const themeName of Object.keys(themes)) {
  const css = readFileSync(resolve(ROOT, `dist/css/${themeName}.css`), 'utf-8');
  const varsMatch = css.match(/\{([\s\S]*)\}/);
  const varsOnly = varsMatch ? varsMatch[1].trim() : '';

  writeFileSync(
    resolve(ROOT, `dist/js/${themeName}.js`),
    `export const cssText = ${JSON.stringify(varsOnly)};\n`,
  );
  writeFileSync(
    resolve(ROOT, `dist/js/${themeName}.d.ts`),
    `export declare const cssText: string;\n`,
  );
}

writeFileSync(
  resolve(ROOT, 'dist/js/index.js'),
  `export { cssText } from './light.js';\n`,
);
writeFileSync(
  resolve(ROOT, 'dist/js/index.d.ts'),
  `export { cssText } from './light.js';\n`,
);

console.log('✓ Token build complete.');
