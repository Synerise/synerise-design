import * as React from 'react';
import { AngleDownS, Close3S } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import Button from '@synerise/ds-button';
import * as S from './Trigger.styles';
import { ItemPickerSize } from '../ItemPicker';

interface Props {
  openDropdown: () => void;
  closeDropdown: () => void;
  size: ItemPickerSize;
  clear: string | React.ReactNode;
  onClear: () => void;
  opened: boolean;
  placeholder: string | React.ReactNode;
  placeholderIcon?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  selected?: MenuItemProps;
  changeButtonLabel?: string | React.ReactNode;
  onChangeButtonClick?: () => void;
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
  size,
  changeButtonLabel,
  onChangeButtonClick,
}) => {
  const handleClear = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      event.stopPropagation();
      closeDropdown();
      onClear();
    },
    [onClear, closeDropdown]
  );

  const renderClear = React.useMemo(() => {
    return (
      selected && (
        <S.ClearWrapper onClick={handleClear} data-testid="clear-icon">
          <Tooltip title={clear}>
            <Icon component={<Close3S />} color={theme.palette['red-600']} />
          </Tooltip>
        </S.ClearWrapper>
      )
    );
  }, [selected, handleClear, clear]);

  const renderAngleIcon = React.useMemo(() => {
    return !selected && size === 'small' && <Icon data-testid="angle-icon" component={<AngleDownS />} />;
  }, [size, selected]);

  const handleChangeButtonClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onChangeButtonClick ? onChangeButtonClick() : openDropdown();
    },
    [onChangeButtonClick, openDropdown]
  );

  const renderChangeButton = React.useMemo(() => {
    return (
      size === 'large' &&
      onChangeButtonClick && (
        <S.ChangeButtonWrapper>
          <Button type="ghost" onClick={handleChangeButtonClick}>
            {changeButtonLabel}
          </Button>
        </S.ChangeButtonWrapper>
      )
    );
  }, [onChangeButtonClick, changeButtonLabel, size, handleChangeButtonClick]);

  return (
    <S.TriggerWrapper
      tabIndex={0}
      size={size}
      opened={opened}
      disabled={disabled}
      error={error}
      onClick={openDropdown}
      selected={Boolean(selected)}
    >
      <S.Trigger size={size}>
        {selected ? (
          <>
            <S.Value>
              {selected.prefixel && <S.Prefix data-testid="value-prefixel">{selected.prefixel}</S.Prefix>}
              <S.ValueText>{selected.text}</S.ValueText>
            </S.Value>
            {renderChangeButton}
          </>
        ) : (
          <S.Placeholder>
            {placeholderIcon && (
              <S.Prefix data-testid="placeholder-icon">
                <Icon component={placeholderIcon} />
              </S.Prefix>
            )}
            {placeholder}
          </S.Placeholder>
        )}
      </S.Trigger>
      <S.IconWrapper size={size}>
        {renderClear}
        {renderAngleIcon}
      </S.IconWrapper>
    </S.TriggerWrapper>
  );
};

export default Trigger;
