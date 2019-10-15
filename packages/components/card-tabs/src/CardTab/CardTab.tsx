import * as React from 'react';
import Icon from '@synerise/ds-icon';
import HandleIcon from '@synerise/ds-icon/dist/icons/drag-handle-m.svg';
import ChangeNameIcon from '@synerise/ds-icon/dist/icons/edit-s.svg';
import DuplicateIcon from '@synerise/ds-icon/dist/icons/duplicate-s.svg';
import RemoveIcon from '@synerise/ds-icon/dist/icons/close-s.svg';
import * as S from './CardTab.styles';

interface CardTabVariant {
  tag?: string;
  color: string;
}

export interface CardTabProps {
  id: string;
  active?: boolean;
  onChangeName?: () => void;
  onDuplicateTab?: () => void;
  onRemoveTab?: () => void;
  tabIndex: number;
  label: string;
  variant: CardTabVariant;
  onClick?: () => void;
  draggable?: boolean;
  prefixIcon?: React.ReactNode;
  showTag?: boolean;
  disabled?: boolean;
  invalid?: boolean;
}

interface CardTabState {
  edited: boolean;
  pressed: boolean;
}

export default class CardTab extends React.PureComponent<CardTabProps, CardTabState> {
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
      prefixIcon,
      onChangeName,
      onDuplicateTab,
      onRemoveTab,
      active,
      disabled,
      showTag,
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
        {(showTag || prefixIcon || draggable) && (
          <S.CardTabPrefix>
            {showTag && !draggable && <S.CardTabTag>{variant.tag}</S.CardTabTag>}
            {prefixIcon && !draggable && <Icon component={prefixIcon} />}
            {draggable && <Icon className="ds-handle-icon" component={<HandleIcon />} />}
          </S.CardTabPrefix>
        )}
        <S.CardTabLabel>
          {label} {variant.tag}
        </S.CardTabLabel>
        {(onChangeName || onDuplicateTab || onRemoveTab) && (
          <S.CardTabSuffix>
            {onChangeName && <Icon component={<ChangeNameIcon />} />}
            {onDuplicateTab && <Icon component={<DuplicateIcon />} />}
            {onRemoveTab && <Icon className="ds-remove-icon" component={<RemoveIcon />} />}
          </S.CardTabSuffix>
        )}
      </S.CardTabContainer>
    );
  }
}
