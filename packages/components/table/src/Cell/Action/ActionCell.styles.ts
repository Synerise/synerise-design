import styled from 'styled-components';
import { ContentAlign } from './ActionCell.types';

const align = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};

// eslint-disable-next-line import/prefer-default-export
export const ActionCell = styled.div<{ gapSize: number; contentAlign: ContentAlign }>`
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
