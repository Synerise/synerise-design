import * as React from 'react';
import { v4 as uuid } from 'uuid';
import '@synerise/ds-core/dist/js/style';
import Radio from '@synerise/ds-radio';
import AntdList, { ListProps } from 'antd/lib/list';
import { RadioGroupProps } from 'antd/lib/radio';
import './style/index.less';

import { TextItem, ListDivider } from './Elements';

interface Props<T> extends Omit<ListProps<T>, 'dataSource' | 'footer'> {
  dataSource: T[][];
  radio?: boolean;
  options?: RadioGroupProps;
}

const RadioGroupWrapper: React.FC<{ options: RadioGroupProps }> = ({ children, options }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Radio.Group {...options}>{children}</Radio.Group>
);

class List<T> extends React.Component<Props<T>> {
  static Item: typeof TextItem = TextItem;
  static Divider: typeof ListDivider = ListDivider;

  render(): React.ReactNode {
    const { dataSource, radio, options, ...rest } = this.props;

    const ReadyList = dataSource.map((singleDataSource, index) => {
      const isLastItem = dataSource.length === index + 1;

      if (index === 0) {
        return (
          <React.Fragment key={uuid()}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <AntdList {...rest} dataSource={singleDataSource} />
            {!isLastItem && <ListDivider data-testid="divider" />}
          </React.Fragment>
        );
      }

      return (
        <React.Fragment key={uuid()}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <AntdList {...rest} header={null} dataSource={singleDataSource} />
          {!isLastItem && <ListDivider data-testid="divider" />}
        </React.Fragment>
      );
    });

    return <>{radio ? <RadioGroupWrapper options={options}>{ReadyList}</RadioGroupWrapper> : ReadyList}</>;
  }
}

export default List;
