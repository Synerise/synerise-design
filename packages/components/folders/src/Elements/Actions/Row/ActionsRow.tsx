import * as React from 'react';
import SingleAction from '@synerise/ds-button/dist/Cruds/SingleAction';
import { CloseS, EditS, Settings2M, StarS } from '@synerise/ds-icon/dist/icons';
import { ActionProps } from '../Actions.types';
import * as S from '../Actions.styles';

const ActionsRow: React.FC<ActionProps> = ({ onDelete, onEdit, onFavourite, onSettingsEnter }: ActionProps) => {
  return (
    <S.ActionsWrapper>
      {!!onSettingsEnter && (
        <SingleAction
          className="settings"
          title="Title"
          icon={<Settings2M />}
          onClick={onSettingsEnter}
          iconSize={18}
        />
      )}
      {!!onFavourite && <SingleAction title="Title" icon={<StarS />} onClick={onFavourite} />}
      {!!onEdit && <SingleAction title="Title" icon={<EditS />} onClick={onEdit} />}{' '}
      {!!onDelete && <SingleAction className="delete" title="Title" icon={<CloseS />} onClick={onDelete} />}
    </S.ActionsWrapper>
  );
};

export default ActionsRow;
