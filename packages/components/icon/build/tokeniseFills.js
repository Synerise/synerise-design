const PAINT_ATTRIBUTES = ['fill', 'stroke', 'stop-color'];
const HEX = /^#[0-9a-f]{3,8}$/i;
const NAMED_COLORS = { white: '#ffffff', black: '#000000' };

/**
 * Replaces hex paints with `var(--ds-…)` tokens so a multi-colour icon follows the theme. `white` and
 * `black`, which design sometimes exports by name, are looked up as their hex. The token goes
 * into `style`, not the presentation attribute, because `var()` is only reliable in CSS. Runs after
 * convertStyleToAttrs and inlineStyles, so every paint is an attribute by then and svgo does not move
 * the style back. A hex the table does not map fails the build rather than shipping an untokenised icon.
 *
 * `colors` maps lower-case hex → token name (`--ds-…`); `source` names the file in errors.
 */
const tokeniseFills = ({ colors, source }) => ({
  name: 'tokeniseFills',
  fn: () => ({
    element: {
      enter: node => {
        PAINT_ATTRIBUTES.forEach(attribute => {
          const value = node.attributes[attribute];
          if (value === undefined) return;
          const hex = NAMED_COLORS[value.toLowerCase()] ?? value;
          if (!HEX.test(hex)) return;

          const token = colors[hex.toLowerCase()];
          if (!token) {
            throw new Error(
              `${source}: ${attribute} ${value} has no token. Map it in build/objectIconColors.js.`,
            );
          }

          delete node.attributes[attribute];
          const style = node.attributes.style ? `${node.attributes.style.replace(/;?\s*$/, '')};` : '';
          node.attributes.style = `${style}${attribute}:var(${token})`;
        });
      },
    },
  }),
});

module.exports = tokeniseFills;
