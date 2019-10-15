import * as React from 'react';
import Icon from '@synerise/ds-icon';
import TextTruncate from 'react-text-truncate';
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
  suffixIcon?: React.ReactNode;
  showTag?: boolean;
  disabled?: boolean;
  invalid?: boolean;
}

interface CardTabState {
  edited: boolean;
  pressed: boolean;
}

export default class CardTab extends React.PureComponent<CardTabProps, CardTabState> {
  truncateRef = null;
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

  handleTruncateLabel = (event): void => {
    event.stopPropagation();
    this.truncateRef.onResize();
  };

  render(): React.ReactNode {
    const { edited, pressed } = this.state;
    const {
      label,
      variant,
      draggable,
      prefixIcon,
      suffixIcon,
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
        onMouseOver={this.handleTruncateLabel}
        onMouseOut={this.handleTruncateLabel}
        onFocus={this.handleTruncateLabel}
        onBlur={this.handleTruncateLabel}
      >
        {(showTag || prefixIcon || draggable) && (
          <S.CardTabPrefix>
            {showTag && !draggable && <S.CardTabTag>{variant.tag}</S.CardTabTag>}
            {prefixIcon && !draggable && <Icon component={prefixIcon} />}
            {draggable && <Icon className="ds-card-tabs__handle-icon" component={<HandleIcon />} />}
          </S.CardTabPrefix>
        )}
        <S.CardTabLabel>
          <TextTruncate
            ref={(c): void => {
              this.truncateRef = c;
            }}
            line={1}
            truncateText="... "
            text={`${label} ${variant.tag}`}
          />
        </S.CardTabLabel>
        {(onChangeName || onDuplicateTab || onRemoveTab) && !suffixIcon && (
          <S.CardTabSuffix>
            {onChangeName && <Icon component={<ChangeNameIcon />} />}
            {onDuplicateTab && <Icon component={<DuplicateIcon />} />}
            {onRemoveTab && <Icon className="ds-card-tabs__remove-icon" component={<RemoveIcon />} />}
          </S.CardTabSuffix>
        )}
        {suffixIcon && <Icon className="ds-card-tabs__suffix-icon" component={suffixIcon} />}
      </S.CardTabContainer>
    );
  }
}
