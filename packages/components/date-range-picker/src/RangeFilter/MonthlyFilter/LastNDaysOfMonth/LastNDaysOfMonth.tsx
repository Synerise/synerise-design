import * as React from 'react';
import { range } from 'lodash';
import Menu from '@synerise/ds-menu';
import Icon from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import Day from '../../../TimeWindow/Day/Day';
import { injectIntl } from 'react-intl';

export const LastNDaysOfMonthComponent = ({
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
      <Icon name={!restricted || (active && hovered) ? 'close-s' : 'check-s'} size="20" />
      <span>{labelText}</span>
      <Icon name="angle-down-s" style={{ float: 'right', marginTop: 2 }} />
    </React.Fragment>
  );
  let day = (
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
  const onClick = days => {
    onChange({ days });
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
          {range(0, 30).map(index => (
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
