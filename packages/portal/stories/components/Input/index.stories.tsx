import React, { useState, useRef, useEffect } from 'react';
import {
  Input,
  TextArea,
  RawInput,
  InputGroup,
  InputMultivalue,
  AutoResizeProp,
} from '@synerise/ds-input';

import Icon, { FileM, LaptopM, SearchM } from '@synerise/ds-icon';
import Select from '@synerise/ds-select';
import { array, boolean, number, select, select as knobSelect, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import * as S from '../Select/stories.styles';
import { theme } from '@synerise/ds-core';
import { TagShape } from '@synerise/ds-tags';
import DSFlag from '@synerise/ds-flag';
import { FlagContainer } from './stories.styles';
import Tooltip from '@synerise/ds-tooltip';
import InputNumber from '@synerise/ds-input-number';
import { escapeRegEx, useOnClickOutside } from '@synerise/ds-utils';
import './index.css';
import { getAllElementsFiltered } from '@synerise/ds-search/dist/Elements/utils/searchUtils';
import SearchBar from '@synerise/ds-search-bar';
import { SelectValue } from 'antd/es/select';
import Result from '@synerise/ds-result';
import { Modal } from '../Modal/withHeaders/withHeaders.styles';

const renderWithHighlightedText = (highlight, item) => {
  if (highlight && typeof item === 'string') {
    const index = item.toLowerCase().indexOf(highlight.toLowerCase());
    if (index === -1) {
      return item;
    }
    const escapedHighlight = escapeRegEx(highlight);
    const startOfQuery = item.toLowerCase().search(escapedHighlight.toLowerCase());
    const endOfQuery = startOfQuery + highlight.length;
    const resultArray = [
      <span style={{ whiteSpace: 'pre-wrap' }}>{item.substring(0, startOfQuery)}</span>,
      <span key={item} style={{ fontWeight: 600, whiteSpace: 'pre-wrap' }} className="search-highlight">
        {item.substring(startOfQuery, endOfQuery)}
      </span>,
      <span style={{ whiteSpace: 'pre-wrap' }}>{item.substring(endOfQuery, item.length)}</span>,
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
      return <S.AvatarWithMargin size="small" text="AK" backgroundColor="green" />;
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
    const [value, setValue] = useState<string>('');
    const validationState = boolean('Set validation state', false);
    const message = text('Error Text', 'Error');
    const [isFocus, setFocus] = useState(false);
    const size = knobSelect('Set size', sizes as any, 'default');
    const readOnly = boolean('Read only', false);
    const autoResize = boolean('Set autoResize', true);
    return (
      <Input
        tooltipConfig={{
          description: text('Tooltip description', 'This is example description'),
          type: select('Tooltip type', ['header-label', 'default', 'largeSimple'], 'header-label'),
          title: text('Tooltip title', 'This is example tooltip!'),
        }}
        autoResize={
          autoResize
            ? {
                maxWidth: `${number('Set autoResize max width', 300)}px`,
                minWidth: `${number('Set autoResize min width', 150)}px`,
              }
            : undefined
        }
        placeholder={text('Placeholder', 'Placeholder')}
        label={text('Label', 'Label')}
        description={text('Description', 'Description')}
        errorText={!isFocus && getErrorText(validationState, message)}
        counterLimit={number('CounterLimit', 50)}
        error={!isFocus && validationState}
        disabled={boolean('Disabled', false)}
        onChange={e => setValue(e.target.value)}
        value={value}
        readOnly={readOnly}
        size={size}
        onBlur={() => {
          action('I am blurred');
          setFocus(false);
        }}
        onFocus={() => {
          action('I am focused');
          setFocus(true);
        }}
        expandableTooltip="Expand"
        expandable={boolean('Set expandable', true)}
      />
    );
  },
  inputGroup: () => {
    const [dateMaskKey, setDateMaskKey] = useState<string>('---- ----');
    const size = knobSelect('Set size', sizes as any, 'default');
    const [value, setValue] = useState<string>('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const inputOptionMask = { '---- ----': '1111-1111', '--- --- ---': '111-111-111' };
    const [searchQuery, setSearchQuery] = useState<string>('');
    const countries = [
      { name: 'Argentina +123', code: 'AR', prefix: '+123' },
      { name: 'Albania +456', code: 'Al', prefix: '+456' },
      { name: 'Austria +78', code: 'AT', prefix: '+78' },
      { name: 'Brazil +123', code: 'BR', prefix: '+123' },
    ];
    const [results, setResults] = useState<Country[]>(countries);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => {
      setDropdownVisible(false);
    });
    const renderPrefix = (country: Country) => (
      <div style={{ display: 'flex' }}>
        <FlagContainer style={{ paddingRight: '8px', paddingTop: '2px' }}>
          <DSFlag country={country.code} size={20} />
        </FlagContainer>
        {country.prefix}
      </div>
    );
    const [prefix, setPrefix] = useState(renderPrefix(countries[3]));
    type Country = { name: string; code: string; prefix: string };
    const phoneNumberSelect = (
      <Select
        onChange={countryCode => {
          const selectedCountry = results.find(result => result.code === countryCode);
          setPrefix(renderPrefix(selectedCountry));
        }}
        dropdownStyle={{ width: '300px' }}
        style={{ width: '107px' }}
        dropdownClassName="dropdownWidth"
        size={size}
        notFoundContent={<Result type="no-results" noSearchResults description={'No results'} />}
        dropdownRender={menu => (
          <div style={{ width: '240px' }}>
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
            <div style={{ padding: '8px', alignItems: 'center', justifyContent: 'center' }}>{menu}</div>
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
    
    const select = (
      <Select
        size={size}
        tooltip={text('Tooltip', 'This is example tooltip!')}
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
      />
    );
    const inputNumber = (
      <InputNumber
        size={size}
        placeholder={text('Placeholder', 'Placeholder')}
        disabled={boolean('Disabled', false)}
        error={boolean('Set input error', false)}
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
    const dateMask = knobSelect('SelectDateMask', Object.keys(inputOptionMask), '--- --- ---');
    useEffect(() => {
      setValue('');
      if (dateMask !== dateMaskKey) {
        setDateMaskKey(dateMask);
      }
    }, [dateMask, dateMaskKey]);
    return (
      <InputGroup
        size={size}
        tooltip={text('Tooltip', 'This is example tooltip!')}
        label={text('Label', 'Label')}
        description={text('Description', 'Description')}
        errors={array('Errors', [])}
        resetMargin={boolean('ResetMargin', false)}
        compact={boolean('Compact layout', false)}
      >
        {inputGroupElementsLeft[leftSideComponent]}
        {inputGroupElementsRight[rightSideComponent]}
      </InputGroup>
    );
  },
  
  inputWithIcons: () => {
    const [value, setValue] = useState<string>('');
    const size = knobSelect('Set size', sizes as any, 'default');
    const hasDescription = boolean('Set Description', false);
    const hasCounter = boolean('Set Counter', false);
    const counterLimitWords = number('counterLimit', 10);
    const hasIconTooltip = boolean('Set Icon Tooltip', false);
    const descriptionMessage = text('Description', 'Description');
    const errorMessage = text('Error Text', 'Error');
    const hasError = boolean('Set validation state', false);
    const [isFocus, setFocus] = useState(false);
    const getCounter = (hasCounter: boolean) => {
      if (hasCounter) {
        return counterLimitWords;
      } else {
        return undefined;
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
        label={text('Label', 'Label')}
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
        icon1Tooltip={hasIconTooltip ? <span>icon1</span> : undefined}
        icon2={<Icon component={<FileM />} />}
        icon2Tooltip={hasIconTooltip ? <span>icon2</span> : undefined}
        expandableTooltip="Expand"
        expandable={boolean('Set expandable', true)}
      />
    );
  },
  inputAutoresizeInModal: () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string>('');
    const hasDescription = boolean('Set Description', true);
    const descriptionMessage = text('Description', 'Description');
    const errorMessage = text('Error Text', 'Error');
    const hasError = boolean('Set validation state', false);
    const [isFocus, setFocus] = useState(false);
    const autoResize = boolean('Set autoResize', true);
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
      <div>
        <Modal
          size="small"
          visible={true}
          title={'Title'}
          bodyStyle={{ padding: '20px 180px' }}
          onCancel={() => setOpen(!open)}
          onOk={() => setOpen(open)}
        >
          <Input
            autoResize={
              autoResize
                ? {
                    maxWidth: `${number('Set autoResize max width', 1000)}px`,
                    minWidth: `${number('Set autoResize min width', 150)}px`,
                  }
                : undefined
            }
            placeholder={text('Placeholder', 'Placeholder')}
            label={text('Label', 'Label')}
            description={descriptionMessage && getDescription(hasDescription)}
            errorText={!isFocus && getErrorText(hasError)}
            error={!isFocus && hasError}
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
            expandableTooltip="Expand"
            expandable={boolean('Set expandable', true)}
          />
        </Modal>
      </div>
    );
  },
  inputWithAutoresize: () => {
    const [value, setValue] = useState<string>('');
    const hasDescription = boolean('Set Description', true);
    const descriptionMessage = text('Description', 'Description');
    const errorMessage = text('Error Text', 'Error');
    const hasError = boolean('Set validation state', false);
    const [isFocus, setFocus] = useState(false);

    let containerWidth = 0;
    const autoResize = boolean('Set autoResize', true, 'autoresize');
    const autoResizeStretchToParent = boolean('Set autoResize max width to stretch to parent', true, 'autoresize');
    const autoResizeProp: AutoResizeProp = {
      minWidth: `${number('Set autoResize min width', 150, undefined, 'autoresize')}px`,
      stretchToFit: autoResizeStretchToParent,
    };
    if (autoResizeStretchToParent) {
      containerWidth = number('Set input container width', 400, undefined, 'autoresize');
    } else {
      const maxWidth = number('Set autoResize max width', 300, undefined, 'autoresize');
      autoResizeProp.maxWidth = maxWidth !== 0 ? `${maxWidth}px` : undefined;
    }
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
    const hasIconTooltip = boolean('Set Icon Tooltip', false);

    return (
      <div style={containerWidth ? { width: `${containerWidth}px`, border: 'dashed 1px #ddd' } : undefined}>
        <Input
          autoResize={autoResize ? autoResizeProp : undefined}
          placeholder={text('Placeholder', 'Placeholder')}
          label={text('Label', 'Label')}
          description={descriptionMessage && getDescription(hasDescription)}
          errorText={!isFocus && getErrorText(hasError)}
          error={!isFocus && hasError}
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
          expandableTooltip="Expand"
          expandable={boolean('Set expandable', true)}
          value={value}
          icon1={<Icon component={<FileM />} />}
          icon1Tooltip={hasIconTooltip ? <span>icon1</span> : undefined}
          icon2={<Icon component={<FileM />} />}
          icon2Tooltip={hasIconTooltip ? <span>icon2</span> : undefined}
        />
      </div>
    );
  },

  inputWithPrefixAndSuffix: () => {
    const [value, setValue] = useState<string>('');
    const prefixType = select('Set prefix type', addonType, addonType.avatar);
    const prefixLabelText = text('Set prefix label text', 'Prefix');
    const suffixType = select('Set suffix type', addonType, addonType.label);
    const suffixLabelText = text('Set suffix label text', 'Suffix');

    return (
      <Input
        size={'default'}
        placeholder={text('Placeholder', 'Placeholder')}
        label={text('Label', 'Label')}
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
    const [value, setValue] = useState<string>('');
    const errorMessage = text('Error Text', 'Error');
    const hasError = boolean('Set validation state', false);
    const minRows = number('Min rows', 3);
    const maxRows = number('Max rows', 6);
    const [isFocus, setFocus] = useState(false);
    const getErrorText = (hasError: boolean): string => {
      if (hasError) {
        return errorMessage;
      } else {
        return '';
      }
    };

    return (
      <TextArea
        autoSize={{ minRows, maxRows }}
        rows={number('rows', 4)}
        placeholder={text('Placeholder', 'Placeholder')}
        label={text('Label', 'Label')}
        description={text('Description', 'Description')}
        errorText={!isFocus && getErrorText(hasError)}
        error={!isFocus && hasError}
        counterLimit={number('CounterLimit', 100)}
        disabled={boolean('Disabled', false)}
        readOnly={boolean('ReadOnly', false)}
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
    const [value, setValue] = useState<string>('');
    const errorMessage = text('Error Text', 'Error');
    const hasError = boolean('Set validation state', false);
    const [isFocus, setFocus] = useState(false);
    const hasIcons = boolean('With icons', false);
    const hasIconTooltip = hasIcons && boolean('Set Icon Tooltip', false);
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
        label={text('Label', 'Label')}
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
        icon1={hasIcons ? <Icon component={<FileM />} /> : undefined}
        icon1Tooltip={hasIconTooltip ? <span>icon1</span> : undefined}
        icon2={hasIcons ? <Icon component={<FileM />} /> : undefined}
        icon2Tooltip={hasIconTooltip ? <span>icon2</span> : undefined}
      />
    );
  },

  InputMultivalue: () => {
    const values = ['Option A', 'Option B', 'Option C'];
    const errorMessage = text('Error Text', 'Error');
    const hasError = boolean('Set validation state', false);
    const [isFocus, setFocus] = useState(false);

    const getErrorText = (hasError: boolean): string => {
      if (hasError) {
        return errorMessage;
      } else {
        return '';
      }
    };

    return (
      <InputMultivalue
        label={text('Label', 'Label')}
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
        onChange={values => {
          action(JSON.stringify({ type: 'onChange', values }));
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
