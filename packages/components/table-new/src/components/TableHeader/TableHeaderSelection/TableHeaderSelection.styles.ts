import styled, { css } from 'styled-components';

import Button, { Checkbox, type StyledButton } from '@synerise/ds-button';

type ExtraProps = {
  isOrphan?: boolean;
};
export const DropdownButton: StyledButton<ExtraProps> = styled(
  Button,
)<ExtraProps>`
  ${(props) =>
    !props.isOrphan &&
    css`
      &&& {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    `}
`;

export const SelectionCheckbox = styled(Checkbox)<ExtraProps>`
  ${(props) =>
    !props.isOrphan &&
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
