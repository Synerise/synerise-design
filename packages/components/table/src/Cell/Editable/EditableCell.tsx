import * as React from 'react';
import { EditNolineS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import { Input } from '@synerise/ds-input';
import { ChangeEvent } from 'react';
import * as S from './EditableCell.styles';

interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

const EditableCell: React.FC<Props> = ({ value, onChange }: Props) => {
  const [editMode, setEditMode] = React.useState(false);
  const [editValue, setEditValue] = React.useState(value);

  const render = React.useMemo(() => {
    return editMode ? (
      // eslint-disable-next-line react/jsx-handler-names
      <Input
        value={editValue}
        autoFocus
        resetMargin
        onChange={(event: ChangeEvent<HTMLInputElement>): void => setEditValue(event.target.value)}
        onBlur={(): void => {
          setEditMode(false);
          onChange(editValue);
        }}
      />
    ) : (
      <>
        <span>{value}</span>
        <Icon onClick={(): void => setEditMode(true)} component={<EditNolineS />} />
      </>
    );
  }, [editMode, value, editValue, setEditValue, onChange]);

  return <S.EditableCell>{render}</S.EditableCell>;
};

export default EditableCell;
