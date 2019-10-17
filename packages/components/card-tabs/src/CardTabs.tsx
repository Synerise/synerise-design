import * as React from 'react';
import Sortable from 'react-sortablejs';
import CardTab, { CardTabProps } from './CardTab/CardTab';
import AddButton from './AddButton/AddButton';
import * as S from './CardTabs.styles';

export type CardTabsProps = {
  onChangeOrder?: () => void;
  onChangeName?: (id: number, name: string) => void;
  onDuplicateTab?: (id: number) => void;
  onRemoveTab?: (id: number) => void;
  onAddTab?: () => void;
  onSelectTab?: (id: number) => void;
  items: CardTabProps[];
  activeTab?: number | string;
  greyBackground?: boolean;
  maxTabsCount?: number;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  showTag?: boolean;
  disabled?: boolean;
  invalid?: boolean;
};

function CardTabs(props: CardTabsProps): React.ReactNode {
  const {
    items,
    activeTab,
    onChangeOrder,
    onRemoveTab,
    onDuplicateTab,
    onChangeName,
    onAddTab,
    greyBackground,
    onSelectTab,
    maxTabsCount,
    prefixIcon,
    suffixIcon,
    showTag,
    disabled,
    invalid,
  } = props;

  const renderItems = (): React.ReactNodeArray =>
    items.map(
      (item: CardTabProps, index: number): React.ReactNode => (
        <CardTab
          key={`card-tab-${item.id}`}
          id={item.id}
          tag={item.tag}
          index={index}
          active={item.id === activeTab}
          name={item.name}
          onSelectTab={onSelectTab}
          onChangeName={onChangeName}
          onDuplicateTab={onDuplicateTab}
          onRemoveTab={onRemoveTab}
          draggable={!!onChangeOrder}
          prefixIcon={prefixIcon}
          suffixIcon={suffixIcon}
          showTag={showTag}
          disabled={disabled}
          invalid={invalid}
          greyBackground={greyBackground}
        />
      )
    );

  return (
    <S.CardTabsContainer>
      {onChangeOrder ? (
        <Sortable className="ds-card-tags-sortable" onChange={onChangeOrder}>
          {renderItems()}
        </Sortable>
      ) : (
        <div className="ds-card-tags-sortable">{renderItems()}</div>
      )}
      {onAddTab && <AddButton disabled={items.length >= maxTabsCount} onClick={onAddTab} />}
    </S.CardTabsContainer>
  );
}

export default CardTabs;
