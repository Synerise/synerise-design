import * as React from 'react';
import Icon from '@synerise/ds-icon';
import InlineEdit from '@synerise/ds-inline-edit/dist/InlineEdit';
import getColorByIndex from '../utils/getColorByIndex';
import * as S from './CardTab.styles';
import CardTabPrefix from './CardTabPrefix/CardTabPrefix';
import CardTabActions from './CardTabActions/CardTabActions';

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

const CardTab: React.FC<CardTabProps> = ({
  id,
  name,
  index,
  tag,
  prefix,
  prefixIcon,
  suffixIcon,
  active,
  draggable,
  disabled,
  invalid,
  greyBackground,
  onChangeName,
  onSelectTab,
  onDuplicateTab,
  onRemoveTab,
}) => {
  const [edited, setEdited] = React.useState(false);
  const [editedName, setEditedName] = React.useState(name);
  const [pressed, setPressed] = React.useState(false);

  const handleEditName = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    setEdited(true);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setEditedName(value);
  };

  const handleEditNameBlur = (): void => {
    setEdited(false);
    onChangeName && onChangeName(id, editedName);
  };

  const handleDuplicate = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    onDuplicateTab && onDuplicateTab(id);
  };

  const handleRemove = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    onRemoveTab && onRemoveTab(id);
  };

  const handleSelect = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    onSelectTab && onSelectTab(id);
  };

  const showCardActions = (): boolean => {
    return (!!onChangeName || !!onDuplicateTab || !!onRemoveTab) && !suffixIcon;
  };

  return (
    <S.CardTabContainer
      className={`${pressed ? 'pressed' : ''}`}
      edited={edited}
      active={!!active}
      invalid={!!invalid}
      disabled={!active && !!disabled}
      color={getColorByIndex(index)}
      onClick={handleSelect}
      onMouseDown={(): void => setPressed(true)}
      onMouseLeave={(): void => setPressed(false)}
      onMouseUp={(): void => setPressed(false)}
      greyBackground={!!greyBackground}
      data-id={id}
      data-testid="card-tab-container"
    >
      <CardTabPrefix draggable={draggable} prefixIcon={prefixIcon} prefix={prefix} tag={tag} />
      <S.CardTabLabel data-testid="card-tab-label">
        {edited ? (
          <InlineEdit
            className="ds-card-tabs__edit-name"
            onChange={handleChangeName}
            size="small"
            hideIcon
            style={{ maxWidth: 46 }}
            input={{
              value: editedName,
              name: `ds-card-tab-input-${id}`,
              onBlur: handleEditNameBlur,
            }}
            data-testid="card-tab-edit-input"
          />
        ) : (
          <span data-testid="card-tab-name">{name}</span>
        )}
      </S.CardTabLabel>
      {showCardActions() && (
        <CardTabActions
          enterEditNameMode={handleEditName}
          changeNameAvailable={!!onChangeName}
          onDuplicateTab={handleDuplicate}
          onRemoveTab={handleRemove}
        />
      )}
      {suffixIcon && <Icon className="ds-card-tabs__suffix-icon" component={suffixIcon} />}
    </S.CardTabContainer>
  );
};

export default CardTab;
