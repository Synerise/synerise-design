import Icon from '@synerise/ds-icon';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Item } from '../Item.styles';

export const FolderItem = styled(Item)``;

export const ArrowIcon = styled(Icon)<{ expanded: boolean }>`
  transition: transform 0.2s ease;

  ${(props): FlattenSimpleInterpolation | string =>
    props.expanded
      ? css`
          transform: rotate(90deg);
        `
      : ''}
`;

export const ButtonFiller = styled.div`
  position: absolute;
  top: 0;
  background: #000;
`;
