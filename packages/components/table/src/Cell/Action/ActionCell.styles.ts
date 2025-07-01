import styled from 'styled-components';

import { type ContentAlign } from './ActionCell.types';

const align = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};

export const ActionCell = styled.div<{
  gapSize: number;
  contentAlign: ContentAlign;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props): string => align[props.contentAlign]};
  & > * {
    margin-right: ${(props): string => `${props.gapSize}px`};
    &:last-child {
      margin-right: 0;
    }
  }
`;
