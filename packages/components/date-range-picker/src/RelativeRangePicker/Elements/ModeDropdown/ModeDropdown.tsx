import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { CheckS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { useOnClickOutside } from '@synerise/ds-utils';
import * as S from '../../RelativeRangePicker.styles';
import { RANGES_ICON } from '../../utils';
import { Props } from './ModeDropdown.types';

const MODE_TRANSLATION_KEYS = {
  PAST: 'LAST',
  FUTURE: 'NEXT',
  SINCE: 'SINCE',
};
const ModeDrop: React.FC<Props> = ({ currentRange, currentGroup, onModeChange, modes, intl }: Props) => {
  const [dropVisible, setDropVisible] = React.useState<boolean>(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  const handleMenuItemClick = React.useCallback(
    (mode): void => {
      onModeChange && onModeChange(mode);
      setDropVisible(false);
    },
    [onModeChange]
  );
  useOnClickOutside(overlayRef, () => {
    setDropVisible(false);
  });

  const overlay = (
    <S.OverlayWrapper visible={dropVisible} ref={overlayRef} width={180}>
      <S.DropMenu selectedKeys={currentRange ? [currentRange.key as string] : []}>
        {modes.map(mode => (
          <S.DropMenuItem
            key={mode}
            onClick={(): void => handleMenuItemClick(mode)}
            prefixel={<Icon component={RANGES_ICON[mode]} />}
            suffixel={mode === currentGroup ? <Icon component={<CheckS />} color={theme.palette['green-600']} /> : null}
          >
            {intl.formatMessage({
              id: `DS.DATE-RANGE-PICKER.${MODE_TRANSLATION_KEYS[mode]}`,
            })}
          </S.DropMenuItem>
        ))}
      </S.DropMenu>
    </S.OverlayWrapper>
  );
  return (
    <S.DropdownContainer>
      <S.ModeDropdownTrigger
        key="TOGGLE"
        mode="single-icon"
        type="secondary"
        onClick={(): void => setDropVisible(true)}
        disabled={!modes || !modes?.length || modes.length === 1}
      >
        {!!currentGroup && <Icon component={[RANGES_ICON[currentGroup]]} />}
      </S.ModeDropdownTrigger>
      {overlay}
    </S.DropdownContainer>
  );
};

export default ModeDrop;
