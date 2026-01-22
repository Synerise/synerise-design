import styled, { css } from 'styled-components';

export const SliderSection = styled.div<{
  $left: number;
  $width: number;
  $color: string;
}>`
  left: ${(props) => props.$left}%;
  width: ${(props) => props.$width}%;
  position: absolute;
  height: 100%;
  background: ${(props) => props.$color};
`;

export const SliderLine = styled.div<{
  thick?: boolean;
  lineColor?: string;
}>`
  height: ${(props) => `${props.thick ? '6' : '3'}px`};
  background: ${(props) => props.theme.palette[props.lineColor || 'grey-200']};
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  z-index: 10;
  border-radius: ${(props) => `${props.thick ? '6' : '3'}px`};
  ${SliderSection} {
    border-radius: ${(props) => `${props.thick ? '6' : '3'}px`};
  }
`;

export const SliderMarks = styled.div`
  position: relative;
  height: 18px;
  margin-top: -5px;
  &:empty {
    display: none;
  }
`;

export const SliderMark = styled.div<{
  $left: number;
  isNear: boolean;
}>`
  position: absolute;
  bottom: 0;
  left: ${(props) => props.$left}%;
  transform: translateX(
    ${(props) => (props.$left < 1 ? '0' : props.$left > 99 ? '-100' : '-50')}%
  );
  z-index: 10;
  ${(props) => props.isNear && `visibility: hidden;`}

  width: max-content;
  max-width: 100px;
  overflow-wrap: break-word;
`;

export const EventTrap = styled.div`
  display: contents:
`;

export const SliderHandleWrapper = styled.div<{
  $left: number;
  isActive?: boolean;
  $disabled?: boolean;
  $blocked?: boolean;
}>`
  position: absolute;
  top: 50%;
  left: ${(props) => props.$left}%;
  z-index: 20;
`;

export const SliderHandleValue = styled.div<{
  isActive?: boolean;
}>`
  position: absolute;
  top: 16px;
  pointer-events: none;
  transform: translateX(-50%);
  padding: 3px 8px;
  border-radius: 3px;

  width: max-content;
  max-width: 100px;
  overflow-wrap: break-word;

  ${(props) =>
    props.isActive
      ? css`
          box-shadow: ${props.theme.variables['box-shadow-2']};
          background-color: rgba(56, 67, 80, 0.9);
          color: ${props.theme.palette['white']};
        `
      : css`
          color: ${props.theme.palette['grey-800']};
        `}
`;

export const SliderHandle = styled.button<{
  isActive?: boolean;
  $disabled?: boolean;
  $blocked?: boolean;
}>`
  border: 3px solid ${(props) => props.theme.palette.white};
  background: ${(props) => props.theme.palette['grey-400']};
  position: absolute;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  outline: none;
  border-radius: 100%;
  z-index: 20;
  cursor: pointer;
  transition-property: background, box-shadow;
  transition-duration: 0.3s;

  ${(props) =>
    props.isActive &&
    css`
      &,
      &:hover {
        background: ${props.theme.palette['blue-600']};
        cursor: grabbing;
      }
      box-shadow: 0 0 0 3px rgba(35, 138, 254, 0.25);
    `};
  ${(props) =>
    (props.$disabled || props.$blocked) &&
    css`
      &,
      &:hover {
        background: ${props.theme.palette['grey-300']};
      }
      box-shadow: none;
    `};
`;

export const SliderBar = styled.div<{
  $type: 'allocation' | 'default' | 'range';
}>`
  position: relative;
  user-select: none;
  height: 20px;
  ${(props) =>
    props.$type === 'allocation' &&
    css`
      margin-top: 48px;
    `}
`;

export const SliderWrapper = styled.div<{
  $disabled?: boolean;
  withoutMarks?: boolean;
}>`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  gap: 16px;
  ${(props) =>
    props.withoutMarks &&
    css`
      padding-bottom: 29px;
    `}
  ${(props) =>
    !props.$disabled &&
    css`
      ${SliderLine} {
        cursor: pointer;
        &:hover {
          background-color: ${props.theme.palette['grey-300']};
        }
      }
    `}
`;
export const SliderDot = styled.div<{
  $left: number;
  $color?: string;
}>`
  position: absolute;
  bottom: 0;
  width: 10px;
  height: 10px;
  background: ${(props) => props.theme.palette[props.$color || 'grey-200']};
  border-radius: 50%;
  border: 3px solid ${(props) => props.theme.palette.white};
  left: ${(props) => props.$left}%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10;
`;

export const SliderLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
