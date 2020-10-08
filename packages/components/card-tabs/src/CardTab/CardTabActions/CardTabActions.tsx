import * as React from 'react';
import Cruds from '@synerise/ds-cruds';
import * as S from '../CardTab.styles';
import { Props } from './CardTabActions.types';

const CardTabActions: React.FC<Props> = ({
  changeNameAvailable,
  enterEditNameMode,
  onDuplicateTab,
  onRemoveTab,
  texts,
}) => {
  return (
    <S.CardTabSuffix data-testid="card-tab-suffix">
      <Cruds
        onEdit={changeNameAvailable ? enterEditNameMode : undefined}
        editTooltip={texts?.changeNameTooltip}
        onDuplicate={onDuplicateTab}
        duplicateTooltip={texts?.duplicateTooltip}
        onRemove={onRemoveTab}
        removeTooltip={texts?.removeTooltip}
      />
    </S.CardTabSuffix>
  );
};

export default CardTabActions;
