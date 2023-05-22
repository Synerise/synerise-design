import * as React from 'react';
import { FC } from 'react';

import Cruds from '@synerise/ds-cruds';

import * as S from '../CardTab.styles';
import { Props } from './CardTabActions.types';

const CardTabActions: FC<Props> = ({ onChangeName, enterEditNameMode, onDuplicateTab, onRemoveTab, texts }) => {
  return (
    <S.CardTabSuffix data-testid="card-tab-suffix" className="ds-card-tabs__suffix-nodrag">
      <Cruds
        onEdit={onChangeName ?? enterEditNameMode}
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
