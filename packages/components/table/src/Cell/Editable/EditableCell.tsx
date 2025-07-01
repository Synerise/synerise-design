import React, { type ChangeEvent, useCallback, useMemo, useState } from 'react';

import Icon, { EditNolineS } from '@synerise/ds-icon';
import { Input } from '@synerise/ds-input';

import * as S from './EditableCell.styles';
import { type EditableCellProps } from './EditableCell.types';

const EditableCell = ({
  value,
  onChange,
  placeholder,
  ...htmlAttributes
}: EditableCellProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState(value || '');

  const enterEditMode = useCallback(() => {
    setEditMode(true);
  }, [setEditMode]);

  const render = useMemo(() => {
    return editMode ? (
      <Input
        value={editValue}
        autoFocus
        resetMargin
        placeholder={placeholder}
        onChange={(event: ChangeEvent<HTMLInputElement>): void =>
          setEditValue(event.target.value)
        }
        onBlur={(): void => {
          setEditMode(false);
          onChange(editValue);
        }}
      />
    ) : (
      <>
        <S.Value asPlaceholder={!value}>{value || placeholder}</S.Value>
        <Icon onClick={enterEditMode} component={<EditNolineS />} />
      </>
    );
  }, [
    editMode,
    value,
    enterEditMode,
    editValue,
    setEditValue,
    onChange,
    placeholder,
  ]);

  return <S.EditableCell {...htmlAttributes}>{render}</S.EditableCell>;
};

export default EditableCell;
