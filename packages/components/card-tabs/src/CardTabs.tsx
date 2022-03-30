import * as React from 'react';
import { ReactSortable } from 'react-sortablejs-typescript';
import Button from '@synerise/ds-button';
import { defaultColorsOrder } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from './CardTabs.styles';
import { CardTabsProps } from './CardTabs.types';

const SORTABLE_CONFIG = {
  ghostClass: 'sortable-card-ghost-element',
  className: 'sortable-card',
  animation: 150,
  group: 'column-manager',
};
const CardTabs: React.FC<CardTabsProps> = ({
  className,
  onChangeOrder,
  onAddTab,
  maxTabsCount,
  children = [],
  addTabLabel,
}) => {
  const handleChangeOrder = (newOrder: React.ReactElement[]): void => {
    onChangeOrder &&
      onChangeOrder(
        newOrder.map(item => ({
          ...item.props,
        }))
      );
  };
  const renderChildren = (): JSX.Element[] =>
    React.Children.map(children, (child, i) =>
      React.cloneElement(child, {
        ...(child.props.color ? {} : { color: defaultColorsOrder[i % defaultColorsOrder.length] }),
        draggable: Boolean(onChangeOrder) || child.props.draggable,
      })
    );

  return (
    <S.CardTabsContainer className={`ds-card-tabs ${className || ''}`} data-testid="card-tabs-container">
      {onChangeOrder ? (
        <div data-testid="card-tabs-sortable">
          <ReactSortable
            {...SORTABLE_CONFIG}
            className="ds-card-tags-sortable"
            list={children}
            setList={handleChangeOrder}
          >
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
            disabled={!!maxTabsCount && React.Children.toArray(children).length >= maxTabsCount}
            label={addTabLabel ?? ''}
            onClick={onAddTab}
          />
        </span>
      )}
    </S.CardTabsContainer>
  );
};

export default CardTabs;
