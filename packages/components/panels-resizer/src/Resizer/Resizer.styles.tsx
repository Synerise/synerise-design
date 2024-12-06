import styled from 'styled-components';

import Icon from '@synerise/ds-icon';

export const Handler = styled.div<{ width: number }>`
  display: flex;
  align-items: center;
  width: ${props => props.width}px;
  flex-grow: 1;
  z-index: 5;
  background-color: ${props => props.theme.palette['grey-200']};

  &:hover {
    cursor: ew-resize;
    background-color: ${props => props.theme.palette['blue-100']};
  }
`;

export const HandlerIcon = styled(Icon)`
  svg {
    fill: ${props => props.theme.palette['grey-600']};
  }

  &:hover {
    color: ${props => props.theme.palette['blue-600']};
  }
`;
