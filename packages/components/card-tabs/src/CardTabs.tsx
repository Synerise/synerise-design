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
  filter: '.ds-card-tabs__suffix-nodrag',
  preventOnFilter: false,
};
const CardTabs = ({
  className,
  onChangeOrder,
  onAddTab,
  maxTabsCount,
  children = [],
  addTabLabel,
}: CardTabsProps) => {
  const handleChangeOrder = (newOrder: ReactElement[]): void => {
    onChangeOrder &&
      onChangeOrder(
        newOrder.map(item => ({
          ...item.props,
        }))
      );
  };
  const renderChildren = (): JSX.Element[] =>
    Children.map(children, (child, i) =>
      cloneElement(child, {
        ...(child.props.color ? {} : { color: defaultColorsOrder[i % defaultColorsOrder.length] }),
        draggable: Boolean(onChangeOrder) || child.props.draggable,
      })
    );

  return (
    <S.CardTabsContainer className={`ds-card-tabs ${className || ''}`} data-testid="card-tabs-container">
      {onChangeOrder ? (
        <div data-testid="card-tabs-sortable">
          <ReactSortable {...SORTABLE_CONFIG} list={children} setList={handleChangeOrder}>
            {renderChildren()}
          </ReactSortable>
        </div>
      ) : (
        <div className="ds-card-tags-sortable" data-testid="card-tabs-static">
          {renderChildren()}
        </div>
      )}
      {onAddTab && (
        <span data-testid="card-tabs-add-button">
          <Button.Creator
            block
            disabled={!!maxTabsCount && Children.toArray(children).length >= maxTabsCount}
            label={addTabLabel ?? ''}
            onClick={onAddTab}
          />
        </span>
      )}
    </S.CardTabsContainer>
  );
};

export default CardTabs;
