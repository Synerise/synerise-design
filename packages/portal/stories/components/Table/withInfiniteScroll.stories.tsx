import * as React from 'react';
import faker from 'faker';
import { withState } from '@dump247/storybook-state';
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

const getDataPortionAsync = (items: number = 15, isError = false) => new Promise<DataRow[]>(
  (resolve, reject) => {
    setTimeout(
      () => {
        if (isError) {
          reject('Cannot get data');
        }

        resolve(getDataPortion(items))
      },
      randomRangeInt(50, 1000))
  }
);

const stories = {
  default: withState({ dataSource: getDataPortion(25), isLoading: false, hasError: false, hasMore: true, })(({ store }) => {
    const fakeFetchData = async () => {
      const itemsToGet = 25;
      const itemsLimitish = 100;

      store.set({
        isLoading: true,
        hasError: false,
      });

      try {
        const newItems = await getDataPortionAsync(itemsToGet, randomRangeInt(1, 5) > 3);
        const newDataSource = [
          ...store.state.dataSource,
          ...newItems,
        ];

        store.set({
          dataSource: newDataSource,
          isLoading: false,
          hasMore: newDataSource.length < itemsLimitish,
        });
      } catch (error) {
        store.set({
          isLoading: false,
          hasError: true,
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
        infiniteScroll={{
          hasError: store.state.hasError,
          hasMore: store.state.hasMore,
          isLoading: store.state.isLoading,
          onRetryButtonClick: () => {
            fakeFetchData();
          },
          onScrollEndReach: () => {
            if (store.state.hasMore) {
              fakeFetchData();
            }
          }
        }}
      />
    )
  }),
};

export default {
  name: 'Components/Table/Table with infinite scrolling',
  decorator,
  stories,
  Component: VirtualTable,
};
