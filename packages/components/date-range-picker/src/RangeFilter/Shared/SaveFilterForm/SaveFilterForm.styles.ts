import styled from 'styled-components';
import Button from '@synerise/ds-button';
import { Props as DsButtonProps } from '@synerise/ds-button/dist/Button.types';

export const Container = styled.div`
  width: 336px;
  display: flex;
`;

export const FormButton = styled(Button)<DsButtonProps>`
  min-width: 32px;
  margin-left: 8px;
`;
