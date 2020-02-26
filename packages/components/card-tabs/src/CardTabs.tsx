import * as React from 'react';
import { ReactSortable } from 'react-sortablejs-typescript';
import AddButton from './AddButton/AddButton';
import * as S from './CardTabs.styles';

export type CardTabsProps = {
  className?: string;
  onChangeOrder?: (newOrder: CardTabsItem[]) => void;
  onAddTab?: () => void;
  maxTabsCount?: number;
  children?: JSX.Element[];
};

export type CardTabsItem = {
  id: number;
  name: string;
  tag: string;
};

const CardTabs: React.FC<CardTabsProps> = ({ className, onChangeOrder, onAddTab, maxTabsCount, children = [] }) => {
  const handleChangeOrder = (newOrder: React.ReactElement[]): void => {
    onChangeOrder &&
      onChangeOrder(
        newOrder.map(item => ({
          id: item.props.id,
          name: item.props.name,
          tag: item.props.tag,
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
          <AddButton
            disabled={!!maxTabsCount && React.Children.toArray(children).length >= maxTabsCount}
            onClick={onAddTab}
          />
        </span>
      )}
    </S.CardTabsContainer>
  );
};

export default CardTabs;
