import React, { useEffect, useRef, useState } from 'react';

import Dropdown from '@synerise/ds-dropdown';
import Icon, { AngleDownS } from '@synerise/ds-icon';
import { AutosizeInput } from '@synerise/ds-input';
import { NOOP, toCamelCase } from '@synerise/ds-utils';

import * as S from './InlineSelect.style';
import { type InlineSelectProps } from './InlineSelect.types';
import SelectDropdown from './SelectDropdown/SelectDropdown';

const InlineSelect = ({
  className,
  style,
  expanded,
  dropdownProps = {},
  dropdownOverlayStyle = {},
  inputStyle = {},
  size = 'normal',
  disabled,
  autoFocus,
  hideIcon,
  error,
  input,
  placeholder,
  dataSource,
  initialValue,
  onValueChange,
}: InlineSelectProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedValue, setSelectedValue] = useState(
    initialValue || placeholder || 'option',
  );
  const [isOpened, setIsOpened] = useState(Boolean(expanded));
  const [isPressed, setIsPressed] = useState(false);

  const { value, onChange, ...inputProps } = input;

  const handleSelect = (item: (typeof dataSource)[number]) => {
    onValueChange?.(item);
    setSelectedValue(item.text as string);
  };

  useEffect(() => {
    if (value && value !== selectedValue) {
      setSelectedValue(`${value}`);
    }
  }, [value, selectedValue]);

  useEffect(() => {
    autoFocus && inputRef.current && inputRef.current.focus();
  }, [autoFocus, inputRef]);

  return (
    <Dropdown
      open={!disabled && isOpened}
      onOpenChange={setIsOpened}
      placement="bottomRight"
      disabled={disabled}
      overlay={
        <SelectDropdown
          dataSource={dataSource}
          onSelect={handleSelect}
          closeDropdown={() => setIsOpened(false)}
          style={dropdownOverlayStyle}
        />
      }
      trigger={['click']}
      asChild
      {...dropdownProps}
      popoverProps={{
        testId: 'inline-select',
        ...dropdownProps?.popoverProps,
      }}
    >
      <S.InPlaceEditableInputContainer
        className={`ds-inline-edit ${className || ''}`}
        style={style}
        size={size}
        disabled={disabled}
        error={error}
        tabIndex={0}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        pressed={isPressed}
        dropdownOpened={isOpened}
      >
        <AutosizeInput
          value={selectedValue || placeholder}
          placeholderIsMinWidth={false}
          extraWidth={2}
          wrapperClassName="autosize-input"
        >
          <input
            {...inputProps}
            ref={inputRef}
            style={inputStyle}
            id={input.name ? toCamelCase(input.name) : 'id'}
            className="autosize-input"
            data-testid="inline-select-autosize-input"
            value={selectedValue || placeholder}
            autoComplete="off"
            placeholder={placeholder}
            disabled={disabled}
            onChange={NOOP}
          />
        </AutosizeInput>
        {!hideIcon && (
          <S.IconWrapper size={size} expanded={isOpened}>
            <Icon component={<AngleDownS />} size={24} />
          </S.IconWrapper>
        )}
      </S.InPlaceEditableInputContainer>
    </Dropdown>
  );
};

export default InlineSelect;
