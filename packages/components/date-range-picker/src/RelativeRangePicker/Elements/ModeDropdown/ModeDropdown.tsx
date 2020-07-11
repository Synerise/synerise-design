import * as React from 'react';
import Menu from '@synerise/ds-menu';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import { CheckS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from '../../RelativeRangePicker.styles';
import { RANGES_ICON, RANGES_MODE } from '../../utils';
import { Props } from './ModeDropdown.types';

const ModeDrop: React.FC<Props> = ({ currentRange, currentGroup, onModeChange }: Props) => {
  const modes = Object.values(RANGES_MODE);
  const overlay = (
    <Menu
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      selectedKeys={currentRange ? [currentRange.key] : []}
    >
      {modes.map(mode => (
        <Menu.Item
          key={mode}
          onClick={(): void => onModeChange && onModeChange(mode)}
          prefixel={<Icon component={RANGES_ICON[mode]} />}
          suffixel={mode === currentGroup ? <Icon component={<CheckS />} color={theme.palette['green-600']} /> : null}
        >
          {mode}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <S.Range key="TOGGLE" mode="single-icon">
        {!!currentGroup && <Icon component={[RANGES_ICON[currentGroup]]} />}
      </S.Range>
    </Dropdown>
  );
};

export default ModeDrop;
