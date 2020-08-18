import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export type InputWrapperProps = { error?: boolean; focus?: boolean; disabled?: boolean };

const errorInputStyle = (props: ThemeProps): string => `
  &&, .ant-input {
    border-color: ${props.theme.palette['red-600']};
    box-shadow: inset 0 0 0 2px ${props.theme.palette['red-600']};
    background: ${props.theme.palette['red-050']};
    border-radius: 4px;
  }
`;
const focusStyle = (props: ThemeProps): string => `
  && {
    box-shadow: inset 0 0 0 2px ${props.theme.palette['blue-600']};
    border-color: ${props.theme.palette['blue-600']};
    background: ${props.theme.palette['blue-050']};
  }
`;
const contentShrinkStyle = (): FlattenSimpleInterpolation => css`
  && {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
const disabledStyled = (props: ThemeProps): FlattenSimpleInterpolation => css`
  &:hover,
  &,
  && > * {
    cursor: not-allowed;
  }
  opacity: 0.8;
  color: ${props.theme.palette[`grey-600`]};
  background: ${props.theme.palette['grey-050']};
`;

const hoverStyle = (props: ThemeProps): FlattenSimpleInterpolation => css`
  &:hover {
    border-color: ${props.theme.palette['grey-200']};
    box-shadow: inset 0 0 0 1px ${props.theme.palette['grey-400']};
  }
`;

export const ContentBelow = styled.div`
  margin-top: 8px;
`;

export const ErrorText = styled.div`
  color: ${(props): string => props.theme.palette['red-600']};
  margin-bottom: 4px;
`;

export const Label = styled.label`
  color: ${(props): string => props.theme.palette['grey-800']};
  font-weight: 500;
  display: block;
  white-space: nowrap;
`;

export const Description = styled.div`
  color: ${(props): string => props.theme.palette['grey-600']};
`;

export const ContentAbove = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;
export const IconWrapper = styled.div`
  overflow: hidden;
  width: 24px;
  margin-left: -16px;
  display: none;
  .remove {
    svg {
      fill: ${(props): string => props.theme.palette['red-600']};
    }
  }
`;
export const ValueText = styled.div<{ shrink?: boolean; disabled?: boolean }>`
  line-height: 22px;
  text-decoration: none;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
  white-space: nowrap;
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  box-shadow: inset 0 0 0 1px ${(props): string => props.theme.palette['grey-300']};
  background-color: ${(props): string => props.theme.palette.white};
  width: 100%;
  border-radius: 3px;
  display: flex;
  padding: 2px 12px ;
  min-height: 32px;
  flex-wrap:wrap;
  transition: 0.3s all;
  ${(props): FlattenSimpleInterpolation | false => !props.disabled && hoverStyle(props)}
  ${(props): string => (props.focus && !props.disabled ? focusStyle(props) : '')}
  ${(props): string => (props.error ? errorInputStyle(props) : '')}
  ${(props): FlattenSimpleInterpolation | false => !!props.disabled && disabledStyled(props)}
  
`;

export const ValueWrapper = styled.div<{ disabled?: boolean; shrink?: boolean }>`
  display: grid;
  height: 24px;
  & {
    background-color: ${(props): string =>
      props.disabled ? props.theme.palette['grey-200'] : props.theme.palette['grey-100']};
  }
  border-radius: 3px;
  border: none;
  margin: 2px;
  white-space: nowrap;
  position: relative;
  padding: 0 8px;
  right: 8px;
  overflow: hidden;
  grid-template-columns: calc(100%) 0px;
  ${(props): string | false =>
    !!props.shrink &&
    `
     ${ValueText} {
       max-width: calc(100% - 16px);
       overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
      }
      ${IconWrapper} {
        display:block;
      }
`}
  transition: color 0.1s ease-in-out;
  transition: background-color 0.1s ease-in-out;
  &:hover {
    background-color: ${(props): string => props.theme.palette['grey-200']};
    color: ${(props): string | false => !props.disabled && props.theme.palette['grey-800']};
    cursor: pointer;
    ${(props): FlattenSimpleInterpolation | false => !!props.shrink && !props.disabled && contentShrinkStyle()}
  }
  ${(props): FlattenSimpleInterpolation | false => !!props.disabled && disabledStyled(props)}
`;
export const BorderLessInput = styled.input<{ disabled?: boolean }>`
  box-shadow: none;
  border: none;
  min-width: 0;
  display: flex;
  flex: 1;
  margin-left: -8px;
  && {
    background-color: rgba(255, 255, 255, 0);
  }
  &::placeholder {
    color: ${(props): string => props.theme.palette['grey-500']};
  }
  ${(props): FlattenSimpleInterpolation | false => !!props.disabled && disabledStyled(props)}
`;
