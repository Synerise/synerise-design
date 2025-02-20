import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ButtonStyles } from '@synerise/ds-button';
import { IconContainer } from '@synerise/ds-icon';
import * as T from '@synerise/ds-typography';

export const MainPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > div:last-of-type {
    margin-bottom: 0;
  }
`;

export const Title = styled.h4`
  ${T.macro.h500};
  margin: 0 0 24px;
  text-align: center;
  word-break: break-word;
`;

export const Description = styled(T.Description)`
  padding: 0;
  text-align: center;
  margin: 0 0 24px;
`;

export const ButtonContainer = styled.div`
  text-align: center;
  width: 100%;

  ${ButtonStyles.Button.AntdButton} {
    margin: 0 4px;

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export const PanelContainer = styled.div`
  margin: 0 0 24px;
  width: 100%;
  &&& {
    textarea {
      max-height: 234px;
      background-color: ${(props): string => props.theme.palette.white};
    }
  }
  .ant-list {
    border: 1px solid ${(props): string => props.theme.palette['grey-300']};
    border-radius: 3px;
    padding: 8px;
  }
`;

export const ResultIconContainer = styled.div`
  margin: 0 0 24px;
`;

export const StatusIconContainer = styled.div<{ iconColor: string; background: string }>`
  background-color: ${(props): string => props.theme.palette[props.background]};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  && {
    ${IconContainer} {
      fill: ${(props): string => props.theme.palette[props.iconColor]};
    }
  }
`;

export const ResultContainer = styled.div<{ noSearchResults: boolean }>`
  width: 100%;
  padding: 24px;
  position: relative;

  ${(props): FlattenSimpleInterpolation | false =>
    props.noSearchResults &&
    css`
      ${ResultIconContainer} {
        margin: 0 0 16px;
      }
      ${Title} {
        margin: 0 0 16px;
      }
      ${Description} {
        margin: 0 0 16px;
        font-size: 14px;
        line-height: 1.43;
        color: ${props.theme.palette['grey-600']};
      }
    `}
`;
