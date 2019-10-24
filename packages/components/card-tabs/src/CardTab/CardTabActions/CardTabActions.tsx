import * as React from 'react';
import Icon from '@synerise/ds-icon';
import DuplicateS from '@synerise/ds-icon/dist/icons/DuplicateS';
import CloseS from '@synerise/ds-icon/dist/icons/CloseS';
import EditS from '@synerise/ds-icon/dist/icons/EditS';
import * as S from '../CardTab.styles';

interface Props {
  changeNameAvailable: boolean;
  enterEditNameMode: (event: React.MouseEvent<HTMLElement>) => void;
  onDuplicateTab?: (event: React.MouseEvent<HTMLElement>) => void;
  onRemoveTab?: (event: React.MouseEvent<HTMLElement>) => void;
}

const CardTabActions: React.FC<Props> = ({ changeNameAvailable, enterEditNameMode, onDuplicateTab, onRemoveTab }) => {
  return (
    <S.CardTabSuffix data-testid="card-tab-suffix">
      {changeNameAvailable && (
        <Icon className="ds-card-tabs__change-name-icon" component={<EditS />} onClick={enterEditNameMode} />
      )}
      {onDuplicateTab && (
        <Icon className="ds-card-tabs__duplicate-icon" component={<DuplicateS />} onClick={onDuplicateTab} />
      )}
      {onRemoveTab && <Icon className="ds-card-tabs__remove-icon" component={<CloseS />} onClick={onRemoveTab} />}
    </S.CardTabSuffix>
  );
};

export default CardTabActions;
