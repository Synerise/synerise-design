import * as React from 'react';

import useTreeMenuContext from '../useTreeMenuContext';
import Search from './Search';

import * as S from './Toolbar.styles';

const Toolbar: React.FC = ({ children }) => {
  const { searchOpen } = useTreeMenuContext();
  const [addItemWidth, setAddItemWidth] = React.useState<number>(0);
  const addItemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (addItemRef.current) setAddItemWidth(addItemRef.current.offsetWidth);
  }, [addItemRef]);

  return (
    <S.ToolbarLayout>
      <S.AddItem style={{ marginLeft: searchOpen ? `-${addItemWidth}px` : 0 }} ref={addItemRef}>
        {children}
      </S.AddItem>
      <Search />
    </S.ToolbarLayout>
  );
};

export default Toolbar;
