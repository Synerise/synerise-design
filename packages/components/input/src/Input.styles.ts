import styled, { css } from 'styled-components';
import BaseAntInput from 'antd/lib/input';

const errorInputStyle = (props): string => `
  && {
    border-color: ${props.theme.palette['red-600']};
    box-shadow: inset 0 0 0 1px ${props.theme.palette['red-600']};
    background: ${props.theme.palette['red-050']};
  }
`;

export const OuterWrapper = styled.div`
  margin: ${(props): string => (props.resetMargin ? '0' : '0 0 24px 0')};
`;

export const Wrapper = styled.div`
  margin-bottom: 24px;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const IconsWrapper = styled.div`
  position: absolute;
  right: 8px;
  top: 0;
  z-index: 1;
  height: 100%;

  .icon {
    svg {
      transition: 0.3s all;
      fill: ${(props): string => props.theme.palette['grey-600']};
      opacity: ${(props): string => props.disabled && '0.4'};
    }
  }
`;

export const IconsFlexContainer = styled.div`
  ${(props): string => {
    if (props.type === 'input') {
      return css`
        display: flex;
        align-items: center;
        height: 100%;
      `;
    }

    return css`
      display: flex;
      align-items: flex-end;
      height: 100%;
      padding-bottom: 8px;
    `;
  }}
`;

export const AntdInput = styled(BaseAntInput)`
  ${(props): string => props.error && errorInputStyle(props)};

  && {
    color: ${(props): string => props.theme.palette['grey-700']};
  }
`;

export const AntdTextArea = styled(BaseAntInput.TextArea)`
  ${(props): string => props.error && errorInputStyle(props)};

  && {
    color: ${(props): string => props.theme.palette['grey-700']};
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
`;

export const Counter = styled.div`
  font-weight: 500;
`;

export const Description = styled.div`
  color: ${(props): string => props.theme.palette['grey-500']};
`;

export const ContentAbove = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;
