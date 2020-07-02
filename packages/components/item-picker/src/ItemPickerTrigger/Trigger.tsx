import * as React from 'react';
import { AngleDownS, Close3S } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './Trigger.styles';

interface Props {
  selected?: any;
  clear: string;
  onClear: () => void;
  opened: boolean;
  placeholder: string;
  placeholderIcon?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  openDropdown: () => void;
  closeDropdown: () => void;
}

const Trigger: React.FC<Props> = ({
  selected,
  clear,
  onClear,
  opened,
  placeholder,
  placeholderIcon,
  error,
  disabled,
  openDropdown,
  closeDropdown,
}) => {
  const handleClear = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      event.stopPropagation();
      closeDropdown();
      onClear();
    },
    [onClear, closeDropdown]
  );

  return (
    <S.TriggerWrapper tabIndex={0} opened={opened} disabled={disabled} error={error} onClick={openDropdown}>
      <S.SmallTrigger>
        {selected ? (
          <S.Value>
            {selected.prefixel && <S.Prefix>{selected.prefixel}</S.Prefix>}
            {selected.text}
          </S.Value>
        ) : (
          <S.Placeholder>
            {placeholderIcon && (
              <S.Prefix>
                <Icon component={placeholderIcon} />
              </S.Prefix>
            )}
            {placeholder}
          </S.Placeholder>
        )}
      </S.SmallTrigger>
      <S.IconWrapper>
        {selected ? (
          <S.ClearWrapper onClick={handleClear}>
            <Tooltip title={clear}>
              <Icon component={<Close3S />} color={theme.palette['red-600']} />
            </Tooltip>
          </S.ClearWrapper>
        ) : (
          <Icon component={<AngleDownS />} />
        )}
      </S.IconWrapper>
    </S.TriggerWrapper>
  );
};

export default Trigger;
