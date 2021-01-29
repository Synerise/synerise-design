import * as React from 'react';

import TagsListContext from '../../TagsListContext';
import AddModal from '../AddModal';
import Search from '../Search';

import * as S from './Toolbar.styles';

const Toolbar: React.FC = ({children}) => {
  const { 
    addButtonDisabled,
    texts,
    searchOpen,
  } = React.useContext(TagsListContext) || {};

  const [addItemWidth, setAddItemWidth] = React.useState<number>(0);
  const addItemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if(addItemRef.current) setAddItemWidth(addItemRef.current.offsetWidth);
  }, [addItemRef]);

  return (
    <S.ToolbarLayout>
      <S.AddItem 
        style={{ marginLeft: searchOpen ? `-${addItemWidth}px` : 0 }} 
        ref={addItemRef}
      >
        <AddModal 
          disabled={!!addButtonDisabled} 
          texts={texts} 
          onItemAdd={() => {}}
        />
      </S.AddItem>
      <Search />
    </S.ToolbarLayout>
  )
}

export default Toolbar;