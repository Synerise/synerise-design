import styled from 'styled-components';

import DSDivider from '@synerise/ds-divider';

import { type MenuDividerProps } from '../../Menu.types';

export const MenuDivider = styled(DSDivider)<MenuDividerProps>`
  height: 1px;
  width: auto;
  display: flex;
  margin: ${(props) => (props.higher ? '16px' : '8px')}
    ${(props) => (props?.level && props?.level > 1 ? '35px' : '12px')};
`;
