import * as React from 'react';
import Icon from '@synerise/ds-icon';
import HandleIcon from '@synerise/ds-icon/dist/icons/drag-handle-m.svg';
import ChangeNameIcon from '@synerise/ds-icon/dist/icons/edit-s.svg';
import DuplicateIcon from '@synerise/ds-icon/dist/icons/duplicate-s.svg';
import RemoveIcon from '@synerise/ds-icon/dist/icons/close-s.svg';
import * as S from './CardTab.styles';

interface Variant {
  tag?: string;
  color: string;
}

interface Props {
  active?: boolean;
  onChangeName?: () => void;
  onDuplicateTab?: () => void;
  onRemoveTab?: () => void;
  tabIndex: number;
  label: string;
  variant?: Variant;
  onClick?: () => void;
  draggable?: boolean;
  icon?: React.ReactNode;
  tag?: boolean;
  disabled?: boolean;
  invalid?: boolean;
}

interface State {
  edited: boolean;
  pressed: boolean;
}

export default class CardTab extends React.PureComponent<Props, State> {
  state = {
    edited: false,
    pressed: false,
  };

  handleMouseDown = (): void => {
    this.setState({ pressed: true });
  };

  handleMouseUp = (): void => {
    this.setState({ pressed: false });
  };

  render(): React.ReactNode {
    const { edited, pressed } = this.state;
    const {
      label,
      variant,
      draggable,
      icon,
      onChangeName,
      onDuplicateTab,
      onRemoveTab,
      active,
      disabled,
      tag,
      invalid,
    } = this.props;
    return (
      <S.CardTabContainer
        className={`${pressed ? 'pressed' : ''}`}
        edited={edited}
        active={active}
        invalid={invalid}
        disabled={disabled}
        color={variant.color}
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseUp}
        onMouseUp={this.handleMouseUp}
      >
        {(tag || icon || draggable) && (
          <S.CardTabPrefix>
            {tag && <S.CardTabTag>{variant.tag}</S.CardTabTag>}
            {icon && <Icon component={icon} />}
            {draggable && <Icon component={<HandleIcon />} />}
          </S.CardTabPrefix>
        )}
        <S.CardTabLabel>{label}</S.CardTabLabel>
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
