import styled from 'styled-components';
import ListItem from '@synerise/ds-list-item';
import Icon, { IconProps } from '@synerise/ds-icon';

export const ActionsWrapper = styled.div`
  && {
    display: flex;
    .ds-icon {
      svg {
        margin: 0;
        fill: ${props => props.theme.palette['grey-500']};
      }
    }
    .ds-icon:hover svg {
      fill: ${props => props.theme.palette['blue-600']};
    }
    .delete .ds-icon svg {
      fill: ${props => props.theme.palette['red-600']};
    }
  }
`;
export const DropdownMenu = styled.div`
  && {
    padding: 8px;
    width: 230px;
    background: ${({ theme }) => theme.palette.white};
  }
`;
export const DropdownMenuItem = styled(ListItem)`
  max-height: 32px;
`;
export const FavouriteIconWrapper = styled.div<{ favourite: boolean }>`
  .ds-icon svg {
    transition: fill 0.2s ease;
    fill: ${props => (props.favourite ? props.theme.palette['yellow-600'] : props.theme.palette['grey-600'])};
  }
`;

export const DropdownTrigger = styled(Icon)<IconProps>`
  svg {
    fill: ${props => props.theme.palette['grey-600']};
  }
  &:hover {
    svg {
      fill: ${props => props.theme.palette['blue-600']};
    }
  }
`;
