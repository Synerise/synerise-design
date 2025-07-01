import styled from 'styled-components';

import { macro } from '@synerise/ds-typography';

export const WrapperPageHeaderClamp = styled.div`
  ${macro.h600};
  line-height: 26px;
  display: flex;
  overflow: hidden;
  align-items: center;
  color: ${(props): string => props.theme.palette['grey-800']};
`;

export const PageHeaderTitle = styled.span`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const PageHeaderTooltipWraper = styled.div`
  .ds-icon {
    margin-left: 8px;
    svg {
      color: ${(props): string => props.theme.palette['grey-600']};
      fill: ${(props): string => props.theme.palette['grey-600']};
    }
  }
`;
