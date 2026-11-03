const PAINT_PROPERTIES = ['fill', 'fill-opacity', 'opacity'];

const withoutPaint = style =>
  style
    .split(';')
    .filter(declaration => declaration.trim() && !PAINT_PROPERTIES.includes(declaration.split(':')[0].trim()))
    .join(';');

/**
 * The `rect#canvas` Figma leaves as an icon's first child only fixes the bounding box. Some assets export it
 * with a visible paint (`fill:#fff;fill-opacity:0.1`), which shows as a lighter square on a filled background.
 * Runs after prefixIds, so it is matched by the prefixed id.
 */
const normaliseCanvasRect = canvasId => ({
  name: 'normaliseCanvasRect',
  fn: () => ({
    element: {
      enter: node => {
        if (node.name !== 'rect' || node.attributes.id !== canvasId) return;

        PAINT_PROPERTIES.forEach(property => delete node.attributes[property]);
        node.attributes.fill = 'none';

        if (node.attributes.style !== undefined) {
          const style = withoutPaint(node.attributes.style);
          if (style) {
            node.attributes.style = style;
          } else {
            delete node.attributes.style;
          }
        }
      },
    },
  }),
});

module.exports = normaliseCanvasRect;
