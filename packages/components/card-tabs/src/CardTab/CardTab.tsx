import * as React from 'react';
import Icon from '@synerise/ds-icon';
import HandleIcon from '@synerise/ds-icon/dist/icons/drag-handle-m.svg';
import ChangeNameIcon from '@synerise/ds-icon/dist/icons/edit-s.svg';
import DuplicateIcon from '@synerise/ds-icon/dist/icons/duplicate-s.svg';
import RemoveIcon from '@synerise/ds-icon/dist/icons/close-s.svg';
import * as S from './CardTab.styles';

interface Props {
  active: boolean;
  onChangeName?: () => void;
  onDuplicateTab?: () => void;
  onRemoveTab?: () => void;
  tabIndex: number;
  title: string;
  variant?: string;
  onClick?: () => void;
  draggable?: boolean;
  icon?: React.ReactNode;
}

interface State {
  edited: boolean;
}

export default class CardTab extends React.PureComponent<Props, State> {
  state = {
    edited: false,
  };

  render(): React.ReactNode {
    const { edited } = this.state;
    const { title, variant, draggable, icon, onChangeName, onDuplicateTab, onRemoveTab } = this.props;
    return (
      <S.CardTabContainer edited={edited}>
        {(variant || icon || draggable) && (
          <S.CardTabPrefix>
            {variant && <S.CardTabTag color="yellow-500">{variant}</S.CardTabTag>}
            {icon && <Icon component={icon} />}
            {draggable && <Icon component={<HandleIcon />} />}
          </S.CardTabPrefix>
        )}
        <S.CardTabLabel>{title}</S.CardTabLabel>
        {(onChangeName || onDuplicateTab || onRemoveTab) && (
          <S.CardTabSuffix>
            {onChangeName && <Icon component={<ChangeNameIcon />} />}
            {onDuplicateTab && <Icon component={<DuplicateIcon />} />}
            {onRemoveTab && <Icon component={<RemoveIcon />} />}
          </S.CardTabSuffix>
        )}
      </S.CardTabContainer>
    );
  }
}
