import styled from 'styled-components';

import { ButtonStyles } from '@synerise/ds-button';
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
  margin: 0 0 8px;
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
      background-color: ${(props) => props.theme.palette.white};
    }
  }
  .ant-list {
    border: 1px solid ${(props) => props.theme.palette['grey-300']};
    border-radius: 3px;
    padding: 8px;
  }
`;

export const ResultIconContainer = styled.div`
  margin: 0 0 12px;
`;

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
  width: 100%;
  padding: 24px;
  position: relative;
`;
