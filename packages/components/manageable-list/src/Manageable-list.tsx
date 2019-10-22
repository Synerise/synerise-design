import * as React from 'react';
import List from '@synerise/ds-list';
import * as S from './Manageable-list.styles';
import Item, { ItemProps } from './Item/Item';
import AddItem from './AddItem/AddItem';

interface Props {
  addItemLabel: string;
  showMoreLabel: string;
  showLessLabel: string;
  maxToShowItems: number;
  onItemAdd: (addParams: { name: string }) => void;
  onItemRemove: (removeParams: { id: string }) => void;
  onItemEdit: (editParams: { id: string; name: string }) => void;
  onItemSelect: (selectParams: { id: string }) => void;
  items: ItemProps[];
  loading: boolean;
}

interface State {
  allItemsVisible: boolean;
}

export default class ManageableList extends React.PureComponent<Props, State> {
  state = {
    allItemsVisible: false,
  };

  private getItemsOverLimit(): number {
    const { items, maxToShowItems } = this.props;
    return items.length - maxToShowItems;
  }

  private toggleAllItems(): void {
    const { allItemsVisible } = this.state;
    this.setState({ allItemsVisible: !allItemsVisible });
  }

  private items(): ItemProps[] {
    const { maxToShowItems, items } = this.props;
    const { allItemsVisible } = this.state;
    return allItemsVisible ? items : items.slice(0, maxToShowItems);
  }

  render(): React.ReactNode {
    const {
      onItemAdd,
      onItemSelect,
      onItemRemove,
      onItemEdit,
      addItemLabel,
      items,
      maxToShowItems,
      showMoreLabel,
      showLessLabel,
      loading,
    } = this.props;
    const { allItemsVisible } = this.state;
    const buttonLabel = allItemsVisible ? showLessLabel : showMoreLabel;
    const buttonLabelDiff = allItemsVisible
      ? `- ${this.getItemsOverLimit()} less `
      : `+ ${this.getItemsOverLimit()} more `;
    return (
      <S.ManageableListContainer>
        <AddItem addItemLabel={addItemLabel} onItemAdd={onItemAdd} />
        <List
          loading={loading}
          dataSource={[this.items()]}
          renderItem={(item): React.ReactNode => (
            <Item onSelect={onItemSelect} onUpdate={onItemEdit} onRemove={onItemRemove} item={item} />
          )}
        />
        {items.length > maxToShowItems ? (
          <S.ShowMoreButton onClick={this.toggleAllItems.bind(this)} data-testid="show-more-button">
            <span>{buttonLabelDiff}</span>
            <strong>{buttonLabel}</strong>
          </S.ShowMoreButton>
        ) : null}
      </S.ManageableListContainer>
    );
  }
}
