import styled from 'styled-components';

import { InputWrapper } from '@synerise/ds-input/dist/Input.styles';

export const AddItemLayout = styled.div`
  display: inline;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  padding: 4px 12px;
  margin-bottom: 8px;
  ${InputWrapper} {
    margin-top: 8px;
  }
`;

export const AddItemLabel = styled.span`
  margin-left: 12px;
`;
