import styled from 'styled-components';

import Button, { type StyledButton } from '@synerise/ds-button';

export const Container = styled.div`
  width: 336px;
  display: flex;
`;

export const FormButton: StyledButton = styled(Button)`
  min-width: 32px;
  margin-left: 8px;
`;
