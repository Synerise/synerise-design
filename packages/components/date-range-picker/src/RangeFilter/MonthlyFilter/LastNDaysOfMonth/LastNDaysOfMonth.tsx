import * as React from 'react';
import { range } from 'lodash';
import Menu from '@synerise/ds-menu';
import Icon from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import { injectIntl } from 'react-intl';
import { CloseS, CheckS, AngleDownS } from '@synerise/ds-icon/dist/icons';
import Day from '../../../TimeWindow/Day/Day';
import { Props } from './LastNDaysOfMonth.types';

export const LastNDaysOfMonthComponent: React.FC<Props> = ({
  value,
  label: labelText,
  onChange,
  onToggle,
  active,
  restricted,
  intl,
  ...rest
}) => {
  const label = (hovered: boolean) => (
    <React.Fragment>
      <Icon component={!restricted || (active && hovered) ? <CloseS /> : <CheckS />} size={20} />
      <span>{labelText}</span>
      <Icon component={<AngleDownS />} style={{ float: 'right', marginTop: 2 }} />
    </React.Fragment>
  );
  const day: React.ReactNode = (
    <div style={{ gridColumnEnd: 'span 4' }}>
      <Day
        {...rest}
        style={{ width: '100%' }}
        label={label}
        active={active}
        restricted={restricted}
        onToggle={onToggle}
      />
    </div>
  );
  const onClick = (days): void => {
    onChange && onChange({ days });
    if (!active) setTimeout(onToggle);
  };
  return (
    <Dropdown
      placement="bottomRight"
      overlay={
        <Menu
          style={{ maxHeight: 200, overflow: 'auto' }}
          selectedKeys={[String(value.days)]}
          onClick={({ key }) => onClick(parseInt(key))}
        >
          {range(0, 30).map((index: number) => (
            <Menu.Item key={index}>{intl.formatMessage({ id: 'SNRS.DATE.N_DAYS' }, { n: index + 1 })}</Menu.Item>
          ))}
        </Menu>
      }
    >
      {day}
    </Dropdown>
  );
};

export const LastNDaysOfMonth = injectIntl(LastNDaysOfMonthComponent);
