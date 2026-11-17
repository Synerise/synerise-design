import { readdirSync, readFileSync } from 'fs';
import { basename, join } from 'path';

import { tokens as darkTokens } from '@synerise/ds-tokens/dark';
import { tokens as lightTokens } from '@synerise/ds-tokens/light';

const SVG_DIR = join(__dirname, '../svg/objectIcons');
const ICONS_DIR = join(__dirname, '../icons/objectIcons');

const pascalCase = (name: string) =>
  (name.match(/[a-zA-Z0-9]+/g) ?? [])
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('');

const sources = readdirSync(SVG_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .flatMap((dir) =>
    readdirSync(join(SVG_DIR, dir.name))
      .filter((file) => file.endsWith('.svg'))
      .map((file) => ({
        category: dir.name,
        component: pascalCase(basename(file, '.svg')),
      })),
  );

const generated = (component: string) =>
  readFileSync(join(ICONS_DIR, `${component}.tsx`), 'utf8');

const tokensIn = (jsx: string) =>
  [...jsx.matchAll(/var\((--ds-[a-z0-9-]+)\)/g)].map((match) => match[1]);

describe('object icons', () => {
  it('generates one component per source SVG', () => {
    const components = readdirSync(ICONS_DIR)
      .filter((file) => file.endsWith('.tsx'))
      .map((file) => basename(file, '.tsx'))
      .sort();

    expect(sources.length).toBeGreaterThan(0);
    expect(components).toEqual(sources.map(({ component }) => component).sort());
  });

  it.each(sources)('$component carries its category hook and no raw colour', ({ component, category }) => {
    const jsx = generated(component);

    expect(jsx).toContain(`ds-object-icon-${category}`);
    expect(jsx).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(tokensIn(jsx).length).toBeGreaterThan(0);
  });

  it('uses only tokens defined in both the light and the dark theme', () => {
    const used = [...new Set(sources.flatMap(({ component }) => tokensIn(generated(component))))];
    const missing = used.filter((token) => !(token in lightTokens) || !(token in darkTokens));

    expect(used.length).toBeGreaterThan(0);
    expect(missing).toEqual([]);
  });
});
