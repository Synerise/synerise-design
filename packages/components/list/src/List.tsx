import React, { type Key, type ReactElement } from 'react';

import Loader from '@synerise/ds-loader';
import Radio from '@synerise/ds-radio';

import { ItemWrapper, ListDivider, TextItem } from './Elements';
import * as S from './List.styles';
import { type ListPropsType } from './List.types';

export const isNestedArray = <V,>(array: V[] | V[][]): boolean => {
  return !!array.length && Array.isArray(array[0]);
};

const buildRootClassName = <T,>(
  props: Pick<
    ListPropsType<T>,
    'bordered' | 'split' | 'loading' | 'size' | 'itemLayout' | 'className'
  >,
): string =>
  [
    'ant-list',
    'ds-list',
    props.size === 'small' && 'ant-list-sm',
    props.size === 'large' && 'ant-list-lg',
    props.split !== false && 'ant-list-split',
    props.bordered && 'ant-list-bordered',
    props.loading && 'ant-list-loading',
    props.itemLayout && `ant-list-${props.itemLayout}`,
    props.className,
  ]
    .filter(Boolean)
    .join(' ');

type SingleListProps<T> = Omit<
  ListPropsType<T>,
  'dataSource' | 'radio' | 'options' | 'dashed'
> & { items: T[] };

const SingleList = <T,>({
  items,
  renderItem,
  header,
  bordered,
  split,
  loading,
  size,
  itemLayout,
  loadMore,
  rowKey,
  className,
  style,
  children,
  ...htmlAttributes
}: SingleListProps<T>): ReactElement => {
  const resolveKey = (item: T, index: number): Key => {
    if (typeof rowKey === 'function') {
      return rowKey(item);
    }
    if (rowKey && item && typeof item === 'object') {
      const value = (item as Record<string, unknown>)[rowKey as string];
      if (typeof value === 'string' || typeof value === 'number') {
        return value;
      }
    }
    return index;
  };

  const hasItems = Boolean(renderItem) && items.length > 0;

  return (
    <S.ListRoot
      {...htmlAttributes}
      className={buildRootClassName({
        bordered,
        split,
        loading,
        size,
        itemLayout,
        className,
      })}
      style={style}
      $bordered={bordered}
    >
      {header !== undefined && header !== null && (
        <S.ListHeader className="ant-list-header ds-list-header">
          {header}
        </S.ListHeader>
      )}

      {loading && (
        <S.ListLoading className="ant-list-loading ds-list-loading">
          <Loader size="M" />
        </S.ListLoading>
      )}

      {!loading && hasItems && (
        <S.ListItems className="ant-list-items ds-list-items">
          {items.map((item, index) => (
            <React.Fragment key={resolveKey(item, index)}>
              {renderItem?.(item, index)}
            </React.Fragment>
          ))}
        </S.ListItems>
      )}

      {!loading && !hasItems && children}

      {loadMore}
    </S.ListRoot>
  );
};

function List<T>({
  dataSource,
  radio,
  options,
  dashed,
  ...rest
}: ListPropsType<T>): ReactElement {
  const content = isNestedArray(dataSource) ? (
    (dataSource as T[][]).map((group, index, groups) => (
      <React.Fragment key={index}>
        <SingleList<T>
          {...rest}
          items={group}
          header={index === 0 ? rest.header : undefined}
        />
        {index !== groups.length - 1 && (
          <ListDivider dashed={Boolean(dashed)} />
        )}
      </React.Fragment>
    ))
  ) : (
    <SingleList<T> {...rest} items={dataSource as T[]} />
  );

  return radio ? (
    <Radio.Group {...options}>{content}</Radio.Group>
  ) : (
    <>{content}</>
  );
}

List.Item = TextItem;
List.ItemWrapper = ItemWrapper;
List.Divider = ListDivider;

export default List;
