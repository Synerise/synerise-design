import * as React from 'react';
import find from 'ramda/src/find';
import Menu from '@synerise/ds-menu';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import * as S from '../../RelativeRangePicker.styles';
import { Props } from './RangeDropdown.types';

const RangeDropdown: React.FC<Props> = ({ ranges, currentRange, intl, onChange }: Props) => {
  if (!ranges || ranges.length === 0) return null;
  const containsCurrentRange = currentRange && !!find(range => range.key === currentRange.key, ranges);
  const overlay = (
    <Menu
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      selectedKeys={currentRange ? [currentRange.key] : []}
      onClick={({ key }): void => onChange(find(range => range.key === key, ranges))}
    >
      {ranges.map(range => (
        <Menu.Item key={range.key || range.id}>
          {range.translationKey ? intl.formatMessage({ id: range.translationKey }) : range.key}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <S.Range
        type={containsCurrentRange ? 'primary' : undefined}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        {currentRange &&
          intl.formatMessage({
            id: containsCurrentRange ? currentRange.translationKey : 'DS.DATE-RANGE-PICKER.MORE',
          })}
        <Icon component={<AngleDownS />} style={{ margin: '-2px -8px -2px 0' }} />
      </S.Range>
    </Dropdown>
  );
};

export default RangeDropdown;
