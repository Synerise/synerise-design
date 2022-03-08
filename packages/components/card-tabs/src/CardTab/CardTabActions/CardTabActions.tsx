import * as React from 'react';
import Cruds from '@synerise/ds-cruds';
import * as S from '../CardTab.styles';
import { Props } from './CardTabActions.types';

const CardTabActions: React.FC<Props> = ({
  enterEditNameMode,
  onDuplicateTab,
  onRemoveTab,
  texts,
  actionsAvailable,
}) => {
  return (
    <S.CardTabSuffix data-testid="card-tab-suffix">
      <Cruds
        onEdit={actionsAvailable?.editName ? enterEditNameMode : undefined}
        editTooltip={texts?.changeNameTooltip}
        onDuplicate={actionsAvailable?.duplicate ? onDuplicateTab : undefined}
        duplicateTooltip={texts?.duplicateTooltip}
        onRemove={actionsAvailable?.remove ? onRemoveTab : undefined}
        removeTooltip={texts?.removeTooltip}
      />
    </S.CardTabSuffix>
  );
};

export default CardTabActions;
