import React from 'react';
import { theme } from '@synerise/ds-core';
import Icon, { AngleDownS, Close3S, WarningFillM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import Button from '@synerise/ds-button';
import Popconfirm from '@synerise/ds-popconfirm';
import * as S from './Trigger.styles';
import { Props } from './Trigger.types';

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
  withChangeButton,
  clearConfirmTitle,
  yesText,
  noText,
  withClearConfirmation,
}) => {
  const handleClear = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      event.stopPropagation();
      closeDropdown();
      onClear && onClear();
    },
    [onClear, closeDropdown]
  );

  const renderClear = React.useMemo(() => {
    const tooltip = (
      <Tooltip title={clear}>
        <S.ClearIconWrapper>
          <Icon component={<Close3S />} color={theme.palette['red-600']} />
        </S.ClearIconWrapper>
      </Tooltip>
    );

    if (selected) {
      if (withClearConfirmation) {
        return (
          <Popconfirm
            title={clearConfirmTitle}
            okButtonProps={{ onClick: handleClear }}
            okText={yesText}
            cancelText={noText}
            icon={<Icon component={<WarningFillM />} color="#ffc300" />}
          >
            {tooltip}
          </Popconfirm>
        );
      }
      return (
        <S.ClearWrapper onClick={handleClear} data-testid="clear-icon">
          {tooltip}
        </S.ClearWrapper>
      );
    }

    return null;
  }, [clear, selected, withClearConfirmation, handleClear, clearConfirmTitle, yesText, noText]);

  const renderAngleIcon = React.useMemo(() => {
    return (
      size === 'small' && (
        <S.AngleIconWrapper>
          <Icon data-testid="angle-icon" component={<AngleDownS />} color={theme.palette['grey-600']} />
        </S.AngleIconWrapper>
      )
    );
  }, [size]);

  const handleChangeButtonClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      openDropdown();
    },
    [openDropdown]
  );

  const handleOpen = React.useCallback(() => {
    if (!selected || (selected && size === 'small' && !withClearConfirmation)) {
      openDropdown();
    }
  }, [selected, openDropdown, size, withClearConfirmation]);

  const renderChangeButton = React.useMemo(() => {
    return (
      size === 'large' &&
      withChangeButton && (
        <S.ChangeButtonWrapper>
          <Button type="ghost-primary" onClick={handleChangeButtonClick}>
            {changeButtonLabel}
          </Button>
        </S.ChangeButtonWrapper>
      )
    );
  }, [withChangeButton, changeButtonLabel, size, handleChangeButtonClick]);

  return (
    <S.TriggerWrapper
      tabIndex={selected ? undefined : 0}
      size={size}
      opened={opened}
      disabled={disabled}
      error={error}
      onClick={handleOpen}
      selected={Boolean(selected)}
      clearable={Boolean(onClear && renderClear)}
    >
      <S.Trigger size={size}>
        {selected ? (
          <>
            <S.Value>
              {selected.prefixel && (
                <S.Prefix data-testid="value-prefixel">
                  <>{selected.prefixel}</>
                </S.Prefix>
              )}
              <S.ValueText>{selected.text}</S.ValueText>
            </S.Value>
            {renderChangeButton}
          </>
        ) : (
          <S.Placeholder size={size}>
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
        {onClear && renderClear}
        {renderAngleIcon}
      </S.IconWrapper>
    </S.TriggerWrapper>
  );
};

export default Trigger;
