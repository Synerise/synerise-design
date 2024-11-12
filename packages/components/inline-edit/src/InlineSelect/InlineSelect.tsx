import React, { useRef, useState, useEffect } from 'react';

import { NOOP, toCamelCase } from '@synerise/ds-utils';
import Icon, { AngleDownS } from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import { AutosizeInput } from '@synerise/ds-input';

import * as S from './InlineSelect.style';
import SelectDropdown from './SelectDropdown/SelectDropdown';
import { InlineSelectProps } from './InlineSelect.types';

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
  const [selectedValue, setSelectedValue] = useState(initialValue || placeholder || 'option');
  const [isOpened, setIsOpened] = useState(Boolean(expanded));
  const [isPressed, setIsPressed] = useState(false);

  const { value, onChange, ...inputProps } = input;

  const handleSelect = (item: typeof dataSource[number]) => {
    // eslint-disable-next-line no-unused-expressions
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
      visible={!disabled && isOpened}
      onVisibleChange={setIsOpened}
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
      {...dropdownProps}
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
