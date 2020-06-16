import * as React from 'react';
import { Input, TextArea, RawInput, InputGroup, MaskedInput } from '@synerise/ds-input';

import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import Select from '@synerise/ds-select';
import { array, boolean, number, select, select as knobSelect, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { FlagLabelCell } from '@synerise/ds-table/dist/Cell';
import * as S from '../Select/stories.styles';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { LaptopM } from '@synerise/ds-icon/dist/icons';
import { TagShape } from '@synerise/ds-tags';

const decorator = storyFn => <div style={{ width: '300px' }}>{storyFn()}</div>;
const sizes = ['default', 'large'];
const addonType = {
  icon: 'icon',
  tag: 'tag',
  avatar: 'avatar',
  label: 'label',
  none: 'none',
};

function renderAddonComponent(suffixElementType: string) {
  switch (suffixElementType) {
    case addonType.icon:
      return (
        <S.IconWrapper>
          <Icon color={theme.palette['grey-600']} component={<LaptopM />} />
        </S.IconWrapper>
      );
    case addonType.label:
      return <S.Label>Label</S.Label>;
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
  basic: () => {
    const [value, setValue] = React.useState<string>('');

    return (
      <Input
        tooltip={text('tooltip', 'This is example tooltip!')}
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={text('errorText', 'Error message')}
        counterLimit={number('counterLimit', 10)}
        disabled={boolean('disabled', false)}
        onChange={e => setValue(e.target.value)}
        value={value}
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
        errors={array('errors', [])}
        resetMargin={boolean('resetMargin', false)}
        compact
      >
        {select}
        {input}
      </InputGroup>
    );
  },
  withFlags: () => {
    const [value, setValue] = React.useState<string>('');
    const size = knobSelect('Set size', sizes as any, 'default');

    const select = (
      <Select
        size={size}
        tooltip={text('tooltip', 'This is example tooltip!')}
        onChange={action('OnChange')}
        style={{ width: '120px' }}
        defaultValue="es"
        error={boolean('Set select error', false)}
      >
        <Select.Option value="es">
          <FlagLabelCell countryCode={'ES'} label={'+34'} />
        </Select.Option>
        <Select.Option value="pl">
          <FlagLabelCell countryCode={'PL'} label={'+48'} />
        </Select.Option>{' '}
        <Select.Option value="gb">
          <FlagLabelCell countryCode={'GB'} label={'+44'} />
        </Select.Option>
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
        errors={array('errors', [])}
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

    return (
      <Input
        size={'large'}
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={text('errorText', 'Error message')}
        counterLimit={number('counterLimit', 10)}
        disabled={boolean('disabled', false)}
        onChange={e => setValue(e.target.value)}
        value={value}
        icon1={<Icon component={<FileM />} />}
        icon2={<Icon component={<FileM />} />}
      />
    );
  },
  inputWithPrefix: () => {
    const [value, setValue] = React.useState<string>('');

    const suffixType = select('Set suffix type', addonType, addonType.none);
    const prefixType = select('Set prefix type', addonType, addonType.none);
    return (
      <Input
        size={'default'}
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        errorText={text('errorText', '')}
        disabled={boolean('disabled', false)}
        onChange={e => setValue(e.target.value)}
        value={value}
        prefixel={renderAddonComponent(prefixType)}
        suffixel={renderAddonComponent(suffixType)}
      />
    );
  },
  textarea: () => {
    const [value, setValue] = React.useState<string>('');

    return (
      <TextArea
        rows={number('rows', 4)}
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={text('errorText', 'Error message')}
        counterLimit={number('counterLimit', 10)}
        disabled={boolean('disabled', false)}
        onChange={e => setValue(e.target.value)}
        value={value}
      />
    );
  },
  textareaWithIcons: () => {
    const [value, setValue] = React.useState<string>('');

    return (
      <TextArea
        rows={number('rows', 4)}
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={text('errorText', 'Error message')}
        counterLimit={number('counterLimit', 10)}
        disabled={boolean('disabled', false)}
        onChange={e => setValue(e.target.value)}
        value={value}
        icon1={<Icon component={<FileM />} />}
        icon2={<Icon component={<FileM />} />}
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
