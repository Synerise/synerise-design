import React from 'react';

import Cruds from '@synerise/ds-cruds';

import * as S from '../CardTab.styles';
import type { CardTabActionsProps } from './CardTabActions.types';

const CardTabActions = ({
  onChangeName,
  enterEditNameMode,
  onDuplicateTab,
  onRemoveTab,
  onPreviewTab,
  texts,
}: CardTabActionsProps) => {
  return (
    <S.CardTabSuffix
      data-testid="card-tab-suffix"
      className="ds-card-tabs__suffix-nodrag"
    >
      <Cruds
        onEdit={onChangeName ?? enterEditNameMode}
        editTooltip={texts?.changeNameTooltip}
        onDuplicate={onDuplicateTab}
        duplicateTooltip={texts?.duplicateTooltip}
        onRemove={onRemoveTab}
        removeTooltip={texts?.removeTooltip}
        onPreview={onPreviewTab}
        previewTooltip={texts?.previewTooltip}
      />
    </S.CardTabSuffix>
  );
};

export default CardTabActions;
