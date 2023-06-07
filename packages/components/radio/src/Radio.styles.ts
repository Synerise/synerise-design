import styled, { css, SimpleInterpolation } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core';
import AntdRadio from 'antd/lib/radio';
import { macro } from '@synerise/ds-typography/';

export const RadioWrapper = styled.div`
  & {
    display: block;
    margin-bottom: 15px;
  }
`;

export const Description = styled.div<{ disabled?: boolean }>`
  color: ${(props: ThemeProps): string => props.theme.palette['grey-600']};
  ${(props): string => (props.disabled ? `opacity: 0.4;` : '')}
  ${macro.small}
`;

export const AdditionalData = styled.div`
  margin: 4px 8px 15px 28px;
`;

export const AntRadioGroup = styled(AntdRadio.Group)<{ fullWidth?: boolean; big?: boolean }>`
  ${(props): SimpleInterpolation =>
    props.fullWidth &&
    css`
      && {
        display: flex;
        width: 100%;
        label {
          flex: 1;
          height: ${props.big ? '48px' : '32px'};
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
        }
      }
    `}
`;
