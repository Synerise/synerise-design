import * as React from 'react';
import { NOOP } from '@synerise/ds-utils';

import useTagsListContext from '../../useTagsListContext';
import AddModal from '../AddModal';
import Search from '../Search';

import * as S from './Toolbar.styles';

const Toolbar: React.FC = () => {
  const {
    addButtonDisabled,
    onAddDropdown = NOOP,
    onManageTags = NOOP,
    onItemsAdd = NOOP,
    addItemsLoading = false,
    addItemsList = [],
    texts,
    searchOpen,
  } = useTagsListContext();

  const [addItemWidth, setAddItemWidth] = React.useState<number>(0);
  const addItemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (addItemRef.current) setAddItemWidth(addItemRef.current.offsetWidth);
  }, [addItemRef]);

  return (
    <S.ToolbarLayout>
      <S.AddItem style={{ marginLeft: searchOpen ? `-${addItemWidth}px` : 0 }} ref={addItemRef}>
        <AddModal
          disabled={!!addButtonDisabled}
          texts={texts}
          loading={addItemsLoading}
          items={addItemsList}
          onVisibleChange={onAddDropdown}
          onItemsAdd={onItemsAdd}
          onManageTags={onManageTags}
        />
      </S.AddItem>
      <Search />
    </S.ToolbarLayout>
  );
};

export default Toolbar;
