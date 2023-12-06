import React, { Children, cloneElement, isValidElement } from 'react';
import { ReactSortable, MoveEvent } from 'react-sortablejs';

import Button from '@synerise/ds-button';
import { defaultColorsOrder } from '@synerise/ds-core';

import * as S from './CardTabs.styles';
import { CardTabsProps, CardTabsItem } from './CardTabs.types';
import { CardTabProps } from './CardTab/CardTab.types';

const SORTABLE_CONFIG = {
  ghostClass: 'sortable-card-ghost-element',
  className: 'ds-card-tags-sortable',
  animation: 150,
  filter: '.ds-card-tabs__suffix-nodrag, .ds-card-tabs-nodrag',
  preventOnFilter: false,
  onMove: (ev1: MoveEvent) => {
    if (ev1.related && ev1.related.classList.contains('ds-card-tabs-nodrag')) {
      return -1;
    }
    return true;
  },
};
const CardTabs = ({ className, onChangeOrder, onAddTab, maxTabsCount, children = [], addTabLabel }: CardTabsProps) => {
  const handleChangeOrder = (newOrder: CardTabsItem[]): void => {
    onChangeOrder && onChangeOrder(newOrder);
  };
  const addTab = onAddTab ? (
    <S.CardTabsAddButton className="ds-card-tabs-nodrag" data-testid="card-tabs-add-button">
      <Button.Creator
        block
        disabled={!!maxTabsCount && Children.toArray(children).length >= maxTabsCount}
        label={addTabLabel ?? ''}
        onClick={onAddTab}
      />
    </S.CardTabsAddButton>
  ) : (
    <></>
  );

  const childrenCount = Children.count(children);
  const childrenData = Children.map(children, child => child.props);

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
    <S.CardTabsContainer className={`ds-card-tabs ${className || ''}`} data-testid="card-tabs-container">
      {onChangeOrder && childrenCount > 1 ? (
        <div data-testid="card-tabs-sortable">
          <ReactSortable<CardTabProps> {...SORTABLE_CONFIG} list={childrenData} setList={handleChangeOrder}>
            {renderChildren()}
            {addTab}
          </ReactSortable>
        </div>
      ) : (
        <div className="ds-card-tags-sortable" data-testid="card-tabs-static">
          {renderChildren()}
          {addTab}
        </div>
      )}
    </S.CardTabsContainer>
  );
};

export default CardTabs;
