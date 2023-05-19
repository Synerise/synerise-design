import * as React from 'react';
import { useState, useMemo, useCallback, FC, MouseEvent, ChangeEvent } from 'react';
import Icon from '@synerise/ds-icon';
import InlineEdit from '@synerise/ds-inline-edit/dist/InlineEdit';
import { injectIntl } from 'react-intl';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './CardTab.styles';
import CardTabPrefix from './CardTabPrefix/CardTabPrefix';
import CardTabActions from './CardTabActions/CardTabActions';
import { CardTabProps, CardTabSuffixProps } from './CardTab.types';

const CardTab: FC<CardTabProps> = props => {
  const {
    intl,
    id,
    name,
    tag,
    prefix,
    prefixIcon,
    suffixIcon,
    renderSuffix,
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
    itemData,
  } = props;

  const [edited, setEdited] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [pressed, setPressed] = useState(false);

  const getTexts = useMemo(() => {
    return {
      changeNameTooltip: intl.formatMessage({ id: 'DS.CARD-TAB.RENAME' }),
      removeTooltip: intl.formatMessage({ id: 'DS.CARD-TAB.REMOVE' }),
      duplicateTooltip: intl.formatMessage({ id: 'DS.CARD-TAB.DUPLICATE' }),
      changeNameMenuItem: intl.formatMessage({ id: 'DS.CARD-TAB.RENAME' }),
      removeMenuItem: intl.formatMessage({ id: 'DS.CARD-TAB.REMOVE' }),
      duplicateMenuItem: intl.formatMessage({ id: 'DS.CARD-TAB.DUPLICATE' }),
      ...texts,
    };
  }, [texts, intl]);

  const handleEditName = useCallback(
    (event?: MouseEvent<HTMLElement>): void => {
      !!event && event.stopPropagation();
      setEdited(true);
    },
    [setEdited]
  );

  const handleChangeName = useMemo(() => {
    if (onChangeName === undefined) {
      return undefined;
    }
    return (event?: ChangeEvent<HTMLInputElement>): void => {
      if (event) {
        const { value: nameValue } = event.target;
        setEditedName(nameValue);
        onChangeName && onChangeName(id, nameValue);
      }
    };
  }, [setEditedName, onChangeName, id]);

  const handleEditNameBlur = useCallback((): void => {
    setEdited(false);
    onChangeName && onChangeName(id, editedName);
  }, [onChangeName, id, editedName]);

  const handleDuplicate = useMemo(() => {
    if (onDuplicateTab === undefined) {
      return undefined;
    }
    return (event?: MouseEvent<HTMLElement>): void => {
      event && event.stopPropagation();
      onDuplicateTab && onDuplicateTab(id);
    };
  }, [id, onDuplicateTab]);

  const handleRemove = useMemo(() => {
    if (onRemoveTab === undefined) {
      return undefined;
    }
    return (event?: MouseEvent<HTMLElement>): void => {
      event && event.stopPropagation();
      onRemoveTab && onRemoveTab(id);
    };
  }, [id, onRemoveTab]);

  const handleSelect = useCallback(
    (event: MouseEvent<HTMLElement>): void => {
      !!event && event.stopPropagation();
      !edited && onSelectTab && onSelectTab(id);
    },
    [edited, id, onSelectTab]
  );

  const showCardActions = useCallback((): boolean => {
    return (!!onChangeName || !!onDuplicateTab || !!onRemoveTab) && !suffixIcon && !renderSuffix;
  }, [onChangeName, onDuplicateTab, onRemoveTab, suffixIcon, renderSuffix]);

  const handleSuffixClick = useCallback((event: MouseEvent<HTMLElement>): void => {
    !!event && event.stopPropagation();
  }, []);

  const suffixProps: CardTabSuffixProps = {
    ...props,
    handleRemove,
    handleDuplicate,
    handleEditName,
    texts: getTexts,
  };
  const renderedSuffix = !!renderSuffix && renderSuffix(suffixProps);

  return (
    <S.CardTabContainer
      className={`${pressed ? 'pressed' : ''}`}
      edited={edited}
      active={Boolean(active)}
      invalid={Boolean(invalid || invalidName)}
      disabled={!active && Boolean(disabled)}
      draggable={draggable}
      color={color}
      onClick={handleSelect}
      onMouseDown={(): void => setPressed(true)}
      onMouseLeave={!draggable ? (): void => setPressed(false) : undefined}
      onMouseUp={(): void => setPressed(false)}
      onDragEnd={(): void => setPressed(false)}
      greyBackground={!!greyBackground}
      data-id={id}
      data-testid="card-tab-container"
      itemData={itemData}
    >
      {!edited && (
        <CardTabPrefix colorDot={colorDot} draggable={draggable} prefixIcon={prefixIcon} prefix={prefix} tag={tag} />
      )}
      <S.CardTabLabel onDoubleClick={handleEditName} data-testid="card-tab-label">
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
      {suffixIcon && (
        <S.CardSuffixWrapper>
          <Icon className="ds-card-tabs__suffix-icon" component={suffixIcon} />
        </S.CardSuffixWrapper>
      )}
      {!suffixIcon && !!renderSuffix && (
        <S.CardSuffixWrapper
          className="ds-card-tabs__suffix-nodrag"
          onClick={handleSuffixClick}
          onPointerDown={handleSuffixClick}
          data-testid="card-tab-suffix"
        >
          {renderedSuffix}
        </S.CardSuffixWrapper>
      )}
      {showCardActions() && (
        <CardTabActions
          onChangeName={handleEditName}
          onDuplicateTab={handleDuplicate}
          onRemoveTab={handleRemove}
          texts={getTexts}
        />
      )}
    </S.CardTabContainer>
  );
};

export default injectIntl(CardTab);
