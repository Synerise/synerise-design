import styled from 'styled-components';

import DSDivider from '@synerise/ds-divider';

import { type DividerProps } from './Divider.types';

export const MenuDivider = styled(DSDivider)<DividerProps>`
  height: 1px;
  width: auto;
  display: block;
  margin: ${(props) => (props.higher ? '16px' : '8px')}
    ${(props) => (props?.level && props?.level > 1 ? '35px' : '12px')};
`;
