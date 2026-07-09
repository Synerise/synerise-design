import styled, {
  type FlattenSimpleInterpolation,
  css,
} from 'styled-components';

// A flex child wrapping an <input> defaults to `min-width: auto`, which refuses
// to shrink below the input's intrinsic width and overflows the group. Reset it
// so items share the row (and auto-sizing children can grow/shrink) as intended.
export const InputGroupItem = styled.div`
  min-width: 0;
`;

/**
 * Controls whose border-radius is squared on the joined side. Matched
 * depth-agnostically (descendant) so the styling works even when the control is
 * wrapped (e.g. in a FormField) rather than being a direct child of the item.
 *
 * NOTE: emitted as an explicit comma-separated selector list rather than a
 * single `:where(a, b, …)`. stylis (styled-components' CSS processor) splits on
 * the commas inside `:where()` and drops the whole rule, so no control ever got
 * the squared corners.
 */
const CONTROLS = [
  'input',
  'textarea',
  'button',
  '.ds-input-number',
  '.ant-select-selector',
  '.ds-button',
];

// Build `<itemSelector> <control>, …` for every control under the given item.
const controlsUnder = (itemSelector: string): string =>
  CONTROLS.map((control) => `${itemSelector} ${control}`).join(', ');

const notLastControls = controlsUnder(
  `${InputGroupItem}:not(:only-child):not(:last-child)`,
);
const lastControls = controlsUnder(
  `${InputGroupItem}:not(:only-child):last-child`,
);

export const InputGroupWrapper = styled.div<{
  compact?: boolean;
  $growItem?: 'first' | 'last';
}>`
  &&& {
    display: flex;
    min-width: 0;
    ${(props): string => (props.compact ? '' : 'align-items: stretch;')}

    ${InputGroupItem} .ds-select-container {
      margin-bottom: 0;
    }

    ${(props): FlattenSimpleInterpolation => {
      // Which item stretches to fill the row. Default 'last' (trailing control
      // grows). 'first' flips it — the leading control grows while a fixed-width
      // trailing control (e.g. ColorPicker) stays compact. Border-radius and the
      // -1px border overlap stay position-based (first squares its right corners,
      // last squares its left), so only the flex-grow target changes.
      const growChild =
        props.$growItem === 'first' ? 'first-child' : 'last-child';
      return props.compact
        ? css`
            ${InputGroupItem}:only-child {
              flex-grow: 1;
            }
            ${InputGroupItem}:not(:only-child):not(:last-child) {
              margin-right: -1px;
            }
            ${InputGroupItem}:not(:only-child):${growChild} {
              flex: auto;
            }
            /* antd parity: .ant-input-number defaulted to width:90px, so a
               numeric field placed as a NON-grow item kept its natural width and
               left room for the growing sibling (e.g. the period Select in
               CompletedWithin / factors). The de-antd rewrite made the root
               width:100%, so its flex slot inflates to the <input>'s intrinsic
               size and starves the sibling. Restore the 90px natural width for a
               non-grow numeric field; the grow item still fills via flex, and a
               standalone / grow-item input-number keeps width:100%. */
            ${InputGroupItem}:not(:only-child):not(:${growChild}) .ds-input-number {
              width: 90px;
            }
            ${notLastControls} {
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
            }
            ${lastControls} {
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
            }
          `
        : css`
            ${InputGroupItem}:${growChild} {
              flex-grow: 1;
            }
            ${InputGroupItem}:not(:last-child) {
              margin-right: 12px;
            }
          `;
    }}
  }
`;
