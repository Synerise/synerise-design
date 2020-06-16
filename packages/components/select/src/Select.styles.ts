import styled from 'styled-components';
import Select, { SelectProps, SelectValue } from 'antd/lib/select';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as React from 'react';
import { Label as DSLabel } from '@synerise/ds-input';

const { OptGroup, Option } = Select;

const errorStyle = (props: ThemeProps): string => `
border-color: ${props.theme.palette['red-600']};
box-shadow: inset 0 0 0 1px ${props.theme.palette['red-600']};
background: ${props.theme.palette['red-050']};
`;

const withPrefixStyles = (): string => `
  border-top-left-radius:0;
  border-bottom-left-radius:0;
`;
const withSuffixStyles = (): string => `
  border-top-right-radius:0;
  border-bottom-right-radius:0;
`;

const addonStyles = (props: ThemeProps): string => `
  display: flex;
  align-items: center;
  background: ${props.theme.palette['grey-050']};
  box-shadow: inset 0 0 0 1px ${props.theme.palette['grey-300']};
  color: ${props.theme.palette['grey-500']};
  font-size:13px;
  line-height: 1.39;
 `;

export const AntdSelect = styled((Select as unknown) as React.ComponentType<SelectProps<SelectValue>>)<{
  size?: string;
  prefixel?: boolean;
  suffixel?: boolean;
}>`
  ${(props): string | false =>
    props.size === 'large' &&
    `
    &&& {
    height:48px;
    .ant-select-selector, .ant-select-selection-search-input{
    height:48px !important;
    }

    .ant-select-selection-item, .ant-select-selection-placeholder{
      line-height:46px !important;
    }
    }
  `}
  &&& {
    width: 100%;
    .ant-select-clear {
      height: 18px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      top: 50%;
      right: 8px;
      transform-origin: 50% 25%;
      display: flex;
      transform: translateY(-50%);
      align-items: center;
      justify-content: center;
      margin-top: 0;
    }
    .ant-select-selector {
      ${(props): string | false => !!props.prefixel && withPrefixStyles()}
      ${(props): string | false => !!props.suffixel && withSuffixStyles()}
    }
  }

  &.error {
    .ant-select-selector {
      ${(props): string => errorStyle(props)}
    }
    .ant-select-clear {
      background-color: ${(props): string => props.theme.palette['red-050']};
    }
  }
`;

export const AntdSelectOption = styled(Option)``;

export const AntdSelectOptGroup = styled(OptGroup)``;

export const LabelWrapper = styled.div`
  margin: 0 0 8px 0;
`;

export const ErrorWrapper = styled.div`
  margin: 8px 0 0;
`;

export const DescWrapper = styled.div<{ withError: boolean }>`
  margin: ${(props): string => (props.withError ? '4px 0 0' : '8px 0 0')};
`;

export const Label = styled(DSLabel)`
  margin-bottom: 8px;
`;
export const SelectWrapper = styled.div`
  display: flex;
`;
export const PrefixWrapper = styled.div`
  border-radius: 3px 0 0 3px;
  margin-right: -2px;
  ${(props): string => addonStyles(props)};
`;

export const SuffixWrapper = styled.div`
  border-radius: 0 3px 3px 0;
  margin-left: -1px;
  ${(props): string => addonStyles(props)};
`;
