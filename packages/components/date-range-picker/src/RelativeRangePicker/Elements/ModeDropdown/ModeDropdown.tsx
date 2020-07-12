import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import { CheckS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from '../../RelativeRangePicker.styles';
import { RANGES_ICON, RANGES_MODE } from '../../utils';
import { Props } from './ModeDropdown.types';

const MODE_TRANSLATION_KEYS = {
  PAST: 'LAST',
  FUTURE: 'NEXT',
  SINCE: 'SINCE',
};
const ModeDrop: React.FC<Props> = ({ currentRange, currentGroup, onModeChange, intl }: Props) => {
  const modes = Object.values(RANGES_MODE);
  const overlay = (
    <S.DropMenu
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      selectedKeys={currentRange ? [currentRange.key] : []}
    >
      {modes.map(mode => (
        <S.DropMenuItem
          key={mode}
          onClick={(): void => onModeChange && onModeChange(mode)}
          prefixel={<Icon component={RANGES_ICON[mode]} />}
          suffixel={mode === currentGroup ? <Icon component={<CheckS />} color={theme.palette['green-600']} /> : null}
        >
          {intl.formatMessage({
            id: `DS.DATE-RANGE-PICKER.${MODE_TRANSLATION_KEYS[mode]}`,
          })}
        </S.DropMenuItem>
      ))}
    </S.DropMenu>
  );
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    <Dropdown overlay={overlay} trigger={'click' as const}>
      <S.Range key="TOGGLE" mode="single-icon" type="secondary">
        {!!currentGroup && <Icon component={[RANGES_ICON[currentGroup]]} />}
      </S.Range>
    </Dropdown>
  );
};

export default ModeDrop;
