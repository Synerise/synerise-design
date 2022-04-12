import * as React from 'react';
import Icon from '@synerise/ds-icon';
import InlineEdit from '@synerise/ds-inline-edit/dist/InlineEdit';
import { injectIntl } from 'react-intl';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './CardTab.styles';
import CardTabPrefix from './CardTabPrefix/CardTabPrefix';
import CardTabActions from './CardTabActions/CardTabActions';
import { CardTabProps } from './CardTab.types';

const CardTab: React.FC<CardTabProps> = ({
  intl,
  id,
  name,
  tag,
  prefix,
  prefixIcon,
  suffixIcon,
  active,
  draggable,
  disabled,
  invalid,
  invalidName,
  greyBackground,
  onChangeName,
  onSelectTab,
  onDuplicateTab,
  onRemoveTab,
  texts,
  color = 'yellow',
  colorDot,
}) => {
  const [edited, setEdited] = React.useState(false);
  const [editedName, setEditedName] = React.useState(name);
  const [pressed, setPressed] = React.useState(false);

  const getTexts = React.useMemo(() => {
    return {
      changeNameTooltip: intl.formatMessage({ id: 'DS.CARD-TAB.RENAME' }),
      removeTooltip: intl.formatMessage({ id: 'DS.CARD-TAB.REMOVE' }),
      duplicateTooltip: intl.formatMessage({ id: 'DS.CARD-TAB.DUPLICATE' }),
      ...texts,
    };
  }, [texts, intl]);

  const handleEditName = React.useCallback(
    (event?: React.MouseEvent<HTMLElement>): void => {
      !!event && event.stopPropagation();
      setEdited(true);
    },
    [setEdited]
  );

  const handleChangeName = React.useMemo(() => {
    if (onChangeName === undefined) {
      return undefined;
    }
    return (event?: React.ChangeEvent<HTMLInputElement>): void => {
      if (event) {
        const { value: nameValue } = event.target;
        setEditedName(nameValue);
        onChangeName && onChangeName(id, nameValue);
      }
    };
  }, [setEditedName, onChangeName, id]);

  const handleEditNameBlur = React.useCallback((): void => {
    setEdited(false);
    onChangeName && onChangeName(id, editedName);
  }, [onChangeName, id, editedName]);

  const handleDuplicate = React.useMemo(() => {
    if (onDuplicateTab === undefined) {
      return undefined;
    }
    return (event?: React.MouseEvent<HTMLElement>): void => {
      event && event.stopPropagation();
      onDuplicateTab && onDuplicateTab(id);
    };
  }, [id, onDuplicateTab]);

  const handleRemove = React.useMemo(() => {
    if (onRemoveTab === undefined) {
      return undefined;
    }
    return (event?: React.MouseEvent<HTMLElement>): void => {
      event && event.stopPropagation();
      onRemoveTab && onRemoveTab(id);
    };
  }, [id, onRemoveTab]);

  const handleSelect = React.useCallback(
    (event: React.MouseEvent<HTMLElement>): void => {
      !!event && event.stopPropagation();
      !edited && onSelectTab && onSelectTab(id);
    },
    [edited, id, onSelectTab]
  );

  const showCardActions = React.useCallback((): boolean => {
    return (!!onChangeName || !!onDuplicateTab || !!onRemoveTab) && !suffixIcon;
  }, [onChangeName, onDuplicateTab, onRemoveTab, suffixIcon]);

  return (
    <S.CardTabContainer
      className={`${pressed ? 'pressed' : ''}`}
      edited={edited}
      active={Boolean(active)}
      invalid={Boolean(invalid)}
      invalidName={Boolean(invalidName) && !invalid}
      disabled={!active && Boolean(disabled)}
      draggable={draggable}
      color={color}
      onClick={handleSelect}
      onMouseDown={(): void => setPressed(true)}
      onMouseLeave={(): void => setPressed(false)}
      onMouseUp={(): void => setPressed(false)}
      greyBackground={!!greyBackground}
      data-id={id}
      data-testid="card-tab-container"
    >
      <CardTabPrefix colorDot={colorDot} draggable={draggable} prefixIcon={prefixIcon} prefix={prefix} tag={tag} />
      <S.CardTabLabel data-testid="card-tab-label" invalidName={Boolean(invalidName) && !invalid}>
        {edited ? (
          <InlineEdit
            className="ds-card-tabs__edit-name"
            size="small"
            hideIcon
            autoFocus
            input={{
              value: editedName,
              name: `ds-card-tab-input-${id}`,
              onBlur: handleEditNameBlur,
              onChange: handleChangeName || ((): void => undefined),
            }}
            data-testid="card-tab-edit-input"
          />
        ) : (
          <Tooltip title={name}>
            <S.CardTabName data-testid="card-tab-name">{name}</S.CardTabName>
          </Tooltip>
        )}
      </S.CardTabLabel>
      {showCardActions() && (
        <CardTabActions
          onChangeName={handleEditName}
          onDuplicateTab={handleDuplicate}
          onRemoveTab={handleRemove}
          texts={getTexts}
        />
      )}
      {suffixIcon && (
        <S.CardSuffixWrapper>
          <Icon className="ds-card-tabs__suffix-icon" component={suffixIcon} />
        </S.CardSuffixWrapper>
      )}
    </S.CardTabContainer>
  );
};

export default injectIntl(CardTab);
