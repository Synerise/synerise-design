import styled from 'styled-components';

import Icon, { type IconProps } from '@synerise/ds-icon';

export const StarCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
export const StarredIcon = styled(Icon)<
  IconProps & { active?: boolean; onClick?: () => void }
>`
  margin-right: 16px;
  ${(props): false | string =>
    !!props.active &&
    `&.icon.icon1.ds-icon svg {
  fill: ${props.theme.palette['yellow-600']};
  }`}
  &:hover {
    svg {
      fill: ${(props): string =>
        props.active
          ? props.theme.palette['yellow-600']
          : props.onClick && props.theme.palette['blue-600']};
    }
  }
`;
