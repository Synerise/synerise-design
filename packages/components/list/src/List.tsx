import AntdList from 'antd/lib/list';
import { type RadioGroupProps } from 'antd/lib/radio';
import React, { type ReactNode } from 'react';
import { v4 as uuid } from 'uuid';

import '@synerise/ds-core/dist/js/style';
import Radio from '@synerise/ds-radio';

import { ItemWrapper, ListDivider, TextItem } from './Elements';
import { type ListPropsType } from './List.types';
import './style/index.less';

type RadioGroupWrapperProps = {
  options?: RadioGroupProps;
  children?: ReactNode;
};
const RadioGroupWrapper = ({ children, options }: RadioGroupWrapperProps) => (
  <Radio.Group {...options}>{children}</Radio.Group>
);

export const isNestedArray = <V,>(array: V[] | V[][]): boolean => {
  return !!array.length && array[0] instanceof Array;
};

class List<T> extends React.PureComponent<ListPropsType<T>> {
  static ItemWrapper: typeof ItemWrapper = ItemWrapper;
  static Item: typeof TextItem = TextItem;
  static Divider: typeof ListDivider = ListDivider;
  private uuidKey: string;
  constructor(props: ListPropsType<T>) {
    super(props);
    this.uuidKey = uuid();
  }

  render(): React.ReactNode {
    const { dataSource, radio, options, dashed, ...rest } = this.props;
    let ReadyList;

    if (isNestedArray(dataSource)) {
      ReadyList =
        !!dataSource &&
        // @ts-expect-error type mismatch
        dataSource.map((singleDataSource: T[] | undefined, index: number) => {
          const isLastItem = dataSource.length === index + 1;
          if (index === 0) {
            return (
              <React.Fragment key={uuid()}>
                <AntdList {...rest} dataSource={singleDataSource} />
                {!isLastItem && (
                  <ListDivider dashed={!!dashed} data-testid="divider" />
                )}
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={uuid()}>
              <AntdList {...rest} header={null} dataSource={singleDataSource} />
              {!isLastItem && (
                <ListDivider dashed={!!dashed} data-testid="divider" />
              )}
            </React.Fragment>
          );
        });
    } else {
      ReadyList = (
        <React.Fragment key={this.uuidKey || uuid()}>
          <AntdList {...rest} dataSource={dataSource as T[]} />
        </React.Fragment>
      );
    }

    return (
      <>
        {radio ? (
          <RadioGroupWrapper options={options}>{ReadyList}</RadioGroupWrapper>
        ) : (
          ReadyList
        )}
      </>
    );
  }
}

export default List;
