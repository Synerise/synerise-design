{
  import React, {
    ReactNode,
    Component
  } from 'react';
  import {
    ErrorText,
    Description
  } from '@synerise/ds-typography';
  import '@synerise/ds-core/dist/js/style';
  import './style/index.less';
  import Icon, {
    Close3M,
    CloseS
  } from '@synerise/ds-icon';
  import Tooltip from '@synerise/ds-tooltip';
  import {
    getPopupContainer as defaultGetPopupContainer
  } from '@synerise/ds-utils';
  import classNames from 'classnames';
  import * as S from './Select.styles';
  import {
    Props
  } from './Select.types';
  class Select extends Component < Props > {
    static Option = S.AntdSelectOption;
    static OptGroup = S.AntdSelectOptGroup;
    render(): ReactNode {
      const {
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
        listHeight,
        className,
        getPopupContainer = defaultGetPopupContainer,
        grey,
        dropdownClassName,
        ...antdProps
      } = this.props;
      const {
        size
      } = antdProps;
      return (<S.SelectContainer>
        <S.Label label={label} tooltip={tooltip} tooltipConfig={tooltipConfig} />
        <S.SelectWrapper
          grey={grey}
          error={Boolean(errorText)}
          className={classNames(
            'ds-select-wrapper',
            { error: errorText || error },
            { [className as string]: !!className }
          )}
          style={style}
        >
          {!!prefixel && <S.PrefixWrapper>{prefixel}</S.PrefixWrapper>}
          <S.AntdSelect
            dropdownAlign={{ offset: [0, 8] }} // STOR-588
            {...antdProps}
            getPopupContainer={getPopupContainer}
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
            dropdownClassName={classNames('ps__child--consume', dropdownClassName)}
          />
          {!!suffixel && <S.SuffixWrapper>{suffixel}</S.SuffixWrapper>}
        </S.SelectWrapper>
        {errorText && (
          <S.ErrorWrapper description={Boolean(description)}>
            <ErrorText>{errorText}</ErrorText>
          </S.ErrorWrapper>
        )}
        {description && (
          <S.DescWrapper withError={Boolean(errorText)}>
            {description && <Description disabled={antdProps.disabled}>{description}</Description>}
          </S.DescWrapper>
        )}
      </S.SelectContainer>);
    }
  }
  export default Select;
}
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import Select from './Select';
const meta: Meta < Select > = {
  title: 'Select',
  component: Select,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < Select > ;
const StoryTemplate: Story = {
  render: (args) => <Select {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    label: 'Select label',
    description: 'Select description',
    errorText: 'Select error',
    tooltip: 'Select tooltip',
    tooltipConfig: {
      title: 'Select tooltip title'
    },
    clearTooltip: 'Clear',
    prefixel: 'Prefix',
    suffixel: 'Suffix',
    style: {
      width: '200px'
    },
    listHeight: 300,
    className: 'custom-select',
    getPopupContainer: () => document.body,
    grey: true,
    dropdownClassName: 'custom-dropdown',
    // add additional props if available
  },
};