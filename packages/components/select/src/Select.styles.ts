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

export const AntdSelect = styled((Select as unknown) as React.ComponentType<SelectProps<SelectValue>>)`
  &.error {
    .ant-select-selection {
      ${(props): string => errorStyle(props)}
    }
  }
`;

export const AntdSelectOption = styled(Option)``;

export const AntdSelectOptGroup = styled(OptGroup)``;

export const LabelWrapper = styled.div`
  margin: 0 0 8px 4px;
`;

export const ErrorWrapper = styled.div`
  margin: 8px 0 4px 4px;
`;

export const DescWrapper = styled.div`
  margin: 4px 0 0 4px;
`;

export const Label = styled(DSLabel)`
  margin-bottom: 8px;
`;
