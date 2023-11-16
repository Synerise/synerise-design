import * as React from 'react';
import { ReactElement, Children, cloneElement } from 'react';
import { ReactSortable } from 'react-sortablejs-typescript';
import Button from '@synerise/ds-button';
import { defaultColorsOrder } from '@synerise/ds-core';

import * as S from './CardTabs.styles';
import { CardTabsProps } from './CardTabs.types';

const SORTABLE_CONFIG = {
  ghostClass: 'sortable-card-ghost-element',
  className: 'ds-card-tags-sortable',
  animation: 150,
  filter: '.ds-card-tabs__suffix-nodrag, .ds-card-tabs-nodrag',
  preventOnFilter: false,
  onMove: (ev1: { related: HTMLElement }) => {
    if (ev1.related && ev1.related.classList.contains('ds-card-tabs-nodrag')) {
      return -1;
    }
    return true;
  },
};
const CardTabs = ({ className, onChangeOrder, onAddTab, maxTabsCount, children = [], addTabLabel }: CardTabsProps) => {
  const handleChangeOrder = (newOrder: ReactElement[]): void => {
    onChangeOrder &&
      onChangeOrder(
        newOrder.map(item => ({
          ...item.props,
        }))
      );
  };
  const renderChildren = () =>
    Children.map(children, (child, i) =>
      cloneElement(child, {
        ...(child.props.color ? {} : { color: defaultColorsOrder[i % defaultColorsOrder.length] }),
        draggable: Boolean(onChangeOrder) || child.props.draggable,
      })
    );

  const addTab = onAddTab && (
    <span className="ds-card-tabs-nodrag" data-testid="card-tabs-add-button">
      <Button.Creator
        block
        disabled={!!maxTabsCount && Children.toArray(children).length >= maxTabsCount}
        label={addTabLabel ?? ''}
        onClick={onAddTab}
      />
    </span>
  );
  return (
    <S.CardTabsContainer className={`ds-card-tabs ${className || ''}`} data-testid="card-tabs-container">
      {onChangeOrder ? (
        <div data-testid="card-tabs-sortable">
          <ReactSortable {...SORTABLE_CONFIG} list={children} setList={handleChangeOrder}>
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
