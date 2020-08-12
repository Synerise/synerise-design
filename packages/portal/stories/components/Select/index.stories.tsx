import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select, object } from '@storybook/addon-knobs';
import Select from '@synerise/ds-select';
import Scrollbar from '@synerise/ds-scrollbar';
import Result from '@synerise/ds-result';
import Icon from '@synerise/ds-icon';
import { LaptopM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { TagShape } from '@synerise/ds-tags';
import * as S from './stories.styles';
import Tooltip from '@synerise/ds-tooltip';

const decorator = (storyFn) => <div style={{ padding: '20px', width: '322px' }}>{storyFn()}</div>;

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
  large: 'large,',
};
const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};
const values = ['Option A', 'Option B', 'Option C'];
const dropdownMenuStyles = {};
const dropdownStyles = {};
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
      allowClear: false,
      defaultActiveFirstOption: boolean('defaultActiveFirstOption', true),
      defaultValue: text('defaultValue', 'Option A'),
      disabled: boolean('disabled', false),
      dropdownMatchSelectWidth: boolean('dropdownMatchSelectWidth', true),
      dropdownStyle: object('dropdownStyle', dropdownMenuStyles),
      dropdownMenuStyle: object('dropdownMenuStyle', dropdownStyles),
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
      showArrow: boolean('showArrow', false),
      showSearch: boolean('showSearch', false),
      onChange: action('OnChange'),
      style: { width: '100%' },
      children: values.map((opt) => <Option value={opt}>{opt}</Option>),
      notFoundContent: <Result type="no-results" noSearchResults description={'No results'} />,
    };
  },

  multipleMode: {
    style: {
      width: '100%',
    },
    mode: 'multiple',
    defaultValue: 'a10',
    onChange: action('OnChange'),
    dropdownRender: (menu) => <Scrollbar maxHeight={256}>{menu}</Scrollbar>,
    dropdownStyle: { paddingRight: '0' },
    notFoundContent: <Result type="no-results" noSearchResults description={'No results'} />,
    listHeight: '100%',
    children,
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
      children: values.map((opt) => <Option value={opt}>{opt}</Option>),
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
};

export default {
  name: 'Components/Select',
  decorator,
  stories,
  Component: Select,
};
