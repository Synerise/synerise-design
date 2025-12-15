import AntdSelect from 'antd/lib/select';
import classNames from 'classnames';
import React, { forwardRef } from 'react';

import '@synerise/ds-core/dist/js/style';
import FormField from '@synerise/ds-form-field';
import Icon, { Close3M, CloseS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { getPopupContainer as defaultGetPopupContainer } from '@synerise/ds-utils';

import * as S from './Select.styles';
import { type Props } from './Select.types';
import './style/index.less';

export const Select = forwardRef<HTMLDivElement, Props>(
  (
    {
      label,
      description,
      errorText,
      error,
      tooltip,
      tooltipConfig,
      clearTooltip,
      prefixel,
      suffixel,
      style,
      size,
      listHeight,
      className,
      getPopupContainer = defaultGetPopupContainer,
      grey,
      dropdownClassName,
      asFormElement,
      raw,
      readOnly,
      disabled,
      ...antdProps
    },
    forwardedRef,
  ) => {
    const hasBottomMargin = asFormElement || Boolean(errorText || description);

    const simpleSelect = (
      <S.SelectWrapper
        grey={grey}
        error={Boolean(errorText)}
        className={classNames(
          'ds-select-wrapper',
          { error: errorText || error },
          { [className as string]: !!className },
        )}
        style={style}
        ref={raw ? forwardedRef : undefined}
      >
        {!!prefixel && <S.PrefixWrapper>{prefixel}</S.PrefixWrapper>}
        <S.AntdSelect
          dropdownAlign={{ offset: [0, 8] }} // STOR-588
          {...antdProps}
          getPopupContainer={getPopupContainer}
          listHeight={listHeight}
          size={size}
          withPrefixel={!!prefixel}
          withSuffixel={!!suffixel}
          disabled={disabled || readOnly}
          readOnly={readOnly}
          clearIcon={
            <Tooltip title={clearTooltip}>
              <span>
                <Icon
                  component={<Close3M />}
                  size={size === 'small' ? 18 : 24}
                />
              </span>
            </Tooltip>
          }
          removeIcon={<Icon component={<CloseS />} />}
          className={classNames({ error: errorText || error })}
          dropdownClassName={classNames(
            'ps__child--consume',
            dropdownClassName,
          )}
        />
        {!!suffixel && <S.SuffixWrapper>{suffixel}</S.SuffixWrapper>}
      </S.SelectWrapper>
    );

    return raw ? (
      simpleSelect
    ) : (
      <S.SelectContainer
        className="ds-select-container"
        hasBottomMargin={hasBottomMargin}
        ref={forwardedRef}
      >
        <FormField
          errorText={errorText}
          description={description}
          label={label}
          tooltip={tooltip}
          tooltipConfig={tooltipConfig}
        >
          {simpleSelect}
        </FormField>
      </S.SelectContainer>
    );
  },
);
type SelectCompoundComponent = typeof Select & {
  Option: typeof AntdSelect.Option;
  OptGroup: typeof AntdSelect.OptGroup;
};
const SelectWithComponents: SelectCompoundComponent = Object.assign(Select, {
  Option: AntdSelect.Option,
  OptGroup: AntdSelect.OptGroup,
});

export default SelectWithComponents;
