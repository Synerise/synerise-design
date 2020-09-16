import * as React from 'react';
import Button from '@synerise/ds-button';
import * as S from '../CardTab.styles';
import { CardTabTexts } from '../CardTab';

interface Props {
  changeNameAvailable: boolean;
  enterEditNameMode: (event?: React.MouseEvent<HTMLElement>) => void;
  onDuplicateTab?: (event?: React.MouseEvent<HTMLElement>) => void;
  onRemoveTab?: (event?: React.MouseEvent<HTMLElement>) => void;
  texts?: CardTabTexts;
}

const CardTabActions: React.FC<Props> = ({
  changeNameAvailable,
  enterEditNameMode,
  onDuplicateTab,
  onRemoveTab,
  texts,
}) => {
  return (
    <S.CardTabSuffix data-testid="card-tab-suffix">
      <Button.Cruds
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
