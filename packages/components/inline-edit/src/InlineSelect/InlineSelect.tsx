import React, { useRef, useState, useEffect } from 'react';
import { toCamelCase } from '@synerise/ds-utils';
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
}: InlineSelectProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedValue, setSelectedValue] = useState(initialValue || placeholder || 'option');
  const [isOpened, setIsOpened] = useState(Boolean(expanded));
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (input?.value && input.value !== selectedValue) {
      setSelectedValue(input?.value as string);
    }
  }, [input?.value, selectedValue]);

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
          onSelect={item => setSelectedValue(item.text as string)}
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
            ref={inputRef}
            style={inputStyle}
            id={input.name ? toCamelCase(input.name) : 'id'}
            className="autosize-input"
            placeholder={placeholder}
            maxLength={input.maxLength}
            disabled={disabled}
            name={input.name}
            readOnly={input.readOnly}
            value={selectedValue || placeholder}
            autoComplete="off"
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
