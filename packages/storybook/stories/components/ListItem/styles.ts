import styled from 'styled-components';
import ListItem from '@synerise/ds-list-item';

export const HoverableIconWrapper = styled.div`
  &&&:hover {
    .ds-icon > svg {
      fill: ${props => props.theme.palette['blue-600']} !important;
    }
  }
`;
export const StyledListItem = styled(ListItem)`
  &&&:hover {
    .icon-suffix {
      svg {
        fill: ${props => props.theme.palette['blue-600']} !important;
      }
    }
  }
`;

export const ListWrapper = styled.div`
  counter-reset: ds-list-items 0;
`;

export const StyledTooltip = styled.div`
  border: 1px solid black;
  padding: 20px;
`;
