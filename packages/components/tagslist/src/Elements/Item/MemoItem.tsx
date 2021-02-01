import * as React from 'react';

import Item from './Item';
import { ItemProps } from './Item.types';

const MemoItem = React.memo(Item, (
    prevProps: Readonly<React.PropsWithChildren<ItemProps>>,
    nextProps: Readonly<React.PropsWithChildren<ItemProps>>,
  ): boolean => {
    const { item: prevItem, ...restPrev } = prevProps;
    const { item: nextItem, ...restNext } = nextProps;

    if(JSON.stringify(Object.keys(prevProps)) !== JSON.stringify(Object.keys(nextProps)))
      return false;
    
    if(JSON.stringify(prevItem) !== JSON.stringify(nextItem))
      return false;

    for(let fn in restPrev) {
      if(restPrev[fn] === restNext[fn]) 
        return false;
    }

    return true;
  }
);

export default MemoItem;