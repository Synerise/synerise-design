import * as React from 'react';
import { ListType } from '../ManageableList';
import ContentItem from './ContentItem/ContentItem';
import SimpleItem from './SimpleItem/SimpleItem';

type Props = {
  item: ItemProps;
  onRemove?: (removeParams: { id: string }) => void;
  onSelect: (selectParams: { id: string }) => void;
  onUpdate?: (updateParams: { id: string; name: string }) => void;
  onDuplicate?: (duplicateParams: { id: string }) => void;
  draggable?: boolean;
  changeOrderDisabled?: boolean;
  greyBackground?: boolean;
  listType: string;
};

export type ItemProps = {
  id: string;
  canUpdate?: boolean;
  canDelete?: boolean;
  canDuplicate?: boolean;
  name: string;
  tag?: React.ReactElement;
  icon?: React.ReactNode;
  content?: () => React.ReactNode;
  changeOrderDisabled?: boolean;
};

const Item: React.FC<Props> = ({
  item,
  onRemove,
  onSelect,
  onUpdate,
  listType,
  onDuplicate,
  greyBackground,
  draggable,
  changeOrderDisabled,
}) => {
  return ListType.content === listType ? (
    <ContentItem
      item={item}
      onDuplicate={onDuplicate}
      onUpdate={onUpdate}
      onRemove={onRemove}
      onSelect={onSelect}
      greyBackground={greyBackground}
      changeOrderDisabled={changeOrderDisabled}
      draggable={draggable}
    />
  ) : (
    <SimpleItem item={item} onSelect={onSelect} onUpdate={onUpdate} onRemove={onRemove} />
  );
};

export default Item;
