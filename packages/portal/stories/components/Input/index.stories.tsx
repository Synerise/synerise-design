import * as React from 'react';
import {
  Input,
  TextArea,
  RawInput,
  InputGroup,
  MaskedInput,
  InputMultivalue,
  RawMaskedInput,
} from '@synerise/ds-input';

import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import Select from '@synerise/ds-select';
import { array, boolean, number, select, select as knobSelect, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import * as S from '../Select/stories.styles';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { LaptopM, SearchM } from '@synerise/ds-icon/dist/icons';
import { TagShape } from '@synerise/ds-tags';
import DSFlag from '@synerise/ds-flag';
import { FlagContainer } from './stories.styles';
import Tooltip from '@synerise/ds-tooltip';
import InputNumber from '@synerise/ds-input-number';
import {escapeRegEx, useOnClickOutside } from '@synerise/ds-utils';
import './index.css';
import { getAllElementsFiltered } from '@synerise/ds-search/dist/Elements/utils/searchUtils';
import SearchBar from '@synerise/ds-search-bar';
import { SelectValue } from 'antd/es/select';

const renderWithHighlightedText = (highlight, item): React.ReactNode => {
  if (highlight && typeof item === 'string') {
    const index = item.toLowerCase().indexOf(highlight.toLowerCase());
    if (index === -1) {
      return item;
    }
    const escapedHighlight = escapeRegEx(highlight);
    const startOfQuery = item.toLowerCase().search(escapedHighlight.toLowerCase());
    const endOfQuery = startOfQuery + highlight.length;
    const resultArray = [
      <span style={{whiteSpace: 'pre-wrap'}}>{item.substring(0, startOfQuery)}</span>,
      <span key={item} style={{ fontWeight: 600, whiteSpace: 'pre-wrap' }} className="search-highlight">
        {item.substring(startOfQuery, endOfQuery)}
      </span>,
      <span style={{whiteSpace: 'pre-wrap'}}>{item.substring(endOfQuery, item.length)}</span>,
    ];
    return resultArray;
  }
  return item;
};


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
    const [value, setValue] = React.useState<string>('');
    const [dropdownVisible, setDropdownVisible] = React.useState(false);
    const inputOptionMask = {"---- ----": "1111-1111", "--- --- ---": "111-111-111"};
    const dateMask = knobSelect("SelectDateMask",Object.keys(inputOptionMask),"--- --- ---");
    React.useEffect(() => {setValue("")},[dateMask]);
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const countries = [
      { name: 'Argentina +123', code: 'AR', prefix: '+123' },
      { name: 'Albania +456', code: 'Al', prefix: '+456' },
      { name: 'Austria +78', code: 'AT', prefix: '+78' },
      { name: 'Brazil +123', code: 'BR', prefix: '+123' },
    ];
    const [results, setResults] = React.useState<Country[]>(countries);
    const ref = React.useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => {
      setDropdownVisible(false);
    });
    const renderPrefix = (country: Country) => (<div style={{ display: 'flex' }}>
      <FlagContainer style={{ paddingRight: '8px', paddingTop: '2px' }}>
        <DSFlag country={country.code} size={20} />
      </FlagContainer>
      {country.prefix}
    </div>)
    const [prefix, setPrefix] = React.useState(renderPrefix(countries[3]));
    type Country = { name: string; code: string; prefix: string };
    const phoneNumberSelect = (
      <Select
        onChange={countryCode => {
          const selectedCountry = results.find(result => result.code === countryCode);
          setPrefix(renderPrefix(selectedCountry))
        }}
        dropdownStyle={{ width: '300px' }}
        style={{ width: '107px' }}
        dropdownClassName="dropdownWidth"
        size={size}
        dropdownRender={menu => (
          <div style={{ width: '240px', paddingTop: '0px' }}>
            {' '}
            <SearchBar
              onSearchChange={value => {
                setSearchQuery(value);
                setResults(getAllElementsFiltered(countries as object[], value, 'name') as Country[]);
              }}
              placeholder="Search"
              value={searchQuery}
              onClearInput={(): void => {
                setSearchQuery('');
                setResults(getAllElementsFiltered(countries as object[], '', 'name') as Country[]);
              }}
              iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
              autofocus
            />{' '}
            <div style={{ padding: '8px 8px 0', alignItems: 'center', justifyContent: 'center' }}>{menu}</div>
          </div>
        )}
        value={prefix as unknown as SelectValue}
        error={boolean('Set select error', false)}
        onClick={(): void => setDropdownVisible(!dropdownVisible)}
      >
        {results.map(country => (
          <Select.Option key={country.code}>
            <div style={{ display: 'flex', fontWeight: !!searchQuery ? 400 : 500 }}>
              <FlagContainer style={{ paddingRight: '12px' }}>
                <DSFlag country={country.code} size={20} />
              </FlagContainer>
              {renderWithHighlightedText(searchQuery, country.name)}
            </div>
          </Select.Option>
        ))}
      </Select>
    );
    const inputMask = (
      <RawMaskedInput
        size={size}
        disabled={boolean('Disabled', false)}
        onChange={e => setValue(e.target.value)}
        value={value}
        error={boolean('Set input error', false)}
        style={{ width: '45%' }}
        mask={inputOptionMask[dateMask]}
      />
    );
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
    const inputGroupElementsLeft = {
      Input: input,
      InputNumber: inputNumber,
      Button: select,
      Select: whiteSelect,
      WithNumberPhonePreffix: phoneNumberSelect,
    };
    const inputGroupElementsRight = {
      Input: input,
      InputNumber: inputNumber,
      Button: select,
      Select: whiteSelect,
      InputWithMask: inputMask,
    };
    const leftSideComponent = knobSelect(
      'Set left-side component',
      Object.keys(inputGroupElementsLeft),
      Object.keys(inputGroupElementsLeft)[2]
    );
    const rightSideComponent = knobSelect(
      'Set right-side component',
      Object.keys(inputGroupElementsRight),
      Object.keys(inputGroupElementsRight)[0]
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
        {inputGroupElementsLeft[leftSideComponent]}
        {inputGroupElementsRight[rightSideComponent]}
      </InputGroup>
    );
  },
  withFlags: () => {
    const [value, setValue] = React.useState<string>('');
    const size = knobSelect('Set size', sizes as any, 'default');
    const [dropdownVisible, setDropdownVisible] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const inputOptionMask = {"---- ----": "1111-1111", "--- --- ---": "111-111-111"};
    const dateMask = knobSelect("SelectDateMask",Object.keys(inputOptionMask),"--- --- ---");
    React.useEffect(() => {setValue("")},[dateMask]);
    const countries = [
      { name: 'Argentina +123', code: 'AR', prefix: '+123' },
      { name: 'Albania +456', code: 'Al', prefix: '+456' },
      { name: 'Austria +78', code: 'AT', prefix: '+78' },
      { name: 'Brazil +123', code: 'BR', prefix: '+123' },
    ];
    const [results, setResults] = React.useState<Country[]>(countries);
    const ref = React.useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => {
      setDropdownVisible(false);
    });
    const renderPrefix = (country: Country) => (<div style={{ display: 'flex' }}>
      <FlagContainer style={{ paddingRight: '8px', paddingTop: '2px' }}>
        <DSFlag country={country.code} size={20} />
      </FlagContainer>
      {country.prefix}
    </div>)
    const [prefix, setPrefix] = React.useState(renderPrefix(countries[3]));
    type Country = { name: string; code: string; prefix: string };


    const phoneNumberSelect = (
      <Select
        onChange={countryCode => {
          const selectedCountry = results.find(result => result.code === countryCode);
          setPrefix(renderPrefix(selectedCountry))
        }}
        dropdownStyle={{ width: '300px' }}
        style={{ width: '107px' }}
        dropdownClassName="dropdownWidth"
        size={size}
        dropdownRender={menu => (
          <div style={{ width: '240px', paddingTop: '0px' }}>
            {' '}
            <SearchBar
              onSearchChange={value => {
                setSearchQuery(value);
                setResults(getAllElementsFiltered(countries as object[], value, 'name') as Country[]);
              }}
              placeholder="Search"
              value={searchQuery}
              onClearInput={(): void => {
                setSearchQuery('');
                setResults(getAllElementsFiltered(countries as object[], '', 'name') as Country[]);
              }}
              iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
              autofocus
            />{' '}
            <div style={{ padding: '8px 8px 0', alignItems: 'center', justifyContent: 'center' }}>{menu}</div>
          </div>
        )}
        value={prefix as unknown as SelectValue}
        error={boolean('Set select error', false)}
        onClick={(): void => setDropdownVisible(!dropdownVisible)}
      >
        {results.map(country => (
          <Select.Option key={country.code}>
            <div style={{ display: 'flex', fontWeight: !!searchQuery ? 400 : 500 }}>
              <FlagContainer style={{ paddingRight: '12px' }}>
                <DSFlag country={country.code} size={20} />
              </FlagContainer>
              {renderWithHighlightedText(searchQuery, country.name)}
            </div>
          </Select.Option>
        ))}
      </Select>
    );


    const inputMask = (
      <RawMaskedInput
        disabled={boolean('Disabled', false)}
        onChange={e => setValue(e.target.value)}
        size={size}
        value={value}
        error={boolean('Set input error', false)}
        style={{ width: '45%' }}
        mask={inputOptionMask[dateMask]}
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
        {phoneNumberSelect}
        {inputMask}
      </InputGroup>
    );
  },
  inputWithMask: () => {
    const [creditCardvalue, setCreditCardvalue] = React.useState<string>('');
    const [dateValue, setDateValue] = React.useState<string>('');
    const [birthdateValue, setBirthdateValue] = React.useState<string>('');
    const [phoneValue, setPhoneValue] = React.useState<string>('');
    const [phonePrefixValue, setPhonePrefixValue] = React.useState<string>('');
    const [passwordValue, setPasswordValue] = React.useState<string>('');
    const [zipCardValue, setZipCardValue] = React.useState<string>('');
    const inputOptionMask = {
      "DD-MM-YYYY": "11-11-1111",
      "DD-MM-YYYY h:mm A": "11-11-1111 1:11 PM",
      "DD-MM-YYYY H:mm" : "11-11-1111 11:11" ,
      "MM-DD-YYYY" : "11-11-1111",
      'MM-DD-YYYY h:mm A' : "11-11-1111 1:11 PM",
      "MM-DD-YYYY H:mm" : "11-11-1111 11:11" ,
      "D MMMM, YYYY" : "11 1111, 1111" ,
      "D MMMM, YYYY h:mm A" : "11 1111, 1111, 1:11 PM",
      "D MMMM, YYYY H:mm" : "11 1111, 1111, 11:11",
      "MMMM D, YYYY" : "1111 11, 1111" ,
      "MMMM D, YYYY h:mm A": "1111 11, 1111 1:11 PM",
      "MMMM D, YYYY H:mm": "1111 11, 1111 11:11 ",
      "ddd, MMMM D, YYYY h:mm A": "111, 1111 11, 1111 1:11 PM",
      "ddd, MMMM D, YYYY H:mm" : "111, 1111 11, 1111 11:11",

    };
    const dateMask = select("SelectDateMask",Object.keys(inputOptionMask),"DD-MM-YYYY")
    React.useEffect(() => {setDateValue("")},[dateMask]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: 400 }}>
        <Input
          label="Password"
          value={passwordValue}
          onChange={e => setPasswordValue(e.target.value)}
          type="password"
          placeholder="Placeholder"
        />

        <MaskedInput
          label="Phone number"
          value={phoneValue}
          onChange={e => setPhoneValue(e.target.value)}
          mask="(+11) 111-111-111"
        />

        <MaskedInput
          label="Phone number with prefix"
          value={phonePrefixValue}
          onChange={e => setPhonePrefixValue(e.target.value)}
          mask="(+11) 1111-1111"
        />

        <MaskedInput label="Date" value={dateValue} onChange={e => setDateValue(e.target.value)} mask={inputOptionMask[dateMask]} />

        <MaskedInput
          label="Birthdate"
          value={birthdateValue}
          onChange={e => setBirthdateValue(e.target.value)}
          mask="11-11-1111"
        />

        <MaskedInput
          label="Credit card"
          value={creditCardvalue}
          onChange={e => setCreditCardvalue(e.target.value)}
          mask="1111-1111-1111-1111"
        />
        <MaskedInput
          label="Zip-code"
          value={zipCardValue}
          onChange={e => setZipCardValue(e.target.value)}
          mask="11-111"
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
