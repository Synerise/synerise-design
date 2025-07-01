import BaseAntCheckbox, { type CheckboxProps } from 'antd/lib/checkbox';
import styled, { css } from 'styled-components';

const checkSvgWithCustomColor = (color: string) => {
  const colorValueForSvg = color.replace(/#/, '%23');
  const iconWithColor = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='3 3 18 18' >/><path fill='none' d='M0 0h24v24H0z' /><path style='fill: ${colorValueForSvg};' stroke-width='1' stroke='${colorValueForSvg}' d='M10.61 15.744a.75.75 0 01-.535-.224l-3.11-3.162a.75.75 0 011.07-1.052l2.575 2.618 5.355-5.444a.75.75 0 111.07 1.052l-5.89 5.988a.75.75 0 01-.535.224z'/></svg>`;
  return iconWithColor;
};

const soloCss = css`
  padding: 4px;
`;

/**
 * error TS4023: Exported variable 'AntdCheckbox' has or is using name 'CompoundedComponent' from external module "/Users/biedronne/Documents/Work/DS2/synerise-design/node_modules/antd/lib/checkbox/index" but cannot be named.
 */
type CompoundedComponent = React.ForwardRefExoticComponent<
  CheckboxProps & React.RefAttributes<HTMLInputElement>
> & {
  Group: typeof BaseAntCheckbox.Group;
};
export const AntdCheckbox = styled(BaseAntCheckbox as CompoundedComponent)<{
  solo: boolean;
}>`
  && {
    display: flex;
    align-items: center;
    line-height: 1;
    ${(props) => props.solo && soloCss};

    .ant-checkbox {
      top: 0;
    }
  }

  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border: 1px solid ${(props) => props.theme.palette['blue-600']};
    box-shadow: inset 0 0 0 1px ${(props) => props.theme.palette['blue-600']};
  }

  && > .ant-checkbox-disabled.ant-checkbox-checked > span.ant-checkbox-inner {
    background-image: ${(props) =>
      `url("${checkSvgWithCustomColor(props.theme.palette['grey-400'])}")`};
  }

  && > .ant-checkbox-checked > span.ant-checkbox-inner {
    background-image: ${(props) =>
      `url("${checkSvgWithCustomColor(props.theme.palette.white)}")`};

    ::after {
      display: none;
    }

    :focus {
      border: none;
    }
  }

  && {
    > .ant-checkbox-indeterminate,
    .ant-checkbox-indeterminate.ant-checkbox-checked {
      > span.ant-checkbox-inner {
        background-color: ${(props) => props.theme.palette['blue-600']};
        border: 1px solid ${(props) => props.theme.palette['blue-600']};
        background-image: none;

        ::after {
          background: #fff;
          height: 2px;
          display: table;
          left: 50%;
        }
      }
    }
    :hover {
      > .ant-checkbox-indeterminate,
      .ant-checkbox-indeterminate.ant-checkbox-checked {
        > span.ant-checkbox-inner {
          background-color: ${(props) => props.theme.palette['blue-500']};
        }
      }
    }
  }

  /* displays checked icon on hover */
  &&:hover
    > .ant-checkbox:not(.ant-checkbox-checked):not(
      .ant-checkbox-indeterminate
    ):not(.ant-checkbox-disabled)
    > span.ant-checkbox-inner {
    border-width: 1px;
    border-style: solid;
    /* used important to override antd's error border color */
    border-color: ${(props) => props.theme.palette['blue-600']} !important;
    outline: none;
    background-image: ${(props) =>
      `url("${checkSvgWithCustomColor(props.theme.palette['blue-600'])}")`};
  }
`;

export const AdditionalData = styled.div`
  margin: 2px 12px 0px 28px;
`;

export const CheckboxWrapper = styled.div<{ withoutPadding: boolean }>`
  display: flex;
  padding: ${(props) => (props.withoutPadding ? '0' : '4px 12px 8px 8px')};
  flex-direction: column;
`;
