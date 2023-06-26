import * as React from 'react';
import Icon, { CheckS } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import { useOnClickOutside } from '@synerise/ds-utils';
import * as S from '../../RelativeRangePicker.styles';
import { RANGES_ICON } from '../../utils';
import { Props } from './ModeDropdown.types';

const MODE_TRANSLATION_KEYS = {
  PAST: 'last',
  FUTURE: 'next',
  SINCE: 'since',
};
const ModeDrop: React.FC<Props> = ({ currentRange, currentGroup, onModeChange, modes, texts }: Props) => {
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
            {texts[MODE_TRANSLATION_KEYS[mode]]}
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
        {!!currentGroup && <Icon key={currentGroup} component={[RANGES_ICON[currentGroup]]} />}
      </S.ModeDropdownTrigger>
      {overlay}
    </S.DropdownContainer>
  );
};

export default ModeDrop;
