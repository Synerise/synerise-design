import styled from 'styled-components';
import { Description } from '@synerise/ds-typography';

export const ItemPickerWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;

  & > label {
    margin-bottom: 8px;
  }
  ${Description} {
    margin-top: 8px;
  }
`;

export const Error = styled(Description)`
  color: ${(props): string => props.theme.palette['red-600']};
`;
