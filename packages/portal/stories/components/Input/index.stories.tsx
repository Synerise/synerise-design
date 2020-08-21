import * as React from 'react';
import { Input, TextArea, RawInput, InputGroup, MaskedInput, InputMultivalue } from '@synerise/ds-input';

import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import Select from '@synerise/ds-select';
import { array, boolean, number, select, select as knobSelect, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import * as S from '../Select/stories.styles';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { LaptopM } from '@synerise/ds-icon/dist/icons';
import { TagShape } from '@synerise/ds-tags';
import DSFlag from '@synerise/ds-flag';
import { FlagContainer } from './stories.styles';
import Tooltip from '@synerise/ds-tooltip';
import InputNumber from '@synerise/ds-input-number';

const decorator = storyFn => <div style={{ width: '300px' }}>{storyFn()}</div>;
const sizes = ['default', 'large'];
const getErrorText = (error: boolean, errorText: string): string => {
  if (error) {
    return errorText;
  } else {
    return '';
  }
};
const addonType = {
  icon: 'icon',
  tag: 'tag',
  avatar: 'avatar',
  label: 'label',
  none: 'none',
};
const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};
function renderAddonComponent(suffixElementType: string, labelText?: string) {
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
    const [value, setValue] = React.useState<string>('');
    const validationState = boolean('Set validation state', false);
    const message = text('Error Text', 'Error');
    const [isFocus, setFocus] = React.useState(false);
    const size = knobSelect('Set size', sizes as any, 'default');

    return (
      <Input
        tooltip={text('Tooltip', 'This is example tooltip!')}
        placeholder={text('Placeholder', 'Placeholder')}
        label={renderLabel(text('Label', 'Label'))}
        description={text('Description', 'Description')}
        errorText={!isFocus && getErrorText(validationState, message)}
        counterLimit={number('CounterLimit', 10)}
        error={!isFocus && validationState}
        disabled={boolean('Disabled', false)}
        onChange={e => setValue(e.target.value)}
        value={value}
        size={size}
        onBlur={() => {
          action('I am blurred');
          setFocus(false);
        }}
        onFocus={() => {
          action('I am focused');
          setFocus(true);
        }}
      />
    );
  },
  inputGroup: () => {
    const size = knobSelect('Set size', sizes as any, 'default');
    const select = (
      <Select
        size={size}
        tooltip={text('Tooltip', 'This is example tooltip!')}
        style={{ width: '50%' }}
        defaultValue="post"
        error={boolean('Set select error', false)}
      >
        <Select.Option value="post">POST</Select.Option>
        <Select.Option value="get">GET</Select.Option>
      </Select>
    );
    const whiteSelect = (
      <Select
        className={'white'}
        size={size}
        tooltip={text('Tooltip', 'This is example tooltip!')}
        style={{ width: '50%' }}
        defaultValue="post"
        error={boolean('Set select error', false)}
      >
        <Select.Option value="post">POST</Select.Option>
        <Select.Option value="get">GET</Select.Option>
      </Select>
    );
    const input = (
      <RawInput
        size={size}
        placeholder={text('Placeholder', 'Placeholder')}
        disabled={boolean('Disabled', false)}
        error={boolean('Set input error', false)}
        style={{ width: '50%' }}
      />
    );
    const inputNumber = (
      <InputNumber
        size={size}
        placeholder={text('Placeholder', 'Placeholder')}
        disabled={boolean('Disabled', false)}
        error={boolean('Set input error', false)}
        style={{ width: '50%' }}
        raw
      />
    );
    const inputGroupElements = {
      Input: input,
      InputNumber: inputNumber,
      Button: select,
      Select: whiteSelect,
    };
    const leftSideComponent = knobSelect(
      'Set left-side component',
      Object.keys(inputGroupElements),
      Object.keys(inputGroupElements)[2]
    );
    const rightSideComponent = knobSelect(
      'Set right-side component',
      Object.keys(inputGroupElements),
      Object.keys(inputGroupElements)[0]
    );

    return (
      <InputGroup
        size={size}
        tooltip={text('Tooltip', 'This is example tooltip!')}
        label={renderLabel(text('Label', 'Label'))}
        description={text('Description', 'Description')}
        errors={array('Errors', [])}
        resetMargin={boolean('ResetMargin', false)}
        compact
      >
        {inputGroupElements[leftSideComponent]}
        {inputGroupElements[rightSideComponent]}
      </InputGroup>
    );
  },
  withFlags: () => {
    const [value, setValue] = React.useState<string>('');
    const size = knobSelect('Set size', sizes as any, 'default');

    const select = (
      <Select
        size={size}
        tooltip={text('Tooltip', 'This is example tooltip!')}
        onChange={action('OnChange')}
        style={{ width: '120px' }}
        defaultValue="es"
        error={boolean('Set select error', false)}
      >
        <Select.Option value="es">
          <FlagContainer>
            <DSFlag country={'ES'} size={20} />
            <span>{'(+34)'}</span>
          </FlagContainer>
        </Select.Option>
        <Select.Option value="pl">
          <FlagContainer>
            <DSFlag country={'PL'} size={20} />
            <span>{'(+48)'}</span>
          </FlagContainer>
        </Select.Option>{' '}
        <Select.Option value="gb">
          <FlagContainer>
            <DSFlag country={'GB'} size={20} />
            <span>{'(+44)'}</span>
          </FlagContainer>
        </Select.Option>
      </Select>
    );

    const input = (
      <RawInput
        size={size}
        placeholder={text('Placeholder', 'Placeholder')}
        disabled={boolean('Disabled', false)}
        onChange={e => setValue(e.target.value)}
        value={value}
        error={boolean('Set input error', false)}
        style={{ width: '50%' }}
      />
    );

    return (
      <InputGroup
        size={size}
        tooltip={text('Tooltip', 'This is example tooltip!')}
        label={renderLabel(text('Label', 'Label'))}
        description={text('Description', 'Description')}
        errors={array('Errors', [])}
        resetMargin={boolean('ResetMargin', false)}
        compact
      >
        {select}
        {input}
      </InputGroup>
    );
  },
  inputWithMask: () => {
    const [creditCardvalue, setCreditCardvalue] = React.useState<string>('');
    const [dateValue, setDateValue] = React.useState<string>('');
    const [birthdateValue, setBirthdateValue] = React.useState<string>('');
    const [phoneValue, setPhoneValue] = React.useState<string>('');
    const [phonePrefixValue, setPhonePrefixValue] = React.useState<string>('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: 400 }}>
        <MaskedInput
          label="Phone number"
          value={phoneValue}
          onChange={e => setPhoneValue(e.target.value)}
          mask="11 111-11-11"
        />

        <MaskedInput
          label="Phone number with prefix"
          value={phonePrefixValue}
          onChange={e => setPhonePrefixValue(e.target.value)}
          mask="(11) 111-11-11"
        />

        <MaskedInput label="Date" value={dateValue} onChange={e => setDateValue(e.target.value)} mask="11-11-1111" />

        <MaskedInput
          label="Birthdate"
          value={birthdateValue}
          onChange={e => setBirthdateValue(e.target.value)}
          mask="11/11/1111"
        />

        <MaskedInput
          label="Credit card"
          value={creditCardvalue}
          onChange={e => setCreditCardvalue(e.target.value)}
          mask="1111-1111-1111-1111"
        />
      </div>
    );
  },
  inputWithIcons: () => {
    const [value, setValue] = React.useState<string>('');
    const size = knobSelect('Set size', sizes as any, 'default');
    const hasDescription = boolean('Set Description', false);
    const hasCounter = boolean('Set Counter', false);
    const counterLimitWords = number('counterLimit', 10);
    const hasIconTooltip = boolean('Set Icon Tooltip', false);
    const descriptionMessage = text('Description', 'Description');
    const errorMessage = text('Error Text', 'Error');
    const hasError = boolean('Set validation state', false);
    const [isFocus, setFocus] = React.useState(false);
    const getCounter = (hasCounter: boolean): number | null => {
      if (hasCounter) {
        return counterLimitWords;
      } else {
        return null;
      }
    };
    const getDescription = (hasDescription: boolean): string => {
      if (hasDescription) {
        return descriptionMessage;
      } else {
        return '';
      }
    };

    const getErrorText = (hasError: boolean): string => {
      if (hasError) {
        return errorMessage;
      } else {
        return '';
      }
    };

    return (
      <Input
        size={size}
        placeholder={text('Placeholder', 'Placeholder')}
        label={renderLabel(text('Label', 'Label'))}
        description={descriptionMessage && getDescription(hasDescription)}
        errorText={!isFocus && getErrorText(hasError)}
        error={!isFocus && hasError}
        counterLimit={counterLimitWords && getCounter(hasCounter)}
        disabled={boolean('Disabled', false)}
        onChange={e => setValue(e.target.value)}
        onBlur={() => {
          action('I am blurred');
          setFocus(false);
        }}
        onFocus={() => {
          action('I am focused');
          setFocus(true);
        }}
        value={value}
        icon1={<Icon component={<FileM />} />}
        icon1Tooltip={hasIconTooltip && <span>icon1</span>}
        icon2={<Icon component={<FileM />} />}
        icon2Tooltip={hasIconTooltip && <span>icon2</span>}
      />
    );
  },
  inputWithPrefixAndSuffix: () => {
    const [value, setValue] = React.useState<string>('');
    const prefixType = select('Set prefix type', addonType, addonType.none);
    const prefixLabelText = text('Set prefix label text', 'Prefix');
    const suffixType = select('Set suffix type', addonType, addonType.none);
    const suffixLabelText = text('Set suffix label text', 'Suffix');

    return (
      <Input
        size={'default'}
        placeholder={text('Placeholder', 'Placeholder')}
        label={renderLabel(text('Label', 'Label'))}
        errorText={text('ErrorText', '')}
        disabled={boolean('Disabled', false)}
        onChange={e => setValue(e.target.value)}
        value={value}
        prefixel={renderAddonComponent(prefixType, prefixLabelText)}
        suffixel={renderAddonComponent(suffixType, suffixLabelText)}
      />
    );
  },
  textarea: () => {
    const [value, setValue] = React.useState<string>('');
    const errorMessage = text('Error Text', 'Error');
    const hasError = boolean('Set validation state', false);
    const [isFocus, setFocus] = React.useState(false);
    const getErrorText = (hasError: boolean): string => {
      if (hasError) {
        return errorMessage;
      } else {
        return '';
      }
    };

    return (
      <TextArea
        rows={number('rows', 4)}
        placeholder={text('Placeholder', 'Placeholder')}
        label={renderLabel(text('Label', 'Label'))}
        description={text('Description', 'Description')}
        errorText={!isFocus && getErrorText(hasError)}
        error={!isFocus && hasError}
        counterLimit={number('CounterLimit', 100)}
        disabled={boolean('Disabled', false)}
        onBlur={() => {
          action('I am blurred');
          setFocus(false);
        }}
        onFocus={() => {
          action('I am focused');
          setFocus(true);
        }}
        onChange={e => setValue(e.target.value)}
        value={value}
      />
    );
  },
  textareaWithIcons: () => {
    const [value, setValue] = React.useState<string>('');
    const errorMessage = text('Error Text', 'Error');
    const hasError = boolean('Set validation state', false);
    const [isFocus, setFocus] = React.useState(false);
    const hasIconTooltip = boolean('Set Icon Tooltip', false);
    const getErrorText = (hasError: boolean): string => {
      if (hasError) {
        return errorMessage;
      } else {
        return '';
      }
    };

    return (
      <TextArea
        rows={number('rows', 4)}
        placeholder={text('Placeholder', 'Placeholder')}
        label={renderLabel(text('Label', 'Label'))}
        description={text('Description', 'Description')}
        errorText={!isFocus && getErrorText(hasError)}
        error={!isFocus && hasError}
        counterLimit={number('CounterLimit', 10)}
        disabled={boolean('Disabled', false)}
        onChange={e => setValue(e.target.value)}
        value={value}
        onBlur={() => {
          action('I am blurred');
          setFocus(false);
        }}
        onFocus={() => {
          action('I am focused');
          setFocus(true);
        }}
        icon1={<Icon component={<FileM />} />}
        icon1Tooltip={hasIconTooltip && <span>icon1</span>}
        icon2={<Icon component={<FileM />} />}
        icon2Tooltip={hasIconTooltip && <span>icon2</span>}
      />
    );
  },

  InputMultivalue: () => {
    const values = ['Option A', 'Option B', 'Option C'];
    const errorMessage = text('Error Text', 'Error');
    const hasError = boolean('Set validation state', false);
    const [isFocus, setFocus] = React.useState(false);

    const getErrorText = (hasError: boolean): string => {
      if (hasError) {
        return errorMessage;
      } else {
        return '';
      }
    };

    return (
      <InputMultivalue
        label={renderLabel(text('Label', 'Label'))}
        description={text('Description', 'Description')}
        errorText={!isFocus && getErrorText(hasError)}
        error={!isFocus && hasError}
        disabled={boolean('Disabled', false)}
        values={values}
        maxLength={number('Value Length', 10)}
        onBlur={() => {
          action('I am blurred');
          setFocus(false);
        }}
        onFocus={() => {
          action('I am focused');
          setFocus(true);
        }}
      />
    );
  },
};

export default {
  name: 'Components/Input',
  decorator,
  stories,
  Component: Input,
};
