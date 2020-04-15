import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import BaseAntCheckbox from 'antd/lib/checkbox';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

const checkSvgWithCustomColor = (color: string): string => {
  const colorValueForSvg = color.replace(/#/, '%23');
  const iconWithColor = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='3 3 18 18' >/><path fill='none' d='M0 0h24v24H0z' /><path style='fill: ${colorValueForSvg};' stroke-width='1' stroke='${colorValueForSvg}' d='M10.61 15.744a.75.75 0 01-.535-.224l-3.11-3.162a.75.75 0 011.07-1.052l2.575 2.618 5.355-5.444a.75.75 0 111.07 1.052l-5.89 5.988a.75.75 0 01-.535.224z'/></svg>`;
  return iconWithColor;
};

type Props = {
  solo: boolean;
};

const soloCss = css`
  padding: 4px;
  display: inline-block;
`;

export const AntdCheckbox = styled(BaseAntCheckbox)<Props & ThemeProps>`
  && {
    display: flex;
    align-items: center;
    line-height: 1;
    ${(props: Props & ThemeProps): FlattenSimpleInterpolation | undefined | false => props.solo && soloCss};
    .ant-checkbox {
      top: 0;
    }
  }
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border: 1px solid ${(props: ThemeProps): string => props.theme.palette['blue-600']};
    box-shadow: inset 0 0 0 1px ${(props: ThemeProps): string => props.theme.palette['blue-600']};
  }
  && > .ant-checkbox-checked > span.ant-checkbox-inner {
    background-color: none;
    background-image: ${(props: ThemeProps): string => `url("${checkSvgWithCustomColor(props.theme.palette.white)}")`};

    ::after {
      display: none;
    }

    :focus {
      border: none;
    }
  }
`;

export const AdditionalData = styled.div`
  margin: 2px 12px 0px 28px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  padding: 4px 12px 8px 8px;
  flex-direction: column;
`;
