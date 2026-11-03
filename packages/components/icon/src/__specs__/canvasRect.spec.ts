import { readFileSync, readdirSync } from 'fs';
import { createRequire } from 'module';
import { join } from 'path';

const require = createRequire(import.meta.url);
const { transform } = require('@svgr/core');
const normaliseCanvasRect = require('../../build/normaliseCanvasRect.js');

const ICONS_DIR = join(__dirname, '../icons');
const CANVAS_RECT = /<rect[^>]*id="svg-\d+canvas"[^>]*>/g;
const PAINTS = /opacity|style=|fill="(?!none)/;

const toJsx = (svg: string): Promise<string> =>
  transform(
    svg,
    {
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
      svgoConfig: {
        plugins: [
          { name: 'prefixIds', params: { delim: '', prefix: 'svg-1' } },
          normaliseCanvasRect('svg-1canvas'),
        ],
      },
    },
    { componentName: 'Icon' },
  );

const rectsOf = (jsx: string) => jsx.match(CANVAS_RECT) ?? [];

describe('rect#canvas', () => {
  describe.each([
    ['an inline white tint', 'style="fill:#fff;fill-opacity:0.1"'],
    ['an inline opacity', 'style="fill:none;opacity:0.1"'],
    ['attributes', 'fill="#fff" fill-opacity="0.1" opacity="0.5"'],
  ])('painted by %s', (_, paint) => {
    it('is made fill:none with no opacity left behind', async () => {
      const jsx = await toJsx(
        `<svg><rect id="canvas" width="24" height="24" ${paint}/></svg>`,
      );

      expect(rectsOf(jsx)).toHaveLength(1);
      expect(rectsOf(jsx)[0]).toContain('fill="none"');
      expect(rectsOf(jsx)[0]).not.toMatch(PAINTS);
    });
  });

  it('keeps the geometry and leaves other shapes alone', async () => {
    const jsx = await toJsx(
      `<svg>
        <rect id="canvas" x="1" width="24" height="24" style="fill:#fff"/>
        <rect id="body" width="4" height="4" style="fill:#fff;opacity:0.5"/>
      </svg>`,
    );

    expect(rectsOf(jsx)[0]).toContain('x={1}');
    expect(jsx).toMatch(/id="svg-1body"[^>]*opacity/);
  });

  it('is invisible in every generated icon', () => {
    const files = readdirSync(ICONS_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .flatMap((dir) =>
        readdirSync(join(ICONS_DIR, dir.name))
          .filter((file) => file.endsWith('.tsx'))
          .map((file) => join(ICONS_DIR, dir.name, file)),
      );
    const painting = files.filter((file) =>
      rectsOf(readFileSync(file, 'utf8')).some((rect) => PAINTS.test(rect)),
    );

    expect(files.length).toBeGreaterThan(1000);
    expect(painting).toEqual([]);
  });
});
