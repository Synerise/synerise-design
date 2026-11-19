import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { transform } = require('@svgr/core');
const tokeniseFills = require('../../build/tokeniseFills.js');
const {
  objectIconFills,
  resolveObjectIconToken,
} = require('../../build/objectIconColors.js');

const COLORS = { '#ff5831': '--ds-accent', '#ffcbc1': '--ds-base' };

const toJsx = (svg: string, colors = COLORS): Promise<string> =>
  transform(
    svg,
    {
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
      svgoConfig: {
        plugins: [tokeniseFills({ colors, source: 'test.svg' })],
      },
    },
    { componentName: 'Icon' },
  );

describe('tokeniseFills', () => {
  it('turns each hex fill into a token fill, whatever its case', async () => {
    const jsx = await toJsx(
      '<svg><path d="M0 0" fill="#FF5831"/><circle r="1" fill="#ffcbc1"/></svg>',
    );

    expect(jsx).toContain('fill: "var(--ds-accent)"');
    expect(jsx).toContain('fill: "var(--ds-base)"');
    expect(jsx).not.toMatch(/#[0-9a-f]{3,8}\b/i);
  });

  it('keeps an existing inline style next to the token fill', async () => {
    const jsx = await toJsx(
      '<svg><path d="M0 0" fill="#FF5831" style="opacity:0.5"/></svg>',
    );

    expect(jsx).toMatch(/opacity: 0\.5/);
    expect(jsx).toContain('fill: "var(--ds-accent)"');
  });

  it('leaves fill="none" alone', async () => {
    const jsx = await toJsx('<svg fill="none"><path d="M0 0" fill="#FF5831"/></svg>');

    expect(jsx).toContain('fill="none"');
  });

  it('tokenises white and black named by keyword, like their hex', async () => {
    const jsx = await toJsx(
      '<svg><path d="M0 0" fill="white"/><circle r="1" fill="BLACK"/></svg>',
      { '#ffffff': '--ds-light', '#000000': '--ds-dark' },
    );

    expect(jsx).toContain('fill: "var(--ds-light)"');
    expect(jsx).toContain('fill: "var(--ds-dark)"');
  });

  it('throws on a named white the table does not map', async () => {
    await expect(
      toJsx('<svg><path d="M0 0" fill="white"/></svg>'),
    ).rejects.toThrow(/test\.svg.*white/);
  });

  it('throws on a colour the table does not map, naming the file and colour', async () => {
    await expect(
      toJsx('<svg><path d="M0 0" fill="#123456"/></svg>'),
    ).rejects.toThrow(/test\.svg.*#123456/);
  });

  it('throws on an unmapped hex stroke too', async () => {
    await expect(
      toJsx('<svg><path d="M0 0" stroke="#123456"/></svg>'),
    ).rejects.toThrow(/#123456/);
  });
});

describe('resolveObjectIconToken', () => {
  it('maps a custom-colour shorthand to its flipping custom-colour token', () => {
    expect(resolveObjectIconToken('mars-600')).toBe('--ds-color-custom-mars-600');
  });

  it('passes a full token name through, so module tokens can replace a shorthand', () => {
    expect(resolveObjectIconToken('--ds-object-icon-analytics-accent')).toBe(
      '--ds-object-icon-analytics-accent',
    );
  });

  it.each(['#ff5831', 'mars', 'var(--ds-x)'])('rejects %s', (value) => {
    expect(() => resolveObjectIconToken(value)).toThrow();
  });
});

describe('objectIconFills', () => {
  it('resolves a category table to token names keyed by lower-case hex', () => {
    const fills = objectIconFills('analytics');

    expect(fills['#ff5831']).toBe('--ds-color-custom-mars-600');
    Object.keys(fills).forEach((hex) => expect(hex).toBe(hex.toLowerCase()));
  });

  it('throws for a category without a table', () => {
    expect(() => objectIconFills('unknown')).toThrow(/unknown/);
  });
});
