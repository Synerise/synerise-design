import styled, { FlattenInterpolation } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { macro } from '@synerise/ds-typography';

type InPlaceEditableInputContainerProps = {
  size: 'small' | 'normal';
  disabled?: boolean;
  error?: boolean;
  emptyValue: boolean;
};
const applyColor = (props: ThemeProps & InPlaceEditableInputContainerProps): string => {
  if (props.error) return props.theme.palette['red-600'];
  if (props.emptyValue) return props.theme.palette['grey-400'];
  return props.theme.palette['grey-800'];
};

const applyDots = (props: ThemeProps & InPlaceEditableInputContainerProps): string => {
  if (props.error) return props.theme.palette['red-600'];
  return props.theme.palette['grey-400'];
};

export const FontStyleWatcher = styled.div`
  visibility: hidden;
  pointer-events: none;
`;

export const IconWrapper = styled.div<{ size: string } & ThemeProps>`
  border-radius: 24px;
  color: ${(props): string => props.theme.palette['grey-600']};
  background: ${(props): string => props.theme.palette['grey-100']};
  margin: 0 
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: ${(props): string => (props.size === 'normal' ? '16px' : '4px')};
  width: 24px;
  height: 24px;
  line-height: inherit;
  cursor: pointer;
  &:hover {
    background-color: ${(props): string => props.theme.palette.white};
  }
`;

export const InPlaceEditableInputContainer = styled.div<InPlaceEditableInputContainerProps>`
  
  display: flex;
  max-width: 100%;
  align-items: center;
  opacity: ${({ disabled }): number => (disabled ? 0.4 : 1)};
  pointer-events: ${({ disabled }): string => (disabled ? 'none' : 'all')};
  ${IconWrapper} {
    background-color: ${({ theme }): string => theme.palette['grey-200']};
    svg {
      color: ${(props): string => applyColor(props)};
      fill: ${(props): string => applyColor(props)};
    }
  }
   &:hover {
      input {
        color: ${(props): string => props.theme.palette['grey-800']};
        background-image: linear-gradient(
          to right,
          ${(props): string => applyDots(props)} 20%,
          rgba(255, 255, 255, 0) 10%
        );
      }
      ${IconWrapper} {
        background-color: ${({ theme }): string => theme.palette['grey-300']};
        svg {
          color: ${({ theme }): string => theme.palette['grey-800']}
          fill: ${({ theme }): string => theme.palette['grey-800']}
        }
      }
    }

    &:focus {
      input {
        background-image: linear-gradient(
          to right,
          ${(props: ThemeProps): string => props.theme.palette['blue-600']} 20%,
          rgba(255, 255, 255, 0) 10%
        );
      }
    }

  > .autosize-input {
    display: inline-block;
    overflow: hidden;
  }

  > .autosize-input > input,
  > ${FontStyleWatcher} {
    border: none;
    background-color: transparent;
    background-position: bottom left;
    background-size: 5px 1px;
    background-repeat: repeat-x;
    ${({ size }): FlattenInterpolation<ThemeProps> =>
      size === 'normal' ? macro.h500 : macro.small}; //todo: set type  
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    padding: 0;
    margin: 0;
    vertical-align: top;
    color: ${(props): string => applyColor(props)};
    ::placeholder {
      color: ${(props): string => props.theme.palette[props.error ? 'red-600' : 'grey-400']};
    }
  }
`;
