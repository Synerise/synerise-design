import styled, { css } from 'styled-components';

// Ported from ds-condition's `RemoveIconWrapper`: hidden by default, revealed when the
// enclosing `ConditionRow` is hovered (see ConditionRow.styles.ts). The component applies
// the CONDITION_REMOVE_CLASS hook the row targets — no cross-file styled-component reference.
export const RemoveButton = styled.button.attrs({ type: 'button' })<{
  $reveal: boolean;
}>`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 32px;
  /* No own margin: the container owns the spacing. A ConditionRow separates its children with its
     gap, and ConditionSlot offsets a nested remove button by 8px itself — a margin here would
     stack on top of either. */
  padding: 0;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.palette['red-600']};
  cursor: pointer;
  transition: all 0.3s ease;

  /* Hidden *visually only* — never with visibility/display, which would drop the button out of
     the focus order and leave keyboard and screen-reader users unable to remove a row at all
     (WCAG 2.1 AA 2.1.1). It stays in the a11y tree and the tab order; the enclosing ConditionRow
     reveals it on :hover and :focus-within, and it reveals itself on :focus-visible so keyboard
     focus never lands on something invisible. */
  ${({ $reveal }) =>
    $reveal &&
    css`
      opacity: 0;
      pointer-events: none;

      &:focus-visible {
        opacity: 1;
        pointer-events: auto;
      }
    `}

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.palette['grey-400']};
  }
`;
