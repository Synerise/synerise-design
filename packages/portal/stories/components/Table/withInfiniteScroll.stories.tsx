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

const getDataPortionAsync = (items: number = 15) => new Promise<DataRow[]>(
  (resolve) => { setTimeout(() => resolve(getDataPortion(items)), randomRangeInt(100, 1000)) }
);

const stories = {
  default: withState({ dataSource: getDataPortion() })(({ store }) => (
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
      onScrollReachEnd={async () => {
        const itemsToGet = randomRangeInt(5, 15);
        const newItems = await getDataPortionAsync(itemsToGet);

        store.set({
          dataSource: [
            ...store.state.dataSource,
            ...newItems,
          ],
        });
      }}
    />
  )),
};

export default {
  name: 'Table/Table with infinite scrolling',
  decorator,
  stories,
  Component: VirtualTable,
};
