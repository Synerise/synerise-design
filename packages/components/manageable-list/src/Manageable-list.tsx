import * as React from 'react';
import List from '@synerise/ds-list';
import * as S from './Manageable-list.styles';
import Item from './Item/Item';
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
  items: [];
  loading: boolean;
}

interface State {
  allItemsVisible: boolean;
  itemsOverLimit: number;
}

export default class ManageableList extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    const { length } = props.items;
    const { maxToShowItems } = props;

    this.state = {
      allItemsVisible: false,
      itemsOverLimit: length - maxToShowItems,
    };
  }

  private toggleAllItems(): void {
    const { allItemsVisible } = this.state;
    this.setState({ allItemsVisible: !allItemsVisible });
  }

  private items(): any[] {
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
    const { allItemsVisible, itemsOverLimit } = this.state;
    const buttonLabel = allItemsVisible ? showLessLabel : showMoreLabel;
    const buttonLabelDiff = allItemsVisible ? `- ${itemsOverLimit} less ` : `+ ${itemsOverLimit} more `;
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
