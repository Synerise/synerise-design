import React, { Children, cloneElement, isValidElement } from 'react';
// import { ReactSortable, MoveEvent } from 'react-sortablejs';

import Button from '@synerise/ds-button';
import { defaultColorsOrder } from '@synerise/ds-core';
import Sortable from '@synerise/ds-sortable';

import * as S from './CardTabs.styles';
import { CardTabsProps, CardTabsItem } from './CardTabs.types';
import { CardTabProps } from './CardTab/CardTab.types';
import CardTab from './CardTab/CardTab';

const CardTabs = ({
  className,
  onChangeOrder,
  onAddTab,
  maxTabsCount,
  children = [],
  addTabLabel,
  ...htmlAttributes
}: CardTabsProps) => {
  const handleChangeOrder = (newOrder: CardTabsItem[]): void => {
    onChangeOrder && onChangeOrder(newOrder);
  };
  const addTab = onAddTab && (
    <S.CardTabsAddButton className="ds-card-tabs-nodrag" data-testid="card-tabs-add-button">
      <Button.Creator
        disabled={!!maxTabsCount && Children.toArray(children).length >= maxTabsCount}
        label={addTabLabel ?? ''}
        onClick={onAddTab}
      />
    </S.CardTabsAddButton>
  );

  const childrenCount = Children.count(children);
  const childrenData = Children.map(children, (child, i) => ({
    ...child.props,
    color: defaultColorsOrder[i % defaultColorsOrder.length],
    draggable: childrenCount > 1 && (Boolean(onChangeOrder) || child.props.draggable),
  }));

  const renderChildren = () => (
    <>
      {Children.map(children, (child, i) => {
        const { props } = child;
        return (
          isValidElement(child) &&
          cloneElement(child as React.ReactElement<CardTabProps>, {
            ...(props.color ? {} : { color: defaultColorsOrder[i % defaultColorsOrder.length] }),
            draggable: childrenCount > 1 && (Boolean(onChangeOrder) || props.draggable),
          })
        );
      })}
    </>
  );
  return (
    <S.CardTabsContainer
      data-testid="card-tabs-container"
      {...htmlAttributes}
      className={`ds-card-tabs ${className || ''}`}
    >
      {onChangeOrder && childrenCount > 1 ? (
        <>
          <Sortable items={childrenData} ItemComponent={CardTab} onOrderChange={handleChangeOrder} />
          {addTab}
        </>
      ) : (
        <>
          {renderChildren()}
          {addTab}
        </>
      )}
    </S.CardTabsContainer>
  );
};

export default CardTabs;
