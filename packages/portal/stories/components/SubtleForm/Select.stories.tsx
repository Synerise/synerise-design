import * as React from 'react';
import SubtleForm from '@synerise/ds-subtle-form';
import Select from '@synerise/ds-select';
import { Cities, Countries as CountriesArray, Statuses } from './dataset';
import { boolean, text } from '@storybook/addon-knobs';
import { FlagContainer } from '../Input/stories.styles';
import DSFlag from '@synerise/ds-flag';
import Status from '@synerise/ds-status';
import { StatusProps } from '@synerise/ds-status/dist/Status.types';
import { SelectValue } from 'antd/es/select';
import styled from 'styled-components';
import { CheckM, CheckS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Menu from '@synerise/ds-menu';
const decorator = storyFn => <div style={{ width: '314px', padding: '16px', background: '#fff' }}>{storyFn()}</div>;

export const renderLabel = (text: string, icon?: React.ReactNode) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};

const StatusWrapper = styled.div<{ flex?: boolean }>`
  ${props =>
    props.flex &&
    `display: flex;
  justify-content: space-between;
  align-items: center;`}
  .ds-status {
    margin: 0;
  }
`;

const renderStatusOption = (status: StatusProps, checked?: boolean) => (
  <StatusWrapper flex>
    <Status {...status} />
    {checked && <Icon component={<CheckS />} color={theme.palette['green-600']} />}
  </StatusWrapper>
);

const renderSelectedStatus = (status: StatusProps) => (
  <StatusWrapper>
    <Status {...status} />
  </StatusWrapper>
);
export const getErrorText = (error: boolean, errorText: string): string => {
  if (error) {
    return errorText;
  } else {
    return '';
  }
};
const renderPrefix = (country: any) => (
  <div style={{ display: 'flex' }}>
    <FlagContainer style={{ paddingRight: '8px', paddingTop: '2px' }}>
      <DSFlag country={country.code} size={20} />
    </FlagContainer>
    {country.name}
  </div>
);

const stories = {
  default: () => {
    const [value, setValue] = React.useState<string>();
    const validationState = boolean('Set validation state', false);
    const errorMessage = text('Error Text', 'Error');
    const disabled = boolean('Set disabled', false);
    return (
      <div style={{ marginBottom: '16px', height: '57px' }}>
        <SubtleForm.Select
          disabled={disabled}
          onChange={val => setValue(val)}
          value={value}
          placeholder={'Status'}
          label={renderLabel('Status')}
          labelTooltip={'Status'}
          suffixTooltip={'Select'}
          error={validationState}
          errorText={getErrorText(validationState, errorMessage)}
        >
          {Cities.map(c => (
            <Select.Option value={c}>{c}</Select.Option>
          ))}
        </SubtleForm.Select>
      </div>
    );
  },
  countries: () => {
    const [value, setValue] = React.useState<React.ReactNode | undefined>();
    const [selectedCountryCode, setSelectedCountryCode] = React.useState<string | undefined>();
    const validationState = boolean('Set validation state', false);
    const errorMessage = text('Error Text', 'Error');
    const disabled = boolean('Set disabled', false);
    return (
      <div style={{ marginBottom: '16px', height: '57px' }}>
        <SubtleForm.Select
          disabled={disabled}
          onChange={countryCode => {
            const selectedCountry = CountriesArray.find(result => result.code === countryCode);
            setValue(renderPrefix(selectedCountry));
            setSelectedCountryCode(countryCode);
          }}
          value={value as SelectValue}
          placeholder={'Country'}
          label={renderLabel('Country')}
          labelTooltip={'Country'}
          suffixTooltip={'Select'}
          error={validationState}
          errorText={getErrorText(validationState, errorMessage)}
        >
          {CountriesArray.map(country => (
            <Select.Option value={country.code} key={country.code}>
              <div style={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
                <FlagContainer style={{ paddingRight: '12px' }}>
                  <DSFlag country={country.code} size={20} />
                </FlagContainer>
                <div style={{ display: 'flex', flex: '1' }}>{country.name}</div>
                {selectedCountryCode === country.code && (
                  <Icon component={<CheckS />} color={theme.palette['green-600']} />
                )}
              </div>
            </Select.Option>
          ))}
        </SubtleForm.Select>
      </div>
    );
  },
  statuses: () => {
    const [value, setValue] = React.useState<React.ReactNode | undefined>();
    const [statusLabel, setStatusLabel] = React.useState<string | undefined>();
    const validationState = boolean('Set validation state', false);
    const errorMessage = text('Error Text', 'Error');
    const disabled = boolean('Set disabled', false);
    return (
      <div style={{ marginBottom: '16px', height: '57px' }}>
        <SubtleForm.Select
          disabled={disabled}
          onChange={label => {
            const selectedStatus = Statuses.find(s => s.label === label);
            setValue(renderSelectedStatus(selectedStatus));
            setStatusLabel(label);
          }}
          value={value as SelectValue}
          placeholder={'Status'}
          label={renderLabel('Status')}
          labelTooltip={'Status'}
          suffixTooltip={'Select'}
          error={validationState}
          options={Statuses.map(status => ({
            label: renderStatusOption(status, statusLabel === status.label),
            value: status.label,
          }))}
          errorText={getErrorText(validationState, errorMessage)}
        ></SubtleForm.Select>
      </div>
    );
  },
};

export default {
  name: 'Components/SubtleForm/Select',
  config: {},
  stories,
  decorator,
};
