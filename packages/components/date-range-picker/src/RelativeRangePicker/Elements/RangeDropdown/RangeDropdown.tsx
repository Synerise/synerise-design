import * as React from 'react';
import find from 'ramda/src/find';
import Icon from '@synerise/ds-icon';
import { AngleDownS, CheckS } from '@synerise/ds-icon/dist/icons';
import { useOnClickOutside } from '@synerise/ds-utils';
import Scrollbar from '@synerise/ds-scrollbar';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from '../../RelativeRangePicker.styles';
import { Props } from './RangeDropdown.types';

const MAX_ITEMS_COUNT = 7;
const ITEMS_HEIGHT = 32;
const DROPDOWN_WIDTH = 160;
const DROPDOWN_PADDING = 8;
const RangeDropdown: React.FC<Props> = ({ ranges, currentRange, texts, onChange }: Props) => {
  const [dropVisible, setDropVisible] = React.useState<boolean>(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(overlayRef, () => {
    setDropVisible(false);
  });

  const onMenuItemClick = React.useCallback(
    ({ key }): void => {
      onChange(find(range => range.key === key, ranges));
      setDropVisible(false);
    },
    [onChange, ranges]
  );

  if (!ranges || ranges.length === 0) return null;
  const containsCurrentRange = currentRange && find(range => range.key === currentRange.key, ranges);
  const overlay = (
    <S.OverlayWrapper visible={dropVisible} ref={overlayRef} width={DROPDOWN_WIDTH}>
      <Scrollbar
        maxHeight={MAX_ITEMS_COUNT * ITEMS_HEIGHT}
        style={{ width: DROPDOWN_WIDTH - DROPDOWN_PADDING }}
        absolute
      >
        <S.DropMenu onClick={onMenuItemClick} selectedKeys={[]}>
          {ranges.map(range => (
            <S.DropMenuItem
              key={range.key || range.id}
              suffixel={
                currentRange?.key === range.key && <Icon component={<CheckS />} color={theme.palette['green-600']} />
              }
            >
              {range.translationKey ? texts[range.translationKey] : range.key}
            </S.DropMenuItem>
          ))}
        </S.DropMenu>
      </Scrollbar>
    </S.OverlayWrapper>
  );
  return (
    <S.DropdownContainer>
      <S.Range
        type={containsCurrentRange ? 'primary' : 'tertiary'}
        mode="label-icon"
        onClick={(): void => setDropVisible(!dropVisible)}
      >
        {currentRange &&
          texts[containsCurrentRange && currentRange.translationKey ? currentRange.translationKey : 'more']}

        <Icon component={<AngleDownS />} />
      </S.Range>
      {overlay}
    </S.DropdownContainer>
  );
};

export default RangeDropdown;
