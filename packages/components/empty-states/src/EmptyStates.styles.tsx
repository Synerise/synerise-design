import styled, { css } from 'styled-components';

import { EmptyStatesSize, FontSize } from './EmptyStates.types';

const FONT_SIZE_DEFAULT = 14;

const getFlexStyle = (iconPosition: 'top' | 'left' | 'right') => {
  return iconPosition === 'top'
    ? css`
        flex-direction: ${mapIconPosition[iconPosition]};
        align-items: center;
      `
    : css`
        flex-direction: ${mapIconPosition[iconPosition]};
        gap: 16px;
        align-items: flex-start;
      `;
};

const mapIconPosition = {
  right: 'row-reverse',
  top: 'column',
  left: 'row',
};

const mapTextAlign = {
  right: 'flex-end',
  left: 'flex-start',
  center: 'center',
  justify: 'center',
};

export const EmptyStatesIconContainer = styled.div``;

export const TextWrapper = styled.div`
  display: flex;
  line-height: 16px;
  max-width: 440px;
  word-wrap: break-word;
  padding-bottom: 8px;
`;
export const HeaderWrapper = styled.div<{
  fontSize?: EmptyStatesSize;
  size?: EmptyStatesSize;
  hasIcon?: boolean;
}>`
  display: flex;
  line-height: 16px;
  margin-top: ${(props) =>
    props.hasIcon && props.size === EmptyStatesSize.SMALL ? '12px' : ''};
  color: ${(props) => props.theme.palette['grey-800']};
  font-size: ${(props) =>
    FontSize[props.fontSize as string] || FONT_SIZE_DEFAULT}px;
  font-weight: 500;
  padding-bottom: ${(props) =>
    props.fontSize === EmptyStatesSize.SMALL ? '12px' : '18px'};
`;

export const ButtonWrapper = styled.div`
  padding-top: 12px;
  display: flex;
`;

export const EmptyStatesWrapper = styled.div<{
  iconPosition: 'top' | 'left' | 'right';
  mode?: 'absolute';
}>`
  display: flex;
  ${(props) => getFlexStyle(props.iconPosition)}

  ${(props) =>
    props.mode === 'absolute' &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
    `};
`;

export const EmptyStatesContent = styled.div<{
  textAlign: 'left' | 'right' | 'center' | 'justify';
}>`
  display: flex;
  flex-direction: column;
  text-align: ${(props) => props.textAlign};
  > * {
    justify-content: ${(props) => mapTextAlign[props.textAlign]};
  }
`;
