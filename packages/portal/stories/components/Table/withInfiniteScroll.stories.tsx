import * as React from 'react';
import faker from 'faker';
import { withState } from '@dump247/storybook-state';
import Alert from '@synerise/ds-alert';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { RefreshM } from '@synerise/ds-icon/dist/icons';
import Loader from '@synerise/ds-loader';
import { VirtualTable } from '@synerise/ds-table';

interface DataRow {
  name: string;
  price: string;
  color: string;
}
const decorator = (storyFn) => <div style={{ padding: 20, width: '960px' }}>{storyFn()}</div>;

const randomRangeInt = (min: number, max: number) => Math.round(Math.random() * (max - min) + min)

const getDataPortion = (items: number = 15) => new Array(items).fill({}).map(() => ({
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  color: faker.commerce.color(),
} as DataRow));

const getDataPortionAsync = (items: number = 15) => new Promise<DataRow[]>(
  (resolve) => { setTimeout(() => resolve(getDataPortion(items)), randomRangeInt(50, 1000)) }
);

const stories = {
  default: withState({ dataSource: getDataPortion(), isLoading: false, hasError: false, failCount: 0, })(({ store }) => {
    const isFailCounterClear = store.state.failCount === 0;
    const fakeFetchData = async () => {
      const itemsToGet = randomRangeInt(5, 15);
      store.set({
        isLoading: true,
        hasError: false,
      });
      const newItems = await getDataPortionAsync(itemsToGet);

      if (itemsToGet > 10 && isFailCounterClear) {
        store.set({
          hasError: true,
          isLoading: false,
          failCount: store.state.failCount + 1,
        });
      } else {
        store.set({
          dataSource: [
            ...store.state.dataSource,
            ...newItems,
          ],
          isLoading: false,
          failCount: 0,
        });
      }
    }

    return (
      <VirtualTable<DataRow>
        scroll={{ y: 400, x: 0 }}
        dataSource={store.state.dataSource}
        cellHeight={50}
        initialWidth={920}
        columns={[
          { title: 'Name', key: 'name', dataIndex: 'name' },
          { title: 'Price', key: 'price', dataIndex: 'price' },
          { title: 'Color', key: 'color', dataIndex: 'color' },
        ]}
        onScrollReachEnd={fakeFetchData}
        isLoading={store.state.isLoading}
        footer={() => (
          store.state.isLoading
            ? <Loader size='M' label='Loading more items' />
            : store.state.hasError ? (
              <div style={{ display: 'flex' }}>
                <Alert.InlineAlert type="alert" message="Can't fetch data" />
                <Button
                  onClick={() => fakeFetchData()}
                  type="ghost"
                  mode="icon-label"
                  icon={<Icon component={<RefreshM />} />}
                  style={{ marginLeft: 8 }}
                >
                  Retry
                </Button>
              </div>
            ) : 'Scroll down to load more items'
        )}
      />
    )
  }),
};

export default {
  name: 'Table/Table with infinite scrolling',
  decorator,
  stories,
  Component: VirtualTable,
};
