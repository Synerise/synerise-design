import styled from 'styled-components';
import Button from '@synerise/ds-button';
// eslint-disable-next-line import/no-named-default
import { default as StyledButtonContainer } from '@synerise/ds-button/dist/Button.styles';
import Icon from '@synerise/ds-icon';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';
import * as T from '@synerise/ds-typography';

export const ResultContainer = styled.div`
  width: 100%;
  padding: 24px;
  position: relative;
`;

export const CloseButton = styled(Button)`
  && {
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    height: 32px;
    line-height: 31px;
    margin: 0 4px;
    text-align: center;
    padding: 0;
  }
`;

export const CloseIcon = styled(Icon)``;

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
  margin: 24px 0;
  text-align: center;
`;

export const Description = styled(T.Description)`
  padding: 0;
  text-align: center;
  margin: 0 0 24px;
`;

export const ButtonContainer = styled.div`
  text-align: center;

  ${StyledButtonContainer} {
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
  margin: 24px 0;
  width: 100%;
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
