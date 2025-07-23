import styled from 'styled-components';

import { ButtonStyles } from '@synerise/ds-button';
import * as T from '@synerise/ds-typography';

export const Title = styled.h4`
  ${T.macro.h500};
  margin: 0;
  text-align: center;
  word-break: break-word;
`;

export const Description = styled(T.Description)`
  padding: 0;
  text-align: center;
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
  width: 100%;
  &&& {
    textarea {
      max-height: 234px;
      background-color: ${(props) => props.theme.palette.white};
    }
  }
  .ant-list {
    border: 1px solid ${(props) => props.theme.palette['grey-300']};
    border-radius: 3px;
    padding: 8px;
  }
`;

export const ResultIconContainer = styled.div``;

export const StatusIconContainer = styled.div<{
  iconColor: string;
}>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: ${(props) => props.theme.palette[props.iconColor]};
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 24px;
  max-width: 440px;
`;

export const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
