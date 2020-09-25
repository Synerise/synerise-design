import * as React from 'react';
import SingleAction from '@synerise/ds-button/dist/Cruds/SingleAction';
import { CloseS, EditS, Settings2S, StarFillS, StarS,  } from '@synerise/ds-icon/dist/icons';
import { ActionProps } from '../Actions.types';
import * as S from '../Actions.styles';

const ActionsRow: React.FC<ActionProps> = ({
  onDelete,
  onEdit,
  onFavourite,
  onSettingsEnter,
  isFavourite,
  texts,
}: ActionProps) => {
  return (
    <S.ActionsWrapper>
      {!!onSettingsEnter && (
        <SingleAction
          className="settings"
          title={texts.enterSettings}
          icon={<Settings2S />}
          onClick={onSettingsEnter}
        />
      )}
      {!!onFavourite && (
        <SingleAction
          title={isFavourite ? texts.addToFavourite : texts.deleteFromFavourites}
          icon={isFavourite ? <StarFillS /> : <StarS />}
          onClick={onFavourite}
          className="favourite"
        />
      )}
      {!!onEdit && <SingleAction className="edit" title={texts.edit} icon={<EditS />} onClick={onEdit} />}{' '}
      {!!onDelete && <SingleAction className="delete" title={texts.delete} icon={<CloseS />} onClick={onDelete} />}
    </S.ActionsWrapper>
  );
};

export default ActionsRow;
