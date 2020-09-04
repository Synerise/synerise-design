import * as React from 'react';
import SingleAction from '@synerise/ds-button/dist/Cruds/SingleAction';
import { CloseS, EditS, Settings2M, StarFillS, StarS } from '@synerise/ds-icon/dist/icons';
import { ActionProps } from '../Actions.types';
import * as S from '../Actions.styles';

const ActionsRow: React.FC<ActionProps> = ({
  onDelete,
  onEdit,
  onFavourite,
  onSettingsEnter,
  isFavourite,
  texts,
  hovered,
}: ActionProps) => {
  return (
    <S.ActionsWrapper>
      {!!onSettingsEnter && (
        <SingleAction
          className="settings"
          title={!!hovered && texts.enterSettings}
          icon={<Settings2M />}
          onClick={onSettingsEnter}
          iconSize={18}
        />
      )}
      {!!onFavourite && (
        <SingleAction
          title={hovered && isFavourite ? texts.addToFavourite : texts.deleteFromFavourites}
          icon={isFavourite ? <StarFillS /> : <StarS />}
          onClick={onFavourite}
          className="favourite"
        />
      )}
      {!!onEdit && <SingleAction className="edit" title={hovered && texts.edit} icon={<EditS />} onClick={onEdit} />}{' '}
      {!!onDelete && (
        <SingleAction className="delete" title={hovered && texts.delete} icon={<CloseS />} onClick={onDelete} />
      )}
    </S.ActionsWrapper>
  );
};

export default ActionsRow;
