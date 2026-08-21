import styled, { css } from 'styled-components';

import Button, { Checkbox, type StyledButton } from '@synerise/ds-button';

// $-prefixed so styled-components keeps it out of the DOM — Checkbox spreads its rest props onto
// the underlying button, and React warns about unknown attributes.
type ExtraProps = {
  $isOrphan?: boolean;
};

// Only ever rendered next to the checkbox, so its left side is always the joining edge.
export const DropdownButton: StyledButton = styled(Button)`
  &&& {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export const SelectionCheckbox = styled(Checkbox)<ExtraProps>`
  ${(props) =>
    !props.$isOrphan &&
    css`
      &&& {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    `}
`;

export const Selection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 64px;
  margin-right: 24px;
  border-radius: 3px;

  &:hover {
    background-color: ${({ theme }) => theme.palette['grey-100']};
  }
`;
