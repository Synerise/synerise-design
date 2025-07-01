import styled from 'styled-components';

import { InputGroupWrapper } from '@synerise/ds-input/dist/InputGroup.styles';

export const Settings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  background-color: ${(props): string => props.theme.palette.white};
  max-width: 238px;

  .ant-select-selection-item,
  .ant-select-selection-placeholder {
    font-weight: 500;
  }

  ${InputGroupWrapper} {
    width: 100%;
  }
`;
