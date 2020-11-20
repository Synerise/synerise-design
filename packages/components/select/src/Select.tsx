import * as React from 'react';
import { ErrorText, Description } from '@synerise/ds-typography';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { Close3M, CloseS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import classNames from 'classnames';
import * as S from './Select.styles';
import { Props } from './Select.types';

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
      listHeight,
      className,
      ...antdProps
    } = this.props;
    const { size } = antdProps;
    return (
      <>
        <S.Label label={label} tooltip={tooltip} />
        <S.SelectWrapper
          className={classNames(
            'ds-select-wrapper',
            { error: errorText || error },
            { [className as string]: !!className }
          )}
          style={style}
        >
          {!!prefixel && <S.PrefixWrapper>{prefixel}</S.PrefixWrapper>}
          <S.AntdSelect
            {...antdProps}
            getPopupContainer={(node): HTMLElement => (node.parentElement != null ? node.parentElement : document.body)}
            listHeight={listHeight}
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
            className={classNames({ error: errorText || error })}
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
