import * as React from 'react';
import find from 'ramda/src/find';
import Icon from '@synerise/ds-icon';
import { AngleDownS, CheckS } from '@synerise/ds-icon/dist/icons';
import { useOnClickOutside } from '@synerise/ds-utils';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from '../../RelativeRangePicker.styles';
import { Props } from './RangeDropdown.types';

const MAX_ITEMS_COUNT = 7;
const ITEMS_HEIGHT = 32;
const RangeDropdown: React.FC<Props> = ({ ranges, currentRange, intl, onChange }: Props) => {
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
    <S.OverlayWrapper visible={dropVisible} ref={overlayRef} width={160}>
      <S.StyledScrollbar maxHeight={MAX_ITEMS_COUNT * ITEMS_HEIGHT} absolute>
        <S.DropMenu onClick={onMenuItemClick} selectedKeys={[]}>
          {ranges.map(range => (
            <S.DropMenuItem
              key={range.key || range.id}
              suffixel={
                currentRange?.key === range.key && <Icon component={<CheckS />} color={theme.palette['green-600']} />
              }
            >
              {range.translationKey ? intl.formatMessage({ id: range.translationKey }) : range.key}
            </S.DropMenuItem>
          ))}
        </S.DropMenu>
      </S.StyledScrollbar>
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
          intl.formatMessage({
            id: containsCurrentRange ? currentRange.translationKey : 'DS.DATE-RANGE-PICKER.MORE',
          })}

        <Icon component={<AngleDownS />} />
      </S.Range>
      {overlay}
    </S.DropdownContainer>
  );
};

export default RangeDropdown;
