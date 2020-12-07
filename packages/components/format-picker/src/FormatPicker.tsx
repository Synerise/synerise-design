import * as React from 'react';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import { useIntl } from 'react-intl';
import Icon from '@synerise/ds-icon';
import { HashM } from '@synerise/ds-icon/dist/icons';
import { FormatPickerProps } from './FomartPicker.types';
import FormatSettings from './FormatSettings/FormatSettings';
import { valueFormatter } from './utils/valueFormatter';

const FormatPicker: React.FC<FormatPickerProps> = ({
  onUseSeparatorChange,
  onFixedLengthChange,
  onDataFormatChange,
  onCurrencyChange,
  onCompactNumbersChange,
  onSetDefault,
  value,
  header,
  format,
}) => {
  const intl = useIntl();
  return (
    <Dropdown
      trigger={['click']}
      overlay={
        <FormatSettings
          onCurrencyChange={onCurrencyChange}
          onFixedLengthChange={onFixedLengthChange}
          onDataFormatChange={onDataFormatChange}
          onCompactNumbersChange={onCompactNumbersChange}
          onUseSeparatorChange={onUseSeparatorChange}
          onSetDefault={onSetDefault}
          header={header}
          format={format}
          value={value}
        />
      }
      placement="topCenter"
    >
      <Button type="tertiary" mode="icon-label">
        <Icon component={<HashM />} />
        {`Format ${valueFormatter({ value, formatting: format, intl })}`}
      </Button>
    </Dropdown>
  );
};
export default FormatPicker;
