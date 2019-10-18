import Icon from '@synerise/ds-icon';
import * as React from 'react';
import ChangeNameIcon from '../../../../icon/dist/icons/edit-s.svg';
import DuplicateIcon from '../../../../icon/dist/icons/duplicate-s.svg';
import RemoveIcon from '../../../../icon/dist/icons/close-s.svg';
import * as S from '../CardTab.styles';

interface Props {
  changeNameAvailable: boolean;
  enterEditNameMode: (event) => void;
  onDuplicateTab?: (event) => void;
  onRemoveTab?: (event) => void;
}

const CardTabActions: React.FC<Props> = ({ changeNameAvailable, enterEditNameMode, onDuplicateTab, onRemoveTab }) => {
  return (
    <S.CardTabSuffix data-testid="card-tab-suffix">
      {changeNameAvailable && (
        <Icon className="ds-card-tabs__change-name-icon" component={<ChangeNameIcon />} onClick={enterEditNameMode} />
      )}
      {onDuplicateTab && (
        <Icon className="ds-card-tabs__duplicate-icon" component={<DuplicateIcon />} onClick={onDuplicateTab} />
      )}
      {onRemoveTab && <Icon className="ds-card-tabs__remove-icon" component={<RemoveIcon />} onClick={onRemoveTab} />}
    </S.CardTabSuffix>
  );
};

export default CardTabActions;
