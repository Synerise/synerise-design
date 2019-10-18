import * as React from 'react';
import Icon from '@synerise/ds-icon';
import HandleIcon from '@synerise/ds-icon/dist/icons/drag-handle-m.svg';
import ChangeNameIcon from '@synerise/ds-icon/dist/icons/edit-s.svg';
import DuplicateIcon from '@synerise/ds-icon/dist/icons/duplicate-s.svg';
import RemoveIcon from '@synerise/ds-icon/dist/icons/close-s.svg';
import InlineEdit from '@synerise/ds-inline-edit/dist/InlineEdit';
import getColorByIndex from '../utils/getColorByIndex';
import * as S from './CardTab.styles';

export enum prefixType {
  TAG,
  ICON,
}

export interface CardTabProps {
  id: number;
  index: number;
  name: string;
  tag: string;
  prefix: prefixType;
  active?: boolean;
  onClick?: () => void;
  draggable?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  disabled?: boolean;
  invalid?: boolean;
  greyBackground?: boolean;
  onSelectTab?: (id: number) => void;
  onChangeName?: (id: number, name: string) => void;
  onDuplicateTab?: (id: number) => void;
  onRemoveTab?: (id: number) => void;
}

interface CardTabState {
  edited: boolean;
  editedName: string;
  pressed: boolean;
}

export default class CardTab extends React.Component<CardTabProps, CardTabState> {
  constructor(props) {
    super(props);

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
    const { id, onSelectTab } = this.props;
    onSelectTab(id);
  }

  render(): React.ReactNode {
    const {
      id,
      index,
      name,
      tag,
      draggable,
      prefixIcon,
      suffixIcon,
      onChangeName,
      onDuplicateTab,
      onRemoveTab,
      active,
      disabled,
      prefix,
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
        disabled={!active && disabled}
        color={getColorByIndex(index)}
        onClick={this.handleSelect.bind(this)}
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseUp}
        onMouseUp={this.handleMouseUp}
        greyBackground={greyBackground}
        data-id={id}
      >
        <S.CardTabPrefix>
          {!draggable && prefix === prefixType.TAG && tag && <S.CardTabTag>{tag}</S.CardTabTag>}
          {!draggable && prefix === prefixType.ICON && prefixIcon && <Icon component={prefixIcon} />}
          {draggable && <Icon className="ds-card-tabs__handle-icon" component={<HandleIcon />} />}
        </S.CardTabPrefix>
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
            <span>{name}</span>
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
