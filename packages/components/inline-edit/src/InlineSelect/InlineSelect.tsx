import React, { useRef, useState, useEffect } from 'react';
import { toCamelCase } from '@synerise/ds-utils';
import Icon, { AngleDownS } from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import AutosizeInput, { AutosizeInputRefType } from '../autosize/autosize';
import * as S from './InlineSelect.style';
import SelectDropdown from './SelectDropdown/SelectDropdown';
import { InlineSelectProps } from './InlineSelect.types';

const InlineSelect = ({
  className,
  style,
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
  const autoWidthRef = useRef<AutosizeInputRefType>(null);
  const inputRef = useRef<HTMLInputElement | null>();

  const [selectedValue, setSelectedValue] = useState<string | undefined>(initialValue || placeholder || 'option');
  const [opened, setOpened] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);

  useEffect(() => {
    if (input?.value && input.value !== selectedValue) {
      setSelectedValue(input?.value as string);
    }
  }, [input?.value, selectedValue]);

  useEffect(() => {
    if (autoWidthRef.current) {
      inputRef.current = autoWidthRef.current.inputRef.current;
    }
  });
  useEffect(() => {
    autoFocus && inputRef.current && inputRef.current.focus();
  }, [autoFocus, inputRef]);

  return (
    <Dropdown
      visible={!disabled && opened}
      onVisibleChange={setOpened}
      placement="bottomRight"
      disabled={disabled}
      overlay={
        <SelectDropdown
          dataSource={dataSource}
          onSelect={item => setSelectedValue(item.text as string)}
          closeDropdown={() => setOpened(false)}
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
        onMouseDown={(): void => setPressed(true)}
        onMouseUp={(): void => setPressed(false)}
        pressed={pressed}
        dropdownOpened={opened}
      >
        <AutosizeInput
          id={input.name ? toCamelCase(input.name) : 'id'}
          className="autosize-input"
          placeholder={input.placeholder}
          maxLength={input.maxLength}
          disabled={disabled}
          name={input.name}
          value={selectedValue || placeholder}
          autoComplete={input.autoComplete}
          placeholderIsMinWidth={false}
          style={inputStyle}
          extraWidth={2}
          wrapperClassName="autosize-input"
          ref={autoWidthRef}
        />
        {!hideIcon && (
          <S.IconWrapper size={size} expanded={opened}>
            <Icon component={<AngleDownS />} size={24} />
          </S.IconWrapper>
        )}
      </S.InPlaceEditableInputContainer>
    </Dropdown>
  );
};

export default InlineSelect;
