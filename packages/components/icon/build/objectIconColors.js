/**
 * Object icon colours, per category (the folder under src/svg/objectIcons).
 *
 * The SVGs keep the hex colours design exports; at build time each one becomes the token named here.
 * A value is either a custom-colour shorthand (`'mars-600'` → `--ds-color-custom-mars-600`, which flips
 * in dark mode) or a full token name (`'--ds-object-icon-analytics-accent'`). Moving to module tokens is
 * a matter of replacing the shorthands with those names once ds-tokens ships them.
 *
 * Keyed per category because one hex can play a different role in each (#b5bdc3 and #949ea6 appear in
 * both data and settings), so a future module token can differ per category.
 */
const OBJECT_ICON_COLORS = {
  analytics: {
    '#ff5831': 'mars-600',
    '#ffa999': 'mars-300',
    '#ffcbc1': 'mars-200',
  },
  campaigns: {
    '#399903': 'green-700',
    '#54cb0b': 'green-600',
    '#76dc25': 'green-500',
    '#9aed45': 'green-400',
  },
  // Automation moved off the AI purples to the red family in design's batch 4.
  automation: {
    '#ff5a4d': 'red-500',
    '#ffab9e': 'red-300',
  },
  ai: {
    '#8e54e0': 'purple-400',
    '#d1adf7': 'purple-200',
    '#eedbff': 'purple-100',
  },
  content: {
    '#f97600': 'orange-600',
    '#fd9f05': 'orange-500',
    '#ffd373': 'orange-300',
  },
  data: {
    // #87929d is off the palette; nearest shade until design moves it onto one.
    '#87929d': 'grey-500',
    '#6a7580': 'grey-600',
    '#949ea6': 'grey-500',
    '#b5bdc3': 'grey-400',
    '#dbe0e3': 'grey-300',
    '#f3f5f6': 'grey-100',
    '#f9fafb': 'grey-50',
  },
  profiles: {
    '#089b9c': 'cyan-600',
    '#13c2bc': 'cyan-500',
    '#36cfc4': 'cyan-400',
  },
  settings: {
    // The app icon is the one blue in an otherwise grey category.
    '#0b68ff': 'blue-600',
    '#4da7fe': 'blue-400',
    '#8bcaff': 'blue-300',
    '#6a7580': 'grey-600',
    '#949ea6': 'grey-500',
    '#b5bdc3': 'grey-400',
  },
};

const CUSTOM_COLOR_SHORTHAND = /^([a-z]+)-(\d{2,3})$/;
const TOKEN_NAME = /^--ds-[a-z0-9-]+$/;

const resolveObjectIconToken = value => {
  if (TOKEN_NAME.test(value)) return value;
  const shorthand = value.match(CUSTOM_COLOR_SHORTHAND);
  if (shorthand) return `--ds-color-custom-${shorthand[1]}-${shorthand[2]}`;
  throw new Error(
    `Object icon colour "${value}" is neither a custom-colour shorthand ("mars-600") nor a token name ("--ds-…").`,
  );
};

/** The hex → token-name table for one category, keyed by lower-case hex. */
const objectIconFills = category => {
  const colors = OBJECT_ICON_COLORS[category];
  if (!colors) {
    throw new Error(
      `No object icon colours for category "${category}". Add it to build/objectIconColors.js.`,
    );
  }
  return Object.fromEntries(
    Object.entries(colors).map(([hex, value]) => [hex.toLowerCase(), resolveObjectIconToken(value)]),
  );
};

module.exports = { OBJECT_ICON_COLORS, objectIconFills, resolveObjectIconToken };
