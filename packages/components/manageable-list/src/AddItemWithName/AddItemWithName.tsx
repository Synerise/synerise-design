import * as React from 'react';
import { Input } from '@synerise/ds-input';
import Icon from '@synerise/ds-icon';
import Add3M from '@synerise/ds-icon/dist/icons/Add3M';
import Button from '@synerise/ds-button';
import * as S from './AddItemWithName.styles';
import { Props } from './AddItemWithName.types';

const DEFAULT_NAME = '';

const AddItemWithName: React.FC<Props> = ({ onItemAdd, addItemLabel, disabled, placeholder }) => {
  const [active, setActive] = React.useState(false);
  const [name, setName] = React.useState(DEFAULT_NAME);

  const handleClickOutside = React.useCallback((): void => {
    setActive(false);
    setName(DEFAULT_NAME);
  }, []);

  const handleNameChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  }, []);

  const toggleInput = React.useCallback((): void => {
    setActive(!active);
    setName(DEFAULT_NAME);
  }, [active]);

  const createItem = React.useCallback((): void => {
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
