import * as React from 'react';
import { Input, TextArea, RawInput, InputGroup, MaskedInput } from '@synerise/ds-input';

import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import Select from '@synerise/ds-select';
import { array, boolean, number, select as knobSelect, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

const decorator = storyFn => <div style={{ width: '300px' }}>{storyFn()}</div>;
const sizes = ['default', 'large'];
const getErrorText = (error: boolean, errorText: string): string => {
  if (error) {
    return errorText;
  } else {
    return '';
  }
};

const stories = {
  default: () => {
    const [value, setValue] = React.useState<string>('');
    const validationState = boolean('Set validation state', false);
    const message = text('Error Text', 'Error');
    const [isFocus, setFocus] = React.useState(false);

    return (
      <Input
        tooltip={text('tooltip', 'This is example tooltip!')}
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={!isFocus && getErrorText(validationState, message)}
        counterLimit={number('counterLimit', 10)}
        error={!isFocus && validationState}
        disabled={boolean('disabled', false)}
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
      />
    );
  },
  inputGroup: () => {
    const [value, setValue] = React.useState<string>('');
    const size = knobSelect('Set size', sizes as any, 'default');

    const select = (
      <Select
        size={size}
        tooltip={text('tooltip', 'This is example tooltip!')}
        onChange={action('OnChange')}
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
        placeholder={text('placeholder', 'Placeholder')}
        disabled={boolean('disabled', false)}
        onChange={e => setValue(e.target.value)}
        value={value}
        error={boolean('Set input error', false)}
        style={{ width: '50%' }}
      />
    );

    return (
      <InputGroup
        size={size}
        tooltip={text('tooltip', 'This is example tooltip!')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errors={array('errors', ['First error', 'Second error'])}
        resetMargin={boolean('resetMargin', false)}
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
          return counterLimitWords ;
        } else {
          return null;
        }}
    const getDescription = (hasDescription: boolean): string => {
      if (hasDescription) {
        return descriptionMessage ;
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
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={descriptionMessage && getDescription(hasDescription)}
        errorText={!isFocus && getErrorText(hasError)}
        error={!isFocus && hasError}
        counterLimit={counterLimitWords && getCounter(hasCounter)}
        disabled={boolean('disabled', false)}
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
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={!isFocus && getErrorText(hasError)}
        error={!isFocus && hasError}
        counterLimit={number('counterLimit', 10)}
        disabled={boolean('disabled', false)}
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
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={!isFocus && getErrorText(hasError)}
        error={!isFocus && hasError}
        counterLimit={number('counterLimit', 10)}
        disabled={boolean('disabled', false)}
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
};

export default {
  name: 'Components|Input',
  decorator,
  stories,
  Component: Input,
};
