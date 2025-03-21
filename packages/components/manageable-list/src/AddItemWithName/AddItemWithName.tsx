import React, { ChangeEvent, useCallback, useState } from 'react';
import { Input } from '@synerise/ds-input';
import Icon, { Add3M } from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import * as S from './AddItemWithName.styles';
import { Props } from './AddItemWithName.types';

const DEFAULT_NAME = '';

const AddItemWithName = ({ onItemAdd, addItemLabel, disabled, placeholder }: Props) => {
  const [active, setActive] = useState(false);
  const [name, setName] = useState(DEFAULT_NAME);

  const handleClickOutside = useCallback((): void => {
    setActive(false);
    setName(DEFAULT_NAME);
  }, []);

  const handleNameChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  }, []);

  const toggleInput = useCallback((): void => {
    setActive(!active);
    setName(DEFAULT_NAME);
  }, [active]);

  const createItem = useCallback((): void => {
    onItemAdd && onItemAdd({ name });
    toggleInput();
  }, [name, onItemAdd, toggleInput]);

  return (
    <S.AddItemLayout data-testid="add-item-with-name-button">
      <Button type="ghost-primary" mode="icon-label" onClick={toggleInput} disabled={disabled}>
        <Icon component={<Add3M />} size={24} />
        {addItemLabel}
      </Button>
      {active && (
        <Input
          resetMargin
          autoFocus
          value={name}
          onBlur={handleClickOutside}
          onChange={handleNameChange}
          onPressEnter={createItem}
          data-testid="add-item-input"
          placeholder={placeholder}
        />
      )}
    </S.AddItemLayout>
  );
};

export default AddItemWithName;
