import * as React from 'react';
import find from 'ramda/src/find';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import * as S from '../../RelativeRangePicker.styles';
import { Props } from './RangeDropdown.types';

const RangeDropdown: React.FC<Props> = ({ ranges, currentRange, intl, onChange }: Props) => {
  if (!ranges || ranges.length === 0) return null;
  const containsCurrentRange = currentRange && !!find(range => range.key === currentRange.key, ranges);
  const overlay = (
    <S.DropMenu
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      selectedKeys={currentRange ? [currentRange.key] : []}
      onClick={({ key }): void => onChange(find(range => range.key === key, ranges))}
    >
      {ranges.map(range => (
        <S.DropMenuItem key={range.key || range.id}>
          {range.translationKey ? intl.formatMessage({ id: range.translationKey }) : range.key}
        </S.DropMenuItem>
      ))}
    </S.DropMenu>
  );
  return (
    <Dropdown overlay={overlay}>
      <S.Range
        type={containsCurrentRange ? 'primary' : 'tertiary'}
        mode='label-icon'
      >
        {currentRange &&
          intl.formatMessage({
            id: containsCurrentRange ? currentRange.translationKey : 'DS.DATE-RANGE-PICKER.MORE',
          })}
        <Icon component={<AngleDownS />}/>
      </S.Range>
    </Dropdown>
  );
};

export default RangeDropdown;
