import React, { type ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import Icon from '@synerise/ds-icon';
import InlineEdit from '@synerise/ds-inline-edit';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './CardTab.styles';
import {
  type CardTabProps,
  type CardTabSuffixProps,
  type ListItemEventType,
} from './CardTab.types';
import CardTabActions from './CardTabActions/CardTabActions';
import CardTabDropdown from './CardTabDropdown/CardTabDropdown';
import CardTabPrefix from './CardTabPrefix/CardTabPrefix';

const CardTab = <IdType extends string | number>(
  props: CardTabProps<IdType>,
) => {
  const {
    id,
    name,
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
    onPreviewTab,
    texts,
    color = 'yellow',
    itemData,
    dragHandleProps,
    actionsAsDropdown,
    intl: _intl,
    ...prefixProps
  } = props;

  const intl = useIntl();

  const [edited, setEdited] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const getTexts = useMemo(() => {
    return {
      changeNameTooltip: intl.formatMessage({
        id: 'DS.CARD-TAB.RENAME',
        defaultMessage: 'Rename',
      }),
      removeTooltip: intl.formatMessage({
        id: 'DS.CARD-TAB.REMOVE',
        defaultMessage: 'Delete',
      }),
      duplicateTooltip: intl.formatMessage({
        id: 'DS.CARD-TAB.DUPLICATE',
        defaultMessage: 'Duplicate',
      }),
      changeNameMenuItem: intl.formatMessage({
        id: 'DS.CARD-TAB.RENAME',
        defaultMessage: 'Rename',
      }),
      removeMenuItem: intl.formatMessage({
        id: 'DS.CARD-TAB.REMOVE',
        defaultMessage: 'Delete',
      }),
      duplicateMenuItem: intl.formatMessage({
        id: 'DS.CARD-TAB.DUPLICATE',
        defaultMessage: 'Duplicate',
      }),
      ...texts,
    };
  }, [texts, intl]);

  const handleEditName = useMemo(() => {
    if (onChangeName === undefined) {
      return undefined;
    }
    return (event?: ListItemEventType): void => {
      !!event && event.stopPropagation();
      setEdited(true);
    };
  }, [onChangeName, setEdited]);

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
    return (event?: ListItemEventType): void => {
      event && event.stopPropagation();
      onDuplicateTab && onDuplicateTab(id);
    };
  }, [id, onDuplicateTab]);

  const handleRemove = useMemo(() => {
    if (onRemoveTab === undefined) {
      return undefined;
    }
    return (event?: ListItemEventType): void => {
      event && event.stopPropagation();
      onRemoveTab && onRemoveTab(id);
    };
  }, [id, onRemoveTab]);

  const handlePreview = onPreviewTab && (() => onPreviewTab(id));

  const handleSelect = useCallback(
    (event: ListItemEventType): void => {
      !!event && event.stopPropagation();
      !edited && onSelectTab && onSelectTab(id);
    },
    [edited, id, onSelectTab],
  );

  const showCardActions = useCallback((): boolean => {
    return (
      (!!onChangeName || !!onDuplicateTab || !!onRemoveTab || !!onPreviewTab) &&
      !suffixIcon &&
      !renderSuffix
    );
  }, [
    onChangeName,
    onDuplicateTab,
    onRemoveTab,
    onPreviewTab,
    suffixIcon,
    renderSuffix,
  ]);

  const suffixProps: CardTabSuffixProps = {
    ...props,
    handleRemove,
    handleDuplicate,
    handleEditName,
    texts: getTexts,
  };

  const cardSuffix = (() => {
    const showActionsDropdownMenu =
      actionsAsDropdown && (onChangeName || handleDuplicate || handleRemove);
    if (showActionsDropdownMenu) {
      return (
        <CardTabDropdown
          editNameHandler={onChangeName ? handleEditName : undefined}
          duplicateHandler={handleDuplicate}
          removeHandler={handleRemove}
          texts={getTexts}
        />
      );
    }
    if (renderSuffix) {
      return renderSuffix(suffixProps);
    }
    if (suffixIcon) {
      return (
        <S.CardSuffixWrapper>
          <Icon className="ds-card-tabs__suffix-icon" component={suffixIcon} />
        </S.CardSuffixWrapper>
      );
    }
    if (showCardActions()) {
      return (
        <CardTabActions
          onChangeName={onChangeName ? handleEditName : undefined}
          onDuplicateTab={handleDuplicate}
          onRemoveTab={handleRemove}
          onPreviewTab={handlePreview}
          texts={getTexts}
        />
      );
    }
    return <></>;
  })();

  return (
    <S.CardTabContainer
      edited={edited}
      active={Boolean(active)}
      invalid={Boolean(invalid || invalidName)}
      disabled={!active && Boolean(disabled)}
      isDraggable={draggable}
      color={color}
      onClick={handleSelect}
      greyBackground={!!greyBackground}
      data-id={id}
      data-testid="card-tab-container"
      itemData={itemData}
    >
      {!edited && (
        <CardTabPrefix
          dragHandleProps={dragHandleProps}
          draggable={draggable}
          {...prefixProps}
        />
      )}
      <S.CardTabLabel
        onDoubleClick={handleEditName}
        data-testid="card-tab-label"
      >
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

      {cardSuffix}
    </S.CardTabContainer>
  );
};

export default CardTab;
