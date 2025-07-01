import styled from 'styled-components';

import Button, { type ButtonProps } from '@synerise/ds-button';

export const Container = styled.div`
  width: 336px;
  display: flex;
`;

export const FormButton = styled(Button)<ButtonProps>`
  min-width: 32px;
  margin-left: 8px;
`;
