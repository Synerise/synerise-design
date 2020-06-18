import * as React from 'react';
import { EditNolineS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import { Input } from '@synerise/ds-input';
import { ChangeEvent } from 'react';
import * as S from './EditableCell.styles';

interface Props {
  value: string | undefined;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

const EditableCell: React.FC<Props> = ({ value, onChange, placeholder }: Props) => {
  const [editMode, setEditMode] = React.useState(false);
  const [editValue, setEditValue] = React.useState(value);

  const enterEditMode = React.useCallback(() => {
    setEditMode(true);
  }, [setEditMode]);

  const render = React.useMemo(() => {
    return editMode ? (
      // eslint-disable-next-line react/jsx-handler-names
      <Input
        value={editValue}
        autoFocus
        resetMargin
        placeholder={placeholder}
        onChange={(event: ChangeEvent<HTMLInputElement>): void => setEditValue(event.target.value)}
        onBlur={(): void => {
          setEditMode(false);
          onChange(editValue);
        }}
      />
    ) : (
      <>
        <S.Value placeholder={!value}>{value || placeholder}</S.Value>
        <Icon onClick={enterEditMode} component={<EditNolineS />} />
      </>
    );
  }, [editMode, value, enterEditMode, editValue, setEditValue, onChange, placeholder]);

  return <S.EditableCell>{render}</S.EditableCell>;
};

export default EditableCell;
