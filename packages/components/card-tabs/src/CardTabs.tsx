import * as React from 'react';
import { ReactSortable } from 'react-sortablejs-typescript';
import Button from '@synerise/ds-button';
import * as S from './CardTabs.styles';
import { CardTabsProps } from './CardTabs.types';

const CardTabs: React.FC<CardTabsProps> = ({ className, onChangeOrder, onAddTab, maxTabsCount, children = [] }) => {
  const handleChangeOrder = (newOrder: React.ReactElement[]): void => {
    onChangeOrder &&
      onChangeOrder(
        newOrder.map(item => ({
          ...item.props,
        }))
      );
  };

  return (
    <S.CardTabsContainer className={`ds-card-tabs ${className || ''}`} data-testid="card-tabs-container">
      {onChangeOrder ? (
        <div data-testid="card-tabs-sortable">
          <ReactSortable className="ds-card-tags-sortable" list={children} setList={handleChangeOrder}>
            {children}
          </ReactSortable>
        </div>
      ) : (
        <div className="ds-card-tags-sortable" data-testid="card-tabs-static">
          {children}
        </div>
      )}
      {onAddTab && (
        <span data-testid="card-tabs-add-button">
          <Button.Creator
            disabled={!!maxTabsCount && React.Children.toArray(children).length >= maxTabsCount}
            onClick={onAddTab}
          />
        </span>
      )}
    </S.CardTabsContainer>
  );
};

export default CardTabs;
