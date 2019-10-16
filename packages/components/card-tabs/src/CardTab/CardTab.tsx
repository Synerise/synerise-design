import * as React from 'react';
import Icon from '@synerise/ds-icon';
import TextTruncate from 'react-text-truncate';
import HandleIcon from '@synerise/ds-icon/dist/icons/drag-handle-m.svg';
import ChangeNameIcon from '@synerise/ds-icon/dist/icons/edit-s.svg';
import DuplicateIcon from '@synerise/ds-icon/dist/icons/duplicate-s.svg';
import RemoveIcon from '@synerise/ds-icon/dist/icons/close-s.svg';
import InlineEdit from '@synerise/ds-inline-edit/dist/InlineEdit';
import * as S from './CardTab.styles';

interface CardTabVariant {
  tag?: string;
  color: string;
}

export interface CardTabProps {
  id: string;
  index: number;
  active?: boolean;
  onSelectTab?: (index: number) => void;
  onChangeName?: (id: string, name: string) => void;
  onDuplicateTab?: (id: string) => void;
  onRemoveTab?: (id: string) => void;
  tabIndex: number;
  name: string;
  variant: CardTabVariant;
  onClick?: () => void;
  draggable?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  showTag?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  greyBackground?: boolean;
}

interface CardTabState {
  edited: boolean;
  editedName: string;
  pressed: boolean;
}

export default class CardTab extends React.PureComponent<CardTabProps, CardTabState> {
  private truncateRef: any;
  constructor(props) {
    super(props);
    const { name } = this.props;
    this.truncateRef = null;

    this.state = {
      edited: false,
      editedName: props.name,
      pressed: false,
    };
  }

  handleMouseDown = (): void => {
    this.setState({ pressed: true });
  };

  handleMouseUp = (): void => {
    this.setState({ pressed: false });
  };

  handleTruncateLabel = (event): void => {
    event.stopPropagation();
    const { truncateRef, state } = this;
    if (!state.edited) {
      truncateRef.onResize();
    }
  };

  private handleEditName(event): void {
    event.stopPropagation();
    this.setState({
      edited: true,
    });
  }

  private handleChangeName(event: any): void {
    const { value } = event.target;
    this.setState({
      editedName: value,
    });
  }

  private handleEditNameBlur(): void {
    const { editedName } = this.state;
    const { onChangeName, id } = this.props;
    this.setState(
      {
        edited: false,
      },
      () => {
        onChangeName(id, editedName);
      }
    );
  }

  private handleDuplicate(event): void {
    event.stopPropagation();
    const { id, onDuplicateTab } = this.props;
    onDuplicateTab(id);
  }

  private handleRemove(event): void {
    event.stopPropagation();
    const { id, onRemoveTab } = this.props;
    onRemoveTab(id);
  }

  private handleSelect(event): void {
    event.stopPropagation();
    const { index, onSelectTab } = this.props;
    onSelectTab(index);
  }

  render(): React.ReactNode {
    const {
      id,
      name,
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
      greyBackground,
    } = this.props;
    const { edited, pressed, editedName } = this.state;
    return (
      <S.CardTabContainer
        className={`${pressed ? 'pressed' : ''}`}
        edited={edited}
        active={active}
        invalid={invalid}
        disabled={disabled}
        color={variant.color}
        onClick={this.handleSelect.bind(this)}
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseUp}
        onMouseUp={this.handleMouseUp}
        onMouseOver={this.handleTruncateLabel}
        onMouseOut={this.handleTruncateLabel}
        onFocus={this.handleTruncateLabel}
        onBlur={this.handleTruncateLabel}
        greyBackground={greyBackground}
      >
        {(showTag || prefixIcon || draggable) && (
          <S.CardTabPrefix>
            {showTag && !draggable && <S.CardTabTag>{variant.tag}</S.CardTabTag>}
            {prefixIcon && !draggable && <Icon component={prefixIcon} />}
            {draggable && <Icon className="ds-card-tabs__handle-icon" component={<HandleIcon />} />}
          </S.CardTabPrefix>
        )}
        <S.CardTabLabel>
          {edited ? (
            <InlineEdit
              onChange={this.handleChangeName.bind(this)}
              size="small"
              hideIcon
              style={{ maxWidth: 46 }}
              input={{
                value: editedName,
                name: `ds-card-tab-input-${id}`,
                onBlur: this.handleEditNameBlur.bind(this),
              }}
            />
          ) : (
            <TextTruncate
              ref={(c): void => {
                this.truncateRef = c;
              }}
              line={1}
              truncateText="... "
              text={`${name}`}
            />
          )}
        </S.CardTabLabel>
        {(onChangeName || onDuplicateTab || onRemoveTab) && !suffixIcon && (
          <S.CardTabSuffix>
            {onChangeName && <Icon component={<ChangeNameIcon />} onClick={this.handleEditName.bind(this)} />}
            {onDuplicateTab && <Icon component={<DuplicateIcon />} onClick={this.handleDuplicate.bind(this)} />}
            {onRemoveTab && (
              <Icon
                className="ds-card-tabs__remove-icon"
                component={<RemoveIcon />}
                onClick={this.handleRemove.bind(this)}
              />
            )}
          </S.CardTabSuffix>
        )}
        {suffixIcon && <Icon className="ds-card-tabs__suffix-icon" component={suffixIcon} />}
      </S.CardTabContainer>
    );
  }
}
