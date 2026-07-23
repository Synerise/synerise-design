import styled from 'styled-components';

import Button, { type StyledButton } from '@synerise/ds-button';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 24px;
  /* ⚑ Shift: footer bg grey-050 → --ds-dropdown-footer-bg (grey-100) — aligns to the standard DS dropdown footer. */
  background: var(--ds-dropdown-footer-bg);
`;

export const Actions = styled.div`
  flex: 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
  > *:not(:last-child) {
    margin-right: 8px;
  }
`;
export const Range: StyledButton = styled(Button)`
  && {
    margin: 4px 0;
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
`;
export const ActionsPlaceholder = styled.div`
  display: flex;
  flex: 1;
`;
export const ChosenRange = styled.div`
  font-weight: 500;
  line-height: 24px;
  color: var(--ds-dropdown-text-default);

  .ds-icon svg {
    margin-top: -2px;
    fill: var(--ds-color-icon-base-disabled);
  }
`;
/**
 * This is mainly for unit-tests capabilitiess and WCAG compliancy, it is visible
 * can be used for em-dashes (APA style) which will be recognized by screen-readers
 * or in tests in `textContent` JS DOM property.
 *
 * Example usage:
 *
 *     <S.InvisibleTextContent>{' – '}</S.InvisibleTextContent>
 *     <Icon component={<ArrowRightS/>}/>
 */
export const InvisibleTextContent = styled.span`
  display: none;
`;
