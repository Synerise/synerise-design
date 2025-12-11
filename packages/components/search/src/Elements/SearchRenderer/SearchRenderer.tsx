import React from 'react';

import SearchHeader from '../SearchHeader/SearchHeader';
import SearchItems from '../SearchItems/SearchItems';
import { type SearchRendererProps } from './SearchRenderer.types';

const SearchRenderer = ({
  title,
  tooltip,
  data,
  width,
  height,
  rowHeight = 30,
  listProps,
  itemRender = (item) => <>{item}</>,
  highlight,
  onItemClick,
}: SearchRendererProps): JSX.Element | null => {
  return (
    <>
      {!!title && <SearchHeader headerText={title} tooltip={tooltip} />}
      <SearchItems
        data={data}
        height={height}
        highlight={highlight}
        width={width}
        rowHeight={rowHeight}
        itemRender={itemRender}
        onItemClick={onItemClick}
        listProps={listProps}
        renderInMenu={false}
      />
    </>
  );
};

export default SearchRenderer;
