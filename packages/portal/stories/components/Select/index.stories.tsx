import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select, object } from '@storybook/addon-knobs';
import Select from '@synerise/ds-select';
import Scrollbar from '@synerise/ds-scrollbar';
import Result from '@synerise/ds-result';
import Icon, { LaptopM } from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { TagShape } from '@synerise/ds-tags';
import * as S from './stories.styles';
import Tooltip from '@synerise/ds-tooltip';
import RangePickerInput from '@synerise/ds-date-range-picker/dist/RangePickerInput/RangePickerInput';
import { Description } from '@synerise/ds-typography';
import Loader from '@synerise/ds-loader';

const decorator = storyFn => <div style={{ padding: '20px', width: '322px' }}>{storyFn()}</div>;

const { Option, OptGroup } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(
    <Option key={`Options ${i.toString(36).toUpperCase()}`}>{`Option ${i.toString(36).toUpperCase()}`}</Option>
  );
}

const modes = ['default', 'multiple', 'tags'];
const sizes = {
  small: 'small',
  default: 'default',
  large: 'large',
};
const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};
const values = ['Option A', 'Option B', 'Option C'];
const dropdownMenuStyles = {};
const dropdownStyles = {};
const selectorStyles = {};

const getErrorText = (error: boolean, errorText: string): string => {
  if (error) {
    return errorText;
  } else {
    return '';
  }
};

export const addonType = {
  icon: 'icon',
  tag: 'tag',
  avatar: 'avatar',
  label: 'label',
  none: 'none',
};
type SizeType = 'default' | 'small' | 'large';
export function renderAddonComponent(suffixElementType: string, labelText: string) {
  switch (suffixElementType) {
    case addonType.icon:
      return (
        <S.IconWrapper>
          <Icon color={theme.palette['grey-600']} component={<LaptopM />} />
        </S.IconWrapper>
      );
    case addonType.label:
      return (
        <Tooltip title={labelText}>
          <S.Label>{labelText}</S.Label>
        </Tooltip>
      );

    case addonType.avatar:
      return (
        <S.AvatarWithMargin size="small" backgroundColor="green" backgroundColorHue="400" shape="square">
          AK
        </S.AvatarWithMargin>
      );
    case addonType.tag:
      return (
        <S.TagAddon
          name="A"
          shape={TagShape.SINGLE_CHARACTER_SQUARE}
          color={theme.palette['cyan-200']}
          textColor={theme.palette['cyan-600']}
        />
      );
    default:
      return null;
      break;
  }
}

const stories = {
  default: () => {
    const validationState = boolean('Set validation state', false);
    const message = 'Error';
    const [isFocus, setFocus] = React.useState(false);
    return {
      tooltip: text('tooltip', 'This is example tooltip!'),
      clearTooltip: text('Clear tooltip', 'Clear'),
      description: text('description', 'Description'),
      errorText: !isFocus && getErrorText(validationState, message),
      error: !isFocus && validationState,
      label: renderLabel(text('Label', 'Label')),
      allowClear: boolean('allow clear', false),
      defaultActiveFirstOption: boolean('defaultActiveFirstOption', true),
      defaultValue: text('defaultValue', 'Option A'),
      disabled: boolean('disabled', false),
      dropdownMatchSelectWidth: boolean('dropdownMatchSelectWidth', true),
      dropdownStyle: object('dropdownStyle', dropdownMenuStyles),
      dropdownMenuStyle: object('dropdownMenuStyle', dropdownStyles),
      selectorStyle: object('selectorStyle', selectorStyles),
      loading: boolean('loading', false),
      mode: select('mode', modes, 'default'),
      onBlur: () => {
        action('I am blurred');
        setFocus(false);
      },
      onFocus: () => {
        action('I am focused');
        setFocus(true);
      },
      placeholder: text('placeholder', 'Please select value...'),
      size: select<'default' | 'small' | 'large'>('size', sizes as any, 'default'),
      showArrow: boolean('showArrow', true),
      showSearch: boolean('showSearch', false),
      onChange: action('OnChange'),
      style: { width: '100%' },
      children: values.map(opt => <Option value={opt}>{opt}</Option>),
      notFoundContent: <Result type="no-results" noSearchResults description={'No results'} />,
    };
  },

  multipleMode: {
    style: {
      width: '100%',
    },
    mode: 'multiple',
    defaultValue: 'a10',
    placeholder: 'Select options',
    onChange: action('OnChange'),
    dropdownRender: menu => <Scrollbar maxHeight={256}>{menu}</Scrollbar>,
    dropdownStyle: { paddingRight: '0' },
    notFoundContent: <Result type="no-results" noSearchResults description={'No results'} />,
    listHeight: '100%',
    children,
  },
  dateSelect: () => {
    const texts = {
      startDatePlaceholder: 'Start date',
      endDatePlaceholder: 'End date',
    };
    const [active, setActive] = React.useState(false);
    const validationState = boolean('Set validation state', false);
    const message = text('Error Text', 'Error');
    return (
      <div>
        <RangePickerInput
          texts={texts}
          active={active && !validationState}
          onFocus={(): void => setActive(true)}
          onBlur={(): void => setActive(false)}
          errorText={getErrorText(validationState, message)}
          error={validationState}
          tooltip={text('Tooltip', 'This is example tooltip!')}
          label={renderLabel(text('Label', 'Label'))}
          description={text('Description', 'Description')}
          onClick={(): void => setActive(true)}
          disabled={boolean('disabled', false)}
          highlight={false}
        />
      </div>
    );
  },
  withPrefixAndSuffix: () => {
    const prefixType = select('Set prefix type', addonType, addonType.none);
    const prefixLabelText = text('Set prefix label text', 'Prefix');
    const suffixType = select('Set suffix type', addonType, addonType.none);
    const suffixLabelText = text('Set suffix label text', 'Suffix');

    return {
      allowClear: false,
      defaultActiveFirstOption: true,
      defaultValue: text('defaultValue', 'Option A'),
      disabled: boolean('disabled', false),
      onBlur: action('I am blurred'),
      onFocus: action('I am focused'),
      onChange: action('OnChange'),
      style: { width: '100%' },
      children: values.map(opt => <Option value={opt}>{opt}</Option>),
      prefixel: renderAddonComponent(prefixType, prefixLabelText),
      suffixel: renderAddonComponent(suffixType, suffixLabelText),
      notFoundContent: <Result type="no-results" noSearchResults description={'No results'} />,
    };
  },
  withMultiselect: {
    style: {
      width: '100%',
    },
    defaultValue: 'lucy',
    mode: 'multiple',
    onChange: action('OnChange'),
    placeholder: 'Select options',
    showArrow: boolean('showArrow', true),
    children: [
      <OptGroup label="Manager">
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
      </OptGroup>,
      <OptGroup label="Engineer">
        <Option value="Yiminghe">Adam</Option>
      </OptGroup>,
    ],
    notFoundContent: <Result type="no-results" noSearchResults description={'No results'} />,
  },
  empty: () => ({
    style: { width: '100%' },
    notFoundContent: <Result type="no-results" noSearchResults description={'No results'} />,
  }),
  loadingIndicator: () => ({
    style: { width: '100%' },
    notFoundContent: (
      <div style={{ padding: '40px' }}>
        <Loader label="Loading..." />
      </div>
    ),
    placeholder: 'Loading Indicator',
  }),
};

export default {
  name: 'Components/Select',
  decorator,
  stories,
  Component: Select,
};
