import * as React from 'react';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { ErrorText, Description } from '@synerise/ds-typography';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { Close3M, CloseS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './Select.styles';

interface Props<T = SelectValue> extends SelectProps<T> {
  errorText?: React.ReactNode;
  error?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  tooltip?: React.ReactNode;
  clearTooltip?: string;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
}

class Select extends React.Component<Props> {
  static Option = S.AntdSelectOption;
  static OptGroup = S.AntdSelectOptGroup;

  render(): React.ReactNode {
    const {
      label,
      description,
      errorText,
      error,
      tooltip,
      clearTooltip,
      prefixel,
      suffixel,
      style,
      ...antdProps
    } = this.props;
    const { size } = antdProps;
    return (
      <>
        <S.Label label={label} tooltip={tooltip} />
        <S.SelectWrapper className={errorText || error ? 'error ds-select-wrapper' : 'ds-select-wrapper'} style={style}>
          {!!prefixel && <S.PrefixWrapper>{prefixel}</S.PrefixWrapper>}
          <S.AntdSelect
            {...antdProps}
            size={size}
            prefixel={!!prefixel}
            suffixel={!!suffixel}
            clearIcon={
              <Tooltip title={clearTooltip}>
                <span>
                  <Icon component={<Close3M />} size={size === 'small' ? 18 : 24} />
                </span>
              </Tooltip>
            }
            removeIcon={<Icon component={<CloseS />} />}
            className={errorText || error ? 'error' : undefined}
          />
          {!!suffixel && <S.SuffixWrapper>{suffixel}</S.SuffixWrapper>}
        </S.SelectWrapper>

        {errorText && (
          <S.ErrorWrapper>
            <ErrorText>{errorText}</ErrorText>
          </S.ErrorWrapper>
        )}
        {description && (
          <S.DescWrapper withError={Boolean(errorText)}>
            {description && <Description disabled={antdProps.disabled}>{description}</Description>}
          </S.DescWrapper>
        )}
      </>
    );
  }
}

export default Select;
